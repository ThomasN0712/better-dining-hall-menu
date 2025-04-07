from typing import List, Dict, Any
from langchain_core.language_models import BaseLLM
from langchain_core.tools import BaseTool
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage, AIMessage
from langgraph.graph import StateGraph, END
from pydantic import BaseModel
from backend.chatbot_ai.base_agent import BaseAgent 
from .tools import get_tools

# Define the DiningAgent state for type safety
class DiningAgentState(BaseModel):
    messages: List[Dict[str, str]] = []          # List of messages: [{"role": "human"/"ai", "content": "..."}]
    final_answer: str | None = None               # The final response (if no tool call is needed)
    error: str | None = None                      # Any error encountered during execution
    tool_calls: List[Dict[str, Any]] = []         # Tool calls extracted from the LLM response

class DiningAgent(BaseAgent):
    """Dining hall assistant agent using LangGraph for menu-related queries."""

    def __init__(
        self,
        name: str = "DiningAgent",
        llm: BaseLLM = None,
        tools: List[BaseTool] = None,
        verbose: bool = False
    ):
        # Get tools using the get_tools function if none provided
        tools = tools or get_tools()
        super().__init__(name=name, llm=llm, tools=tools, verbose=verbose)
        self.log(f"Initialized DiningAgent with {len(self.tools)} tools")
        
        # Bind tools to the LLM for structured tool calling.
        self.llm_with_tools = self.llm.bind_tools(self.tools)
        
        # Configure the prompt template. (Customize the system prompt as needed.)
        tool_names = ", ".join([tool.name for tool in self.tools])
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", f"""
                You are a dining hall assistant AI.
                Help answer menu-related questions such as availability, meal times, and allergens.
                Use the following tools if needed: {tool_names}.
                Provide clear, polite, and concise answers.
            """),
            ("human", "{input}"),
            ("placeholder", "{chat_history}")
        ])
        
        # Build the LangGraph workflow.
        self.graph = self._build_graph()
        self.log("Graph built successfully")

    def _build_graph(self):
        graph = StateGraph(DiningAgentState)
        graph.add_node("reason", self._reason_node)
        graph.add_node("tools", self._tools_node)
        graph.add_node("handle_error", self._error_node)
        
        # Set the entry point.
        graph.set_entry_point("reason")
        
        # Route based on state: if error -> error node; if tool_calls exist -> tools node; if final_answer exists -> end.
        graph.add_conditional_edges(
            "reason",
            self._route_after_reason,
            {"tools": "tools", "end": END, "error": "handle_error"}
        )
        
        # After tools execution, loop back to reasoning.
        graph.add_edge("tools", "reason")
        # End execution after error handling.
        graph.add_edge("handle_error", END)
        
        return graph.compile()

    def _reason_node(self, state: DiningAgentState) -> Dict[str, Any]:
        """Reasoning node: Generate an answer or decide to call a tool."""
        self.log(f"[Reason] Current state: {state.json()}", method="reason")
        
        # Reconstruct chat history for the prompt.
        chat_history = [
            HumanMessage(content=msg["content"]) if msg["role"] == "human" else
            AIMessage(content=msg["content"]) for msg in state.messages[:-1]
        ]
        current_input = state.messages[-1]["content"] if state.messages else ""
        self.log(f"[Reason] Current input: {current_input}", method="reason")
        
        try:
            prompt_value = self.prompt.format_prompt(
                input=current_input,
                chat_history=chat_history
            )
            messages = prompt_value.to_messages()
            
            # Invoke the LLM with bound tools.
            response = self.llm_with_tools.invoke(messages)
            self.log(f"[Reason] LLM response: {response}", method="reason")
            
            # Append the LLM response to the conversation.
            new_msg = {"role": "ai", "content": response.content}
            updated_messages = state.messages + [new_msg]
            
            # Check if the response includes tool calls.
            if hasattr(response, "tool_calls") and response.tool_calls:
                self.log("[Reason] Detected tool calls.", method="reason")
                return {"tool_calls": response.tool_calls, "messages": updated_messages}
            # Otherwise, check if a final answer is present.
            elif "Final Answer:" in response.content:
                final_answer = response.content.split("Final Answer:")[1].strip()
                self.log("[Reason] Final answer detected.", method="reason")
                return {"final_answer": final_answer, "messages": updated_messages}
            else:
                # Default: assume the response is the final answer.
                self.log("[Reason] No explicit tool call or final answer - using response as final answer.", method="reason")
                return {"final_answer": response.content, "messages": updated_messages}
        except Exception as e:
            self.log_error(f"[Reason] Error during reasoning: {str(e)}", method="reason")
            return {"error": f"Reasoning error: {str(e)}"}

    def _tools_node(self, state: DiningAgentState) -> Dict[str, Any]:
        """Tool node: Execute any tool calls indicated by the LLM response."""
        tool_calls = state.tool_calls
        results = []
        for call in tool_calls:
            tool_name = call.get("name")
            args = call.get("args", {})
            tool_instance = next((t for t in self.tools if t.name == tool_name), None)
            if not tool_instance:
                self.log(f"[Tools] Tool {tool_name} not found.", method="tools")
                results.append(f"Error: Tool {tool_name} not found.")
                continue
            try:
                self.log(f"[Tools] Executing tool {tool_name} with args {args}", method="tools")
                result = tool_instance.invoke(args)
                results.append(str(result))
            except Exception as e:
                self.log_error(f"[Tools] Error executing tool {tool_name}: {str(e)}", method="tools")
                results.append(f"Error: {str(e)}")
        combined_result = "\n".join(results)
        self.log(f"[Tools] Tool execution result: {combined_result}", method="tools")
        return {"messages": state.messages + [{"role": "ai", "content": combined_result}],
                "tool_calls": []}

    def _error_node(self, state: DiningAgentState) -> Dict[str, Any]:
        """Error node: Handle any errors and provide feedback."""
        err = state.error or "Unknown error"
        self.log_error(f"[Error] Handling error: {err}", method="error")
        return {"messages": state.messages + [{"role": "ai", "content": f"Error: {err}. Please try again."}]}

    def _route_after_reason(self, state: DiningAgentState) -> str:
        """Determine the next node based on the state after reasoning."""
        self.log(f"[Router] Routing with error={bool(state.error)}, final_answer={bool(state.final_answer)}, tool_calls={bool(state.tool_calls)}", method="router")
        if state.error:
            return "handle_error"
        if state.tool_calls:
            return "tools"
        if state.final_answer:
            return "end"
        return "end"

    def run(self, input_data: str) -> Dict[str, Any]:
        """Run the DiningAgent with the given input."""
        self.log(f"[Run] Processing input: {input_data}", method="run")
        initial_state = DiningAgentState(messages=[{"role": "human", "content": input_data}])
        final_state = self.graph.invoke(initial_state)
        
        # Extract the final answer if available.
        final_answer = final_state.final_answer if hasattr(final_state, "final_answer") else final_state.get("final_answer")
        messages = final_state.messages if hasattr(final_state, "messages") else final_state.get("messages", [])
        result = final_answer if final_answer else (messages[-1]["content"] if messages else "No response generated")
        self.log(f"[Run] Final result: {result}", method="run")
        return {"final_answer": result, "messages": messages}
