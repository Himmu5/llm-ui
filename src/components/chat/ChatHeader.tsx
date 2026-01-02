"use client";

import { FC } from "react";

interface ChatHeaderProps {
  selectedCount: number;
  ragLabel?: string;
  canClear: boolean;
  onClear: () => void;
}

export const ChatHeader: FC<ChatHeaderProps> = ({
  selectedCount,
  ragLabel,
  canClear,
  onClear,
}) => {
  return (
    <header className="chat-header">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-medium text-[var(--text-primary)]">Chat</h2>
        {selectedCount > 0 && ragLabel && (
          <div className="rag-badge">
            <div className="rag-badge-dot" />
            <span className="text-[var(--accent-primary)]">RAG: {ragLabel}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onClear}
          disabled={!canClear}
          className="btn btn-secondary text-sm disabled:opacity-50"
        >
          Clear chat
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;

