"use client";

import { FC } from "react";
import { TbChartLine } from "react-icons/tb";
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
    <div className={`flex gap-4 mb-6 animate-fade-in-up ${message.role === "user" ? "flex-row-reverse" : ""}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all hover:scale-105 ${
        isAssistant 
          ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25" 
          : "bg-slate-800 text-slate-100 border border-slate-700"
      }`}>
        {isAssistant ? <TbChartLine className="w-5 h-5" /> : userInitial}
      </div>
      <div className={`max-w-[75%] px-5 py-4 rounded-2xl leading-relaxed transition-all ${
        isAssistant 
          ? "bg-slate-800/60 border border-slate-700/50 text-slate-100 rounded-tl-md hover:shadow-xl hover:shadow-slate-900/50" 
          : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-br-md shadow-lg shadow-emerald-500/20"
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
    <div className="flex gap-4 mb-6 animate-fade-in-up">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105">
        <TbChartLine className="w-5 h-5" />
      </div>
      <div className="max-w-[75%] px-5 py-4 rounded-2xl rounded-tl-md bg-slate-800/60 border border-slate-700/50 text-slate-100 leading-relaxed hover:shadow-xl hover:shadow-slate-900/50 transition-all">
        <div className="markdown-content">
          <Streamdown>{content}</Streamdown>
        </div>
        <span className="inline-block w-0.5 h-5 bg-emerald-400 ml-1 animate-pulse align-text-bottom rounded-sm"></span>
      </div>
    </div>
  );
};

export default MessageBubble;
