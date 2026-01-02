"use client";

import { useState, useMemo } from "react";
import { useChat, useSources } from "@/hooks";
import { ChatHeader, ChatMessages, ChatInput } from "@/components/chat";
import SourcesSidebar from "@/components/notebook/SourcesSidebar";
import StudioPanel from "@/components/notebook/StudioPanel";
import UploadModal from "@/components/notebook/UploadModal";

export default function Home() {
  // Source management
  const {
    sources,
    selectedSourceIds,
    selectedFileNames,
    addSource,
    removeSource,
    toggleSource,
    selectAll,
    getSourceById,
  } = useSources();

  // Chat functionality
  const {
    messages,
    isLoading,
    error,
    streamingContent,
    sendMessage,
    stopGeneration,
    clearMessages,
    clearError,
  } = useChat({ fileNames: selectedFileNames });

  // UI state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [input, setInput] = useState("");

  // Derived state
  const selectedCount = selectedSourceIds.length;

  const ragLabel = useMemo(() => {
    if (selectedCount === 0) return undefined;
    if (selectedCount === 1) {
      return getSourceById(selectedSourceIds[0])?.name;
    }
    return `${selectedCount} documents`;
  }, [selectedCount, selectedSourceIds, getSourceById]);

  const selectedDocumentName = useMemo(() => {
    if (selectedCount === 1) {
      return getSourceById(selectedSourceIds[0])?.name;
    }
    return undefined;
  }, [selectedCount, selectedSourceIds, getSourceById]);

  const selectedLabel = useMemo(() => {
    if (selectedCount === 1) {
      return getSourceById(selectedSourceIds[0])?.name;
    }
    if (selectedCount > 1) {
      return `${selectedCount} documents`;
    }
    return undefined;
  }, [selectedCount, selectedSourceIds, getSourceById]);

  // Handlers
  const handleFileUploaded = (fileName: string) => {
    addSource(fileName);
    setIsUploadOpen(false);
  };

  const handleSendMessage = (message: string) => {
    sendMessage(message);
    setInput("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="notebook-layout">
      {/* Sources Sidebar */}
      <SourcesSidebar
        sources={sources}
        onAddSource={() => setIsUploadOpen(true)}
        onRemoveSource={removeSource}
        onToggleSource={toggleSource}
        onSelectAll={selectAll}
        selectedSourceIds={selectedSourceIds}
      />

      {/* Main Chat Area */}
      <div className="chat-container">
        <ChatHeader
          selectedCount={selectedCount}
          ragLabel={ragLabel}
          canClear={messages.length > 0}
          onClear={clearMessages}
        />

        <ChatMessages
          messages={messages}
          streamingContent={streamingContent}
          isLoading={isLoading}
          error={error}
          selectedCount={selectedCount}
          sourcesCount={sources.length}
          selectedDocumentName={selectedDocumentName}
          onAddSource={() => setIsUploadOpen(true)}
          onSuggestionClick={handleSuggestionClick}
          onClearError={clearError}
        />

        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSendMessage}
          onStop={stopGeneration}
          isLoading={isLoading}
          selectedCount={selectedCount}
          selectedLabel={selectedLabel}
        />
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
