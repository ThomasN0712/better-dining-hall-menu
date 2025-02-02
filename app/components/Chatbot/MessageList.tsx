import { Component } from "lucide-react";
import React from "react";

interface Message {
  text: string;
  isUser: boolean;
}

interface MessageListProps {
  messages: Message[];
}

/**
 * MessageList Component
 *
 * Displays the list of messages in the chat interface.
 */

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* Map through the messages and render each one */}
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 flex ${
            message.isUser ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg px-4 py-2 ${
              message.isUser
                ? "bg-gray-600 text-sm text-white"
                : "text-text-light dark:text-text-dark"
            }`}
          >
            {/* Display the message text */}
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
