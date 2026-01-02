"use client";

import { FC } from "react";
import { IoAdd, IoTrash } from "react-icons/io5";
import { HiDocument } from "react-icons/hi2";
import { BsFilePdf, BsFileWord, BsFileText, BsGraphUpArrow } from "react-icons/bs";
import { TbChartLine, TbReportAnalytics } from "react-icons/tb";

type Source = {
  id: string;
  name: string;
  type: "pdf" | "doc" | "txt" | "default";
};

type SourcesSidebarProps = {
  sources: Source[];
  onAddSource: () => void;
  onRemoveSource: (id: string) => void;
  onToggleSource: (id: string) => void;
  onSelectAll: () => void;
  selectedSourceIds: string[];
};

const SourcesSidebar: FC<SourcesSidebarProps> = ({
  sources,
  onAddSource,
  onRemoveSource,
  onToggleSource,
  onSelectAll,
  selectedSourceIds,
}) => {
  const getSourceIcon = (type: Source["type"]) => {
    switch (type) {
      case "pdf":
        return <BsFilePdf className="w-5 h-5" />;
      case "doc":
        return <BsFileWord className="w-5 h-5" />;
      case "txt":
        return <BsFileText className="w-5 h-5" />;
      default:
        return <HiDocument className="w-5 h-5" />;
    }
  };

  const getIconClass = (type: Source["type"]) => {
    switch (type) {
      case "pdf":
        return "w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center";
      case "doc":
        return "w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center";
      case "txt":
        return "w-10 h-10 rounded-xl bg-gray-500/10 text-gray-400 flex items-center justify-center";
      default:
        return "w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center";
    }
  };

  const isSelected = (id: string) => selectedSourceIds.includes(id);
  const allSelected = sources.length > 0 && selectedSourceIds.length === sources.length;

  return (
    <aside className="sources-sidebar bg-[#0c1222] border-r border-[#1e293b]">
      {/* Header - Financial Branding */}
      <div className="sidebar-header border-b border-[#1e293b]">
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <TbChartLine className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">FinanceAI</h1>
            <p className="text-xs text-slate-400">Financial Data Analysis</p>
          </div>
        </div>
      </div>

      {/* Reports Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-[#1e293b]/50">
        <div className="flex items-center gap-2">
          <TbReportAnalytics className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-white tracking-tight">Company Reports</h2>
        </div>
        <div className="flex items-center gap-2">
          {sources.length > 0 && (
            <button
              onClick={onSelectAll}
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              {allSelected ? "Deselect all" : "Select all"}
            </button>
          )}
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            {selectedSourceIds.length > 0 ? `${selectedSourceIds.length}/${sources.length}` : sources.length}
          </span>
        </div>
      </div>

      {/* Add Report Button */}
      <div className="px-4 py-4">
        <button
          onClick={onAddSource}
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border-2 border-dashed border-slate-700 text-slate-400 hover:border-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-200 text-sm font-medium group"
        >
          <IoAdd className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-90" />
          <span>Upload Financial Report</span>
        </button>
      </div>

      {/* Reports List */}
      <div className="sidebar-content px-4 pb-4 overflow-y-auto flex-1">
        {sources.length === 0 ? (
          <div className="text-center py-12 px-4 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-slate-700">
              <BsGraphUpArrow className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-sm font-semibold text-slate-300 mb-2">
              No reports uploaded
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] mx-auto">
              Upload annual reports, 10-K filings, or financial statements for AI-powered analysis
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {sources.map((source, index) => (
              <div
                key={source.id}
                className={`group relative p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  isSelected(source.id)
                    ? "bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/5"
                    : "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600"
                }`}
                onClick={() => onToggleSource(source.id)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    isSelected(source.id)
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                      : "border-2 border-slate-600 text-transparent group-hover:border-emerald-500"
                  }`}>
                    {isSelected(source.id) && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  <div className={getIconClass(source.type)}>
                    {getSourceIcon(source.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate leading-tight">
                      {source.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-medium">
                      {source.type} • Financial Report
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSource(source.id);
                    }}
                    className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all duration-200"
                  >
                    <IoTrash className="w-4 h-4" />
                  </button>
                </div>
                {isSelected(source.id) && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-emerald-500/20">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-400">Active for Analysis</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer - Market Status */}
      <div className="px-5 py-4 border-t border-[#1e293b] bg-slate-900/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Market Status</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-400 font-semibold">Live Data</span>
          </span>
        </div>
        <p className="text-[10px] text-slate-600 mt-2 leading-relaxed">
          💡 Pro tip: Upload multiple reports to compare financial performance across quarters or companies
        </p>
      </div>
    </aside>
  );
};

export default SourcesSidebar;
