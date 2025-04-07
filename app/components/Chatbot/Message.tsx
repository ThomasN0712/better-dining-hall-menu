import React from "react";

interface MessageProps {
  text: string;
  isUser: boolean;
}

function Message({ text, isUser }: MessageProps) {
  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default Message;
