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
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      {/* Map through the messages and render each one */}
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 flex ${
            message.isUser ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.isUser
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
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
