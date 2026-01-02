"use client";

import { FC } from "react";
import { IoClose } from "react-icons/io5";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorBanner: FC<ErrorBannerProps> = ({ message, onDismiss }) => {
  return (
    <div className="error-banner animate-slide-in-up">
      <IoClose className="error-banner-icon w-5 h-5" />
      <div className="flex-1">
        <p className="error-banner-text">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="text-red-600 hover:text-red-700 transition-colors"
        aria-label="Dismiss error"
      >
        <IoClose className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ErrorBanner;

