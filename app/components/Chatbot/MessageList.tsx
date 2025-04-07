import React from "react";
import Message from "./Message";

interface Message {
  text: string;
  isUser: boolean;
  role: "user" | "assistant";
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

/**
 * MessageList Component
 *
 * Displays the list of messages in the chat interface.
 */

function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* Map through the messages and render each one */}
      {messages.map((message, index) => (
        <Message key={index} text={message.text} isUser={message.isUser} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="rounded-lg bg-gray-100 px-4 py-2 text-gray-800">
            <div className="flex space-x-2">
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageList;
