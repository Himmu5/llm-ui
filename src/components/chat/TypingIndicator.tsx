"use client";

import { FC } from "react";
import { TbChartLine } from "react-icons/tb";

export const TypingIndicator: FC = () => {
  return (
    <div className="flex gap-4 mb-6 animate-fade-in-up">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25">
        <TbChartLine className="w-5 h-5" />
      </div>
      <div className="max-w-[75%] px-5 py-4 rounded-2xl rounded-tl-md bg-slate-800/60 border border-slate-700/50 text-slate-100">
        <div className="flex items-center gap-1">
          <span className="text-sm text-slate-400 mr-2">Analyzing</span>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0ms]" />
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:150ms]" />
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
