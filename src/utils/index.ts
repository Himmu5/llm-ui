import { SourceType } from "@/types";

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

/**
 * Get file type from filename extension
 */
export const getFileType = (fileName: string): SourceType => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "pdf";
  if (ext === "doc" || ext === "docx") return "doc";
  if (ext === "txt") return "txt";
  return "default";
};

/**
 * Get financial analysis suggestions based on selected report count
 */
export const getSuggestions = (selectedCount: number): string[] => {
  if (selectedCount > 1) {
    return [
      "Compare financial performance across companies",
      "Analyze revenue growth trends",
      "Identify key risk factors",
      "Compare valuation metrics",
    ];
  }
  if (selectedCount === 1) {
    return [
      "Analyze key financial ratios",
      "Summarize revenue and profitability",
      "What are the main risk factors?",
      "Evaluate the company's market position",
    ];
  }
  return [
    "What is P/E ratio analysis?",
    "Explain DCF valuation",
    "How to read a balance sheet?",
    "Key metrics for stock analysis",
  ];
};

/**
 * Get placeholder text based on selected documents
 */
export const getPlaceholder = (selectedCount: number): string => {
  if (selectedCount > 1) return "Ask about multiple financial reports...";
  if (selectedCount === 1) return "Analyze this financial report...";
  return "Ask about financial analysis...";
};

/**
 * Parse SSE stream data
 */
export const parseSSEData = (line: string): string | null => {
  if (!line.startsWith("data: ")) return null;
  const data = line.slice(6).trim();
  if (data === "[DONE]") return null;
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
};

/**
 * Format currency value
 */
export const formatCurrency = (value: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Format percentage value
 */
export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

/**
 * Format large numbers with suffixes (K, M, B, T)
 */
export const formatLargeNumber = (value: number): string => {
  const suffixes = ["", "K", "M", "B", "T"];
  const tier = Math.log10(Math.abs(value)) / 3 | 0;
  if (tier === 0) return value.toString();
  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = value / scale;
  return scaled.toFixed(1) + suffix;
};
