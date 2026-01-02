"use client";

import { FC, useRef, useCallback, FormEvent, KeyboardEvent } from "react";
import { IoSend, IoStop, IoDocumentText } from "react-icons/io5";
import { getPlaceholder } from "@/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (message: string) => void;
  onStop: () => void;
  isLoading: boolean;
  selectedCount: number;
  selectedLabel?: string;
}

export const ChatInput: FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  onStop,
  isLoading,
  selectedCount,
  selectedLabel,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
      e.target.style.height = "auto";
      e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
    },
    [onChange]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!value?.trim() || isLoading) return;
      onSubmit(value.trim());
      onChange("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    },
    [value, isLoading, onSubmit, onChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        e.currentTarget.form?.requestSubmit();
      }
    },
    []
  );

  return (
    <div className="chat-input-area">
      {selectedCount > 0 && selectedLabel && (
        <div className="flex items-center gap-2 mb-2 px-2 text-xs text-[var(--text-muted)]">
          <IoDocumentText className="w-4 h-4 text-[var(--accent-primary)]" />
          <span>
            Answering from:{" "}
            <span className="text-[var(--accent-primary)] font-medium">
              {selectedLabel}
            </span>
          </span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="chat-input-wrapper">
          <textarea
            ref={inputRef}
            value={value}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={getPlaceholder(selectedCount)}
            rows={1}
            className="chat-input"
            disabled={isLoading}
          />
          {isLoading ? (
            <button
              type="button"
              onClick={onStop}
              className="btn-icon flex items-center justify-center"
              title="Stop"
            >
              <IoStop className="w-5 h-5 text-red-500" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!value?.trim()}
              className="btn-icon primary flex items-center justify-center"
            >
              <IoSend className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatInput;

