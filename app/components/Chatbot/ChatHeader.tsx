import React from "react";

/**
 * ChatHeader Component
 * Displays the header for the chatbot, including a title and a status indicator.
 */
const ChatHeader = () => {
  return (
    <div className="flex items-center border-b border-gray-500 p-4">
      {/* Chatbot Title */}
      <h2 className="mx-2 text-lg font-bold">Chat with Dino</h2>

      {/* Status Indicator (Green Beating Dot) */}
      <span
        className="inline-block h-3 w-3 animate-pulse rounded-full bg-green-500"
        aria-label="Online status"
      ></span>
    </div>
  );
};

export default ChatHeader;
