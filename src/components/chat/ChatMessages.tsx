"use client";

import { FC, useRef, useEffect } from "react";
import { Message } from "@/types";
import { MessageBubble, StreamingMessage } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ErrorBanner } from "./ErrorBanner";
import { EmptyState } from "./EmptyState";

interface ChatMessagesProps {
  messages: Message[];
  streamingContent: string;
  isLoading: boolean;
  error: string | null;
  selectedCount: number;
  sourcesCount: number;
  selectedDocumentName?: string;
  onAddSource: () => void;
  onSuggestionClick: (suggestion: string) => void;
  onClearError: () => void;
}

export const ChatMessages: FC<ChatMessagesProps> = ({
  messages,
  streamingContent,
  isLoading,
  error,
  selectedCount,
  sourcesCount,
  selectedDocumentName,
  onAddSource,
  onSuggestionClick,
  onClearError,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  const isEmpty = messages.length === 0 && !streamingContent;

  return (
    <div className="chat-messages">
      {isEmpty ? (
        <EmptyState
          selectedCount={selectedCount}
          sourcesCount={sourcesCount}
          selectedDocumentName={selectedDocumentName}
          onAddSource={onAddSource}
          onSuggestionClick={onSuggestionClick}
        />
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {streamingContent && <StreamingMessage content={streamingContent} />}

          {isLoading && !streamingContent && <TypingIndicator />}

          {error && <ErrorBanner message={error} onDismiss={onClearError} />}

          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default ChatMessages;

