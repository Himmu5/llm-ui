"use client";

import { FC, useState } from "react";
import { IoClose, IoCloudUpload, IoCheckmarkCircle } from "react-icons/io5";
import { Uploader, FileType } from "rsuite";
import "rsuite/dist/rsuite.min.css";

type FileUploadDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onFileUploaded: (fileName: string) => void;
};

const FileUploadDialog: FC<FileUploadDialogProps> = ({
  isOpen,
  onClose,
  onFileUploaded,
}) => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleSuccess = (response: any) => {
    setIsUploading(false);
    const fileName = response.filename;
    setUploadedFile(fileName);
    setTimeout(() => {
      onFileUploaded(fileName);
      setUploadedFile(null);
    }, 1000);
  };

  const handleUpload = () => {
    setIsUploading(true);
  };

  const handleError = () => {
    setIsUploading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 dialog-overlay"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="dialog-content relative z-10 w-full max-w-md mx-4 rounded-2xl p-6 animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <IoClose className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center mb-4">
            <IoCloudUpload className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
            Upload Document
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Upload a PDF, DOC, or TXT file to analyze
          </p>
        </div>

        {/* Upload Area */}
        {uploadedFile ? (
          <div className="flex flex-col items-center py-8">
            <IoCheckmarkCircle className="w-16 h-16 text-green-500 mb-3" />
            <p className="text-[var(--text-primary)] font-medium">{uploadedFile}</p>
            <p className="text-sm text-[var(--text-secondary)]">Upload complete!</p>
          </div>
        ) : (
          <Uploader
            action="http://localhost:8000/llm/upload"
            draggable
            onSuccess={handleSuccess}
            onUpload={handleUpload}
            onError={handleError}
            accept=".pdf,.doc,.docx,.txt"
          >
            <div className="border-2 border-dashed border-[var(--border-accent)] rounded-xl p-8 hover:border-[var(--accent-primary)] hover:bg-[var(--bg-tertiary)]/50 transition-all cursor-pointer">
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border-3 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="text-[var(--text-secondary)]">Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mb-3">
                    <IoCloudUpload className="w-6 h-6 text-[var(--accent-primary)]" />
                  </div>
                  <p className="text-[var(--text-primary)] font-medium mb-1">
                    Drop your file here
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    or click to browse
                  </p>
                </div>
              )}
            </div>
          </Uploader>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadDialog;

