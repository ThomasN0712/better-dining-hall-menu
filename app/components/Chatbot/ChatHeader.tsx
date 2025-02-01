import React from "react";

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <h2 className="text-lg font-bold">Chat with Dino</h2>
      {/* Green beating dot */}
      <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-green-500"></span>
    </div>
  );
};

export default ChatHeader;
