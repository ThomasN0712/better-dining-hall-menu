"use client";

import React, { useState } from "react";
import MessageList from "./MessageList";
import InputField from "./InputField";
import { BotMessageSquare, X } from "lucide-react";

/**
 * ChatContainer Component
 *
 * This is the main container for the chat interface.
 */
const ChatContainer = () => {
  // State to store the list of messages
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);

  // State to toggle the visibility of the chat container
  const [isOpen, setIsOpen] = useState(false);

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
      // WIP, need to add Render URL
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
    <>
      {/* Toggle Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600"
      >
        {isOpen ? <X size={20} /> : <BotMessageSquare size={24} />}
      </div>

      {/* Chat Container */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 z-50 flex h-[500px] w-full max-w-md flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
          {/* MessageList component to display the conversation */}
          <MessageList messages={messages} />

          {/* InputField component to allow users to type and send messages */}
          <InputField onSendMessage={sendMessage} />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
