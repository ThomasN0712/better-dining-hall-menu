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

  const handSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };
};
