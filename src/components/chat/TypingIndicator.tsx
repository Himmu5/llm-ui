"use client";

import { FC } from "react";
import { IoSparkles } from "react-icons/io5";

export const TypingIndicator: FC = () => {
  return (
    <div className="flex gap-3.5 mb-7 animate-fade-in-up">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20">
        <IoSparkles className="w-4 h-4" />
      </div>
      <div className="max-w-[75%] px-4 py-3.5 rounded-2xl rounded-tl-md bg-gray-900/80 border border-gray-800 text-gray-100">
        <div className="flex gap-1.5 py-3 px-4">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;

