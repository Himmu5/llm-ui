"use client";

import { FC } from "react";
import { IoAdd, IoTrendingUp, IoStatsChart } from "react-icons/io5";
import { TbChartLine, TbReportAnalytics, TbChartPie, TbCurrencyDollar } from "react-icons/tb";
import { getSuggestions } from "@/utils";

interface EmptyStateProps {
  selectedCount: number;
  sourcesCount: number;
  selectedDocumentName?: string;
  onAddSource: () => void;
  onSuggestionClick: (suggestion: string) => void;
}

export const EmptyState: FC<EmptyStateProps> = ({
  selectedCount,
  sourcesCount,
  selectedDocumentName,
  onAddSource,
  onSuggestionClick,
}) => {
  const suggestions = getSuggestions(selectedCount);

  const getTitle = () => {
    if (selectedCount > 1) return "Analyze Multiple Reports";
    if (selectedCount === 1) return "Analyze Financial Report";
    return "Financial Data Analysis";
  };

  const getDescription = () => {
    if (selectedCount > 1) {
      return `${selectedCount} reports selected. Compare financial metrics, analyze trends, and get comprehensive insights across all reports.`;
    }
    if (selectedCount === 1 && selectedDocumentName) {
      return `"${selectedDocumentName}" is ready for analysis. Ask about revenue, profitability, key ratios, or risk factors.`;
    }
    if (sourcesCount > 0) {
      return "Select reports from the sidebar to start your financial analysis.";
    }
    return "Upload company financial reports, 10-K filings, or annual statements for AI-powered analysis.";
  };

  return (
    <div className="flex flex-col items-center justify-center h-full py-12 px-6">
      {/* Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/20">
          {selectedCount > 0 ? (
            <TbReportAnalytics className="w-12 h-12 text-emerald-400" />
          ) : (
            <TbChartLine className="w-12 h-12 text-emerald-400" />
          )}
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center border border-violet-500/20">
          <IoTrendingUp className="w-4 h-4 text-violet-400" />
        </div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
          <TbChartPie className="w-4 h-4 text-blue-400" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-3 text-center">
        {getTitle()}
      </h3>

      {/* Description */}
      <p className="text-slate-400 mb-8 max-w-md text-center leading-relaxed">
        {getDescription()}
      </p>

      {/* Upload Button */}
      {sourcesCount === 0 && (
        <button
          onClick={onAddSource}
          className="flex items-center gap-2 px-6 py-3.5 mb-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-200"
        >
          <IoAdd className="w-5 h-5" />
          Upload Financial Report
        </button>
      )}

      {/* Suggestion Chips */}
      <div className="flex flex-wrap justify-center gap-3 max-w-lg">
        {suggestions.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => onSuggestionClick(suggestion)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-300 transition-all duration-200"
          >
            {i === 0 && <TbChartPie className="w-4 h-4" />}
            {i === 1 && <IoTrendingUp className="w-4 h-4" />}
            {i === 2 && <IoStatsChart className="w-4 h-4" />}
            {i === 3 && <TbCurrencyDollar className="w-4 h-4" />}
            {suggestion}
          </button>
        ))}
      </div>

      {/* Features Grid */}
      {sourcesCount === 0 && (
        <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg">
          <div className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <TbReportAnalytics className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-xs font-medium text-slate-300">Financial Ratios</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <TbChartLine className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-xs font-medium text-slate-300">Trend Analysis</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <IoStatsChart className="w-5 h-5 text-violet-400" />
            </div>
            <p className="text-xs font-medium text-slate-300">Risk Assessment</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
