import React, { useState } from "react";
import { SendHorizonal } from "lucide-react";

interface InputFieldProps {
  onSendMessage: (message: string) => void;
}

/*
 * InputField Component
 *
 * Provides an input field for users to type messages and a button to send them.
 * Also supports sending messages by pressing the Enter key.
 */
const InputField = ({ onSendMessage }: InputFieldProps) => {
  const [input, setInput] = useState("");
  /*
   * handleSend Function
   *
   * Handles sending the message when the user clicks the Send button or presses Enter.
   */
  const handleSend = () => {
    if (input.trim()) {
      // Call the onsendMessage prop with the current input value
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="mb-2 flex">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask anything..."
        className="rounded-lb-lg dark: m-3 flex-1 rounded-lg bg-background-cardLight p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background-cardDark"
      />

      {/* Send button */}
      <button
        onClick={handleSend}
        disabled={!input.trim()}
        className={`my-3 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          input.trim() ? "bg-white" : "cursor-not-allowed bg-gray-500"
        }`}
      >
        <SendHorizonal className="invert" />
      </button>
    </div>
  );
};

export default InputField;
