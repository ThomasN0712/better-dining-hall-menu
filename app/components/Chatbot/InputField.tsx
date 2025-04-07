import React, { useState } from "react";
import { SendHorizonal } from "lucide-react";

interface InputFieldProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

/*
 * InputField Component
 *
 * Provides an input field for users to type messages and a button to send them.
 * Also supports sending messages by pressing the Enter key.
 */
const InputField = ({ onSendMessage, isLoading }: InputFieldProps) => {
  const [input, setInput] = useState("");
  /*
   * handleSend Function
   *
   * Handles sending the message when the user clicks the Send button or presses Enter.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      await onSendMessage(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-700 bg-gray-900 p-4"
    >
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          placeholder="Type your message..."
          className="flex-1 rounded-l-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="rounded-r-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-600"
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default InputField;
