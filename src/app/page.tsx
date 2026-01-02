"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { IoSend, IoSparkles, IoStop, IoClose, IoAdd, IoDocumentText } from "react-icons/io5";
import { HiSparkles, HiDocumentText } from "react-icons/hi2";
import { Streamdown } from "streamdown";
import SourcesSidebar from "@/components/notebook/SourcesSidebar";
import StudioPanel from "@/components/notebook/StudioPanel";
import UploadModal from "@/components/notebook/UploadModal";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Source = {
  id: string;
  name: string;
  type: "pdf" | "doc" | "txt" | "default";
};

export default function Home() {
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedSourceIds, setSelectedSourceIds] = useState<string[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
  };

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (streamingContent) {
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: streamingContent,
      };
      setMessages(prev => [...prev, assistantMessage]);
      setStreamingContent("");
    }
    setIsLoading(false);
  }, [streamingContent]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input?.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input.trim(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setError(null);
    setIsLoading(true);
    setStreamingContent("");
    
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
    
    abortControllerRef.current = new AbortController();
    
    // Get selected file names for RAG
    const selectedFileNames = sources
      .filter(s => selectedSourceIds.includes(s.id))
      .map(s => s.name);
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          fileNames: selectedFileNames.length > 0 ? selectedFileNames : undefined,
        }),
        signal: abortControllerRef.current.signal,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('text/event-stream')) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let accumulatedContent = "";
        
        if (reader) {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              
              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split('\n');
              
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6).trim();
                  if (data === '[DONE]') break;
                  try {
                    const parsed = JSON.parse(data);
                    accumulatedContent += parsed;
                    setStreamingContent(accumulatedContent);
                  } catch {
                    accumulatedContent += data;
                    setStreamingContent(accumulatedContent);
                  }
                }
              }
            }
          } finally {
            reader.releaseLock();
          }
        }
        
        if (accumulatedContent) {
          const assistantMessage: Message = {
            id: generateId(),
            role: "assistant",
            content: accumulatedContent,
          };
          setMessages(prev => [...prev, assistantMessage]);
          setStreamingContent("");
        }
      } else {
        const data = await response.json();
        let assistantContent = "";
        if (typeof data === "string") assistantContent = data;
        else if (data.content) assistantContent = data.content;
        else if (data.message) assistantContent = data.message;
        else if (data.response) assistantContent = data.response;
        else if (data.choices?.[0]?.message?.content) assistantContent = data.choices[0].message.content;
        else assistantContent = JSON.stringify(data);
        
        setMessages(prev => [...prev, { id: generateId(), role: "assistant", content: assistantContent }]);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      console.error("Chat error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
      setStreamingContent("");
      abortControllerRef.current = null;
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const handleFileUploaded = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    let type: Source["type"] = "default";
    if (ext === "pdf") type = "pdf";
    else if (ext === "doc" || ext === "docx") type = "doc";
    else if (ext === "txt") type = "txt";
    
    const newSource: Source = {
      id: generateId(),
      name: fileName,
      type,
    };
    setSources(prev => [...prev, newSource]);
    setSelectedSourceIds(prev => [...prev, newSource.id]);
    setIsUploadOpen(false);
  };

  const handleRemoveSource = (id: string) => {
    setSources(prev => prev.filter(s => s.id !== id));
    setSelectedSourceIds(prev => prev.filter(sid => sid !== id));
  };

  const handleToggleSource = (id: string) => {
    setSelectedSourceIds(prev => 
      prev.includes(id) 
        ? prev.filter(sid => sid !== id)
        : [...prev, id]
    );
  };

  const handleSelectAllSources = () => {
    if (selectedSourceIds.length === sources.length) {
      setSelectedSourceIds([]);
    } else {
      setSelectedSourceIds(sources.map(s => s.id));
    }
  };

  const suggestions = selectedSourceIds.length > 0
    ? selectedSourceIds.length > 1
      ? [
          "Compare these documents",
          "What are the common themes?",
          "Summarize the key differences",
          "Create a combined overview",
        ]
      : [
          "Summarize this document",
          "What are the key points?",
          "Explain the main concepts",
          "What conclusions can be drawn?",
        ]
    : [
        "Explain quantum computing",
        "Write a poem about AI",
        "How does machine learning work?",
        "Help me brainstorm ideas",
      ];

  return (
    <div className="notebook-layout">
      {/* Sources Sidebar */}
      <SourcesSidebar
        sources={sources}
        onAddSource={() => setIsUploadOpen(true)}
        onRemoveSource={handleRemoveSource}
        onToggleSource={handleToggleSource}
        onSelectAll={handleSelectAllSources}
        selectedSourceIds={selectedSourceIds}
      />

      {/* Main Chat Area */}
      <div className="chat-container">
        {/* Header */}
        <header className="chat-header">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-medium text-[var(--text-primary)]">Chat</h2>
            {selectedSourceIds.length > 0 && (
              <div className="rag-badge">
                <div className="rag-badge-dot" />
                <span className="text-[var(--accent-primary)]">
                  RAG: {selectedSourceIds.length === 1 
                    ? sources.find(s => s.id === selectedSourceIds[0])?.name 
                    : `${selectedSourceIds.length} documents`}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMessages([])}
              disabled={messages.length === 0}
              className="btn btn-secondary text-sm disabled:opacity-50"
            >
              Clear chat
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="chat-messages">
          {messages.length === 0 && !streamingContent ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                {selectedSourceIds.length > 0 ? (
                  <IoDocumentText className="w-10 h-10 text-[var(--accent-primary)]" />
                ) : (
                  <HiSparkles className="w-10 h-10 text-[var(--accent-primary)]" />
                )}
              </div>
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                {selectedSourceIds.length > 1 
                  ? "Ask about your documents" 
                  : selectedSourceIds.length === 1 
                    ? "Ask about your document" 
                    : "Start a conversation"}
              </h3>
              <p className="text-[var(--text-secondary)] mb-6 max-w-md">
                {selectedSourceIds.length > 1
                  ? `${selectedSourceIds.length} documents selected. Ask questions and I'll answer using content from all selected documents.`
                  : selectedSourceIds.length === 1 
                    ? `Your document "${sources.find(s => s.id === selectedSourceIds[0])?.name}" is ready. Ask questions and I'll answer using the document's content.`
                    : sources.length > 0 
                      ? "Select sources from the sidebar or ask a general question."
                      : "Upload a source document or start chatting to explore topics with AI."}
              </p>
              
              {sources.length === 0 && (
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="btn btn-primary mb-6"
                >
                  <IoAdd className="w-5 h-5" />
                  Add source
                </button>
              )}

              <div className="suggestion-chips">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(suggestion)}
                    className="suggestion-chip"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-row ${message.role}`}
                >
                  <div className={`message-avatar ${message.role}`}>
                    {message.role === "assistant" ? (
                      <IoSparkles className="w-4 h-4" />
                    ) : (
                      "Y"
                    )}
                  </div>
                  <div className={`message-content ${message.role === "assistant" ? "ai" : "user"}`}>
                    {message.role === "assistant" ? (
                      <div className="prose-notebook">
                        <Streamdown>{message.content}</Streamdown>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Streaming */}
              {streamingContent && (
                <div className="message-row">
                  <div className="message-avatar ai">
                    <IoSparkles className="w-4 h-4" />
                  </div>
                  <div className="message-content ai">
                    <div className="prose-notebook">
                      <Streamdown>{streamingContent}</Streamdown>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Loading */}
              {isLoading && !streamingContent && (
                <div className="message-row">
                  <div className="message-avatar ai">
                    <IoSparkles className="w-4 h-4" />
                  </div>
                  <div className="message-content ai">
                    <div className="typing-indicator">
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Error */}
              {error && (
                <div className="error-banner animate-slide-in-up">
                  <IoClose className="error-banner-icon w-5 h-5" />
                  <div className="flex-1">
                    <p className="error-banner-text">{error}</p>
                  </div>
                  <button onClick={() => setError(null)} className="text-red-600 hover:text-red-700">
                    <IoClose className="w-5 h-5" />
                  </button>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="chat-input-area">
          {selectedSourceIds.length > 0 && (
            <div className="flex items-center gap-2 mb-2 px-2 text-xs text-[var(--text-muted)]">
              <IoDocumentText className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>
                Answering from: {' '}
                <span className="text-[var(--accent-primary)] font-medium">
                  {selectedSourceIds.length === 1 
                    ? sources.find(s => s.id === selectedSourceIds[0])?.name
                    : `${selectedSourceIds.length} documents`}
                </span>
              </span>
            </div>
          )}
          <form onSubmit={onSubmit}>
            <div className="chat-input-wrapper">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder={selectedSourceIds.length > 1 
                  ? "Ask about your documents..." 
                  : selectedSourceIds.length === 1 
                    ? "Ask about your document..." 
                    : "Ask anything..."}
                rows={1}
                className="chat-input"
                disabled={isLoading}
              />
              {isLoading ? (
                <button
                  type="button"
                  onClick={stopGeneration}
                  className="btn-icon flex items-center justify-center"
                  title="Stop"
                >
                  <IoStop className="w-5 h-5 text-red-500" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input?.trim()}
                  className="btn-icon primary flex items-center justify-center"
                >
                  <IoSend className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Studio Panel */}
      <StudioPanel hasMessages={messages.length > 0} />

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onFileUploaded={handleFileUploaded}
      />
    </div>
  );
}
