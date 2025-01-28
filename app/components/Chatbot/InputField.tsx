import React, { useState } from "react";

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
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message here..."
        className="flex-1 rounded-l-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Send button */}
      <button
        onClick={handleSend}
        className="rounded-r-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </div>
  );
};

export default InputField;
