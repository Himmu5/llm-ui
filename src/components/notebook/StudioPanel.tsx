"use client";

import { FC, useState } from "react";
import { IoTrendingUp, IoTrendingDown, IoStatsChart, IoWallet, IoShieldCheckmark, IoSparkles } from "react-icons/io5";
import { TbChartPie, TbReportMoney, TbScale, TbTarget, TbArrowUpRight, TbArrowDownRight } from "react-icons/tb";
import { HiChartBar, HiCurrencyDollar } from "react-icons/hi2";

type StudioPanelProps = {
  hasMessages: boolean;
  onGenerateSummary?: () => void;
};

// Mock market data
const marketData = [
  { symbol: "S&P 500", value: "4,567.23", change: "+1.24%", isPositive: true },
  { symbol: "NASDAQ", value: "14,235.67", change: "+1.89%", isPositive: true },
  { symbol: "DOW", value: "35,890.12", change: "-0.32%", isPositive: false },
];

const StudioPanel: FC<StudioPanelProps> = ({ hasMessages }) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  return (
    <aside className="studio-panel bg-[#0c1222] border-l border-[#1e293b]">
      {/* Header */}
      <div className="px-5 py-5 border-b border-[#1e293b]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <IoStatsChart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Analytics</h2>
            <p className="text-xs text-slate-400">Financial Tools</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-6 overflow-y-auto flex-1">
        {/* Market Overview Card */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <HiChartBar className="w-4 h-4 text-violet-400" />
              Market Overview
            </h3>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Live</span>
          </div>
          <div className="space-y-3">
            {marketData.map((item) => (
              <div key={item.symbol} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                <span className="text-sm text-slate-300 font-medium">{item.symbol}</span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                  <p className={`text-xs font-semibold flex items-center gap-0.5 justify-end ${
                    item.isPositive ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {item.isPositive ? <TbArrowUpRight className="w-3 h-3" /> : <TbArrowDownRight className="w-3 h-3" />}
                    {item.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Analysis Tools */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <TbTarget className="w-4 h-4 text-emerald-400" />
            Analysis Tools
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-200 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <TbChartPie className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">Ratios</span>
            </button>

            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-200 group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <TbReportMoney className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">Revenue</span>
            </button>

            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-violet-500/10 hover:border-violet-500/30 transition-all duration-200 group">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-all">
                <TbScale className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">Valuation</span>
            </button>

            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all duration-200 group">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all">
                <IoShieldCheckmark className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">Risk</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Section */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <HiCurrencyDollar className="w-4 h-4 text-amber-400" />
            Key Metrics
          </h3>
          
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 group text-left">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <IoTrendingUp className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200">P/E Ratio Analysis</p>
                <p className="text-[11px] text-slate-500">Price to Earnings comparison</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 group text-left">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <IoWallet className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200">Cash Flow Analysis</p>
                <p className="text-[11px] text-slate-500">Operating & Free cash flow</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 group text-left">
              <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
                <TbScale className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200">Debt Analysis</p>
                <p className="text-[11px] text-slate-500">Leverage & solvency ratios</p>
              </div>
            </button>
          </div>
        </div>

        {/* AI Insights Tip */}
        <div className="rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <IoSparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-300 mb-1">AI-Powered Insights</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload financial reports to get instant analysis of key metrics, ratios, and risk factors with AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default StudioPanel;
