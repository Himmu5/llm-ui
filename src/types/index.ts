// Message types
export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// Source/Document types
export type SourceType = "pdf" | "doc" | "txt" | "default";

export type Source = {
  id: string;
  name: string;
  type: SourceType;
};

// Chat state types
export type ChatState = {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  streamingContent: string;
};

// API types
export type ChatRequest = {
  messages: Array<{ role: string; content: string }>;
  fileNames?: string[];
};

export type ChatResponse = {
  content?: string;
  message?: string;
  response?: string;
  error?: string;
};

