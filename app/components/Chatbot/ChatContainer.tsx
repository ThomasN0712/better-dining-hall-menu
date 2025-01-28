import React, { useState } from "react";
import MessageList from "./MessageList";
import InputField from "./InputField";

/**
 * ChatContainer Component
 *
 * This is the main container for the chat interface
 */
const ChatContainer = () => {
  // State to store the list of messages
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);

  /**
   * sendMessage Function
   *
   * Handles sending a user message to the backend API and updating the message list
   * with the chatbot's response.
   *
   * @param message - The message text entered by the user.
   */
  const sendMessage = async (message: string) => {
    // Add the user's message to the message list
    setMessages([...messages, { text: message, isUser: true }]);

    // Send the message to the backend API
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();

    // Add the chatbot's response to the message list
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: data.response, isUser: false },
    ]);
  };

  return (
    <div className="mx-auto flex h-[500px] w-full max-w-md flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
      {/* MessageList component to display the conversation */}
      <MessageList messages={messages} />

      {/* InputField component to allow users to type and send messages */}
      <InputField onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatContainer;
