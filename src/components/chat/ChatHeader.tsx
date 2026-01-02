"use client";

import { FC } from "react";
import { IoRefresh, IoDownload, IoShare } from "react-icons/io5";
import { TbReportAnalytics, TbChartLine } from "react-icons/tb";

interface ChatHeaderProps {
  selectedCount: number;
  ragLabel?: string;
  canClear: boolean;
  onClear: () => void;
}

export const ChatHeader: FC<ChatHeaderProps> = ({
  selectedCount,
  ragLabel,
  canClear,
  onClear,
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#1e293b] bg-[#0c1222]/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
            <TbChartLine className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Financial Analysis</h2>
            <p className="text-xs text-slate-500">AI-Powered Insights</p>
          </div>
        </div>
        
        {selectedCount > 0 && ragLabel && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <TbReportAnalytics className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">
              Analyzing: {ragLabel}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Export Button */}
        <button
          disabled={!canClear}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium"
        >
          <IoDownload className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Share Button */}
        <button
          disabled={!canClear}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium"
        >
          <IoShare className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {/* Clear Button */}
        <button
          onClick={onClear}
          disabled={!canClear}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium"
        >
          <IoRefresh className="w-4 h-4" />
          <span>New Analysis</span>
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
