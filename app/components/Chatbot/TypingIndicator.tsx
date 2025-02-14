import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex justify-center p-2">
      <div className="flex space-x-1">
        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-100" />
        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-200" />
        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-300" />
      </div>
    </div>
  );
};

export default TypingIndicator;
