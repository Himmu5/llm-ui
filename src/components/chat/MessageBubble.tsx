"use client";

import { FC } from "react";
import { IoSparkles } from "react-icons/io5";
import { Streamdown } from "streamdown";
import { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
  userInitial?: string;
}

export const MessageBubble: FC<MessageBubbleProps> = ({
  message,
  userInitial = "Y",
}) => {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`flex gap-3.5 mb-7 animate-fade-in-up ${message.role === "user" ? "flex-row-reverse" : ""}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-semibold transition-transform hover:scale-105 ${
        isAssistant 
          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20" 
          : "bg-gray-800 text-gray-100 border border-gray-700"
      }`}>
        {isAssistant ? <IoSparkles className="w-4 h-4" /> : userInitial}
      </div>
      <div className={`max-w-[75%] px-4 py-3.5 rounded-2xl leading-relaxed transition-shadow ${
        isAssistant 
          ? "bg-gray-900/80 border border-gray-800 text-gray-100 rounded-tl-md hover:shadow-lg" 
          : "bg-blue-500 text-gray-900 font-medium rounded-br-md"
      }`}>
        {isAssistant ? (
          <div className="markdown-content">
            <Streamdown>{message.content}</Streamdown>
          </div>
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </div>
  );
};

// Streaming message variant
interface StreamingMessageProps {
  content: string;
}

export const StreamingMessage: FC<StreamingMessageProps> = ({ content }) => {
  return (
    <div className="flex gap-3.5 mb-7 animate-fade-in-up">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20 transition-transform hover:scale-105">
        <IoSparkles className="w-4 h-4" />
      </div>
      <div className="max-w-[75%] px-4 py-3.5 rounded-2xl rounded-tl-md bg-gray-900/80 border border-gray-800 text-gray-100 leading-relaxed hover:shadow-lg transition-shadow">
        <div className="markdown-content">
          <Streamdown>{content}</Streamdown>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

