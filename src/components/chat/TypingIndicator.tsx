"use client";

import { FC } from "react";
import { IoSparkles } from "react-icons/io5";

export const TypingIndicator: FC = () => {
  return (
    <div className="message-row">
      <div className="message-avatar ai">
        <IoSparkles className="w-4 h-4" />
      </div>
      <div className="message-content ai">
        <div className="typing-indicator">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;

