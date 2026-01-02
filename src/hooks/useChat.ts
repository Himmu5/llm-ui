"use client";

import { useState, useRef, useCallback } from "react";
import { Message } from "@/types";
import { generateId, parseSSEData } from "@/utils";

interface UseChatOptions {
  fileNames?: string[];
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  streamingContent: string;
  sendMessage: (content: string) => Promise<void>;
  stopGeneration: () => void;
  clearMessages: () => void;
  clearError: () => void;
}

export function useChat({ fileNames = [] }: UseChatOptions = {}): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingContent, setStreamingContent] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStreamingContent((current) => {
      if (current) {
        setMessages((prev) => [
          ...prev,
          { id: generateId(), role: "assistant", content: current },
        ]);
      }
      return "";
    });
    setIsLoading(false);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setStreamingContent("");
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: content.trim(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setError(null);
      setIsLoading(true);
      setStreamingContent("");

      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
            fileNames: fileNames.length > 0 ? fileNames : undefined,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `Request failed with status ${response.status}`
          );
        }

        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("text/event-stream")) {
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          let accumulatedContent = "";

          if (reader) {
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n");

                for (const line of lines) {
                  const data = parseSSEData(line);
                  if (data) {
                    accumulatedContent += data;
                    setStreamingContent(accumulatedContent);
                  }
                }
              }
            } finally {
              reader.releaseLock();
            }
          }

          if (accumulatedContent) {
            setMessages((prev) => [
              ...prev,
              { id: generateId(), role: "assistant", content: accumulatedContent },
            ]);
            setStreamingContent("");
          }
        } else {
          // Handle JSON response
          const data = await response.json();
          let assistantContent = "";
          if (typeof data === "string") assistantContent = data;
          else if (data.content) assistantContent = data.content;
          else if (data.message) assistantContent = data.message;
          else if (data.response) assistantContent = data.response;
          else if (data.choices?.[0]?.message?.content)
            assistantContent = data.choices[0].message.content;
          else assistantContent = JSON.stringify(data);

          setMessages((prev) => [
            ...prev,
            { id: generateId(), role: "assistant", content: assistantContent },
          ]);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("Chat error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
        setStreamingContent("");
        abortControllerRef.current = null;
      }
    },
    [messages, fileNames, isLoading]
  );

  return {
    messages,
    isLoading,
    error,
    streamingContent,
    sendMessage,
    stopGeneration,
    clearMessages,
    clearError,
  };
}

