"use client";

import { FC } from "react";
import { IoAdd, IoDocumentText } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi2";
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
    if (selectedCount > 1) return "Ask about your documents";
    if (selectedCount === 1) return "Ask about your document";
    return "Start a conversation";
  };

  const getDescription = () => {
    if (selectedCount > 1) {
      return `${selectedCount} documents selected. Ask questions and I'll answer using content from all selected documents.`;
    }
    if (selectedCount === 1 && selectedDocumentName) {
      return `Your document "${selectedDocumentName}" is ready. Ask questions and I'll answer using the document's content.`;
    }
    if (sourcesCount > 0) {
      return "Select sources from the sidebar or ask a general question.";
    }
    return "Upload a source document or start chatting to explore topics with AI.";
  };

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {selectedCount > 0 ? (
          <IoDocumentText className="w-10 h-10 text-[var(--accent-primary)]" />
        ) : (
          <HiSparkles className="w-10 h-10 text-[var(--accent-primary)]" />
        )}
      </div>

      <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
        {getTitle()}
      </h3>

      <p className="text-[var(--text-secondary)] mb-6 max-w-md">
        {getDescription()}
      </p>

      {sourcesCount === 0 && (
        <button onClick={onAddSource} className="btn btn-primary mb-6">
          <IoAdd className="w-5 h-5" />
          Add source
        </button>
      )}

      <div className="suggestion-chips">
        {suggestions.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => onSuggestionClick(suggestion)}
            className="suggestion-chip"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;

