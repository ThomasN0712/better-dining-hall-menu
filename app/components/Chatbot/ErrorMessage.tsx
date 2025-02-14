import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="rounded-lg border border-red-200 bg-red-100 p-2 text-center text-red-500">
      {message}
    </div>
  );
};

export default ErrorMessage;
