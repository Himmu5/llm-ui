"use client";

import { FC } from "react";
import { IoSparkles } from "react-icons/io5";
import { Streamdown } from "streamdown";
import { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
  userInitial?: string;
}

export const MessageBubble: FC<MessageBubbleProps> = ({
  message,
  userInitial = "Y",
}) => {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`message-row ${message.role}`}>
      <div className={`message-avatar ${message.role}`}>
        {isAssistant ? <IoSparkles className="w-4 h-4" /> : userInitial}
      </div>
      <div className={`message-content ${isAssistant ? "ai" : "user"}`}>
        {isAssistant ? (
          <div className="prose-notebook">
            <Streamdown>{message.content}</Streamdown>
          </div>
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </div>
  );
};

// Streaming message variant
interface StreamingMessageProps {
  content: string;
}

export const StreamingMessage: FC<StreamingMessageProps> = ({ content }) => {
  return (
    <div className="message-row">
      <div className="message-avatar ai">
        <IoSparkles className="w-4 h-4" />
      </div>
      <div className="message-content ai">
        <div className="prose-notebook">
          <Streamdown>{content}</Streamdown>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

