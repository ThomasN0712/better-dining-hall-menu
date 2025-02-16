"use client";

import React, { useState } from "react";
import MessageList from "./MessageList";
import InputField from "./InputField";
import ChatHeader from "./ChatHeader";
import PresetPrompts from "./PresetPrompts";
import { BotMessageSquare, X } from "lucide-react";

// Define a TypeScript interface for message objects
interface Message {
  text: string;
  isUser: boolean;
}

/**
 * ChatContainer is the main component that manages the chat interface.
 * It handles the display of the header, preset prompts (when no messages exist),
 * the message list, and the input field.
 */
function ChatContainer() {
  // State to store chat messages
  const [messages, setMessages] = useState<Message[]>([]);
  // State to toggle the visibility of the chat container
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /**
   * sendMessage sends a user's message to the backend and updates the chat.
   *
   * @param message - The text message entered by the user.
   */
  const sendMessage = async (message: string) => {
    // Update the message list with the user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: true },
    ]);

    try {
      // Send the message to the backend API
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();

      // Update the message list with the chatbot's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, isUser: false },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally, handle error UI update here.
    }
  };

  /**
   * handlePromptSelect is triggered when a preset prompt is clicked.
   *
   * @param prompt - The selected preset prompt.
   */
  const handlePromptSelect = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <>
      {/* Toggle button to open or close the chat container */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600"
      >
        {isOpen ? <X size={20} /> : <BotMessageSquare size={24} />}
      </div>

      {/* Chat container panel */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 z-50 flex h-[500px] w-full max-w-md flex-col overflow-hidden rounded-lg bg-background-dark text-text-light dark:text-text-dark">
          {/* Render the chat header */}
          <ChatHeader />

          {/* Conditionally render preset prompts if no messages have been sent */}
          {messages.length === 0 && (
            <PresetPrompts onSelectPrompt={handlePromptSelect} />
          )}

          {/* Render the list of messages */}
          <MessageList messages={messages} />

          {/* Render the input field for new messages */}
          <InputField onSendMessage={sendMessage} />
        </div>
      )}
    </>
  );
}

export default ChatContainer;
