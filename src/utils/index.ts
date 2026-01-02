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
 * Get suggestions based on selected document count
 */
export const getSuggestions = (selectedCount: number): string[] => {
  if (selectedCount > 1) {
    return [
      "Compare these documents",
      "What are the common themes?",
      "Summarize the key differences",
      "Create a combined overview",
    ];
  }
  if (selectedCount === 1) {
    return [
      "Summarize this document",
      "What are the key points?",
      "Explain the main concepts",
      "What conclusions can be drawn?",
    ];
  }
  return [
    "Explain quantum computing",
    "Write a poem about AI",
    "How does machine learning work?",
    "Help me brainstorm ideas",
  ];
};

/**
 * Get placeholder text based on selected documents
 */
export const getPlaceholder = (selectedCount: number): string => {
  if (selectedCount > 1) return "Ask about your documents...";
  if (selectedCount === 1) return "Ask about your document...";
  return "Ask anything...";
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

