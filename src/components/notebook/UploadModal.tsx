"use client";

import { FC, useState } from "react";
import { IoClose, IoCloudUpload, IoCheckmarkCircle } from "react-icons/io5";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { Uploader } from "rsuite";
import "rsuite/dist/rsuite.min.css";

type UploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onFileUploaded: (fileName: string) => void;
};

const UploadModal: FC<UploadModalProps> = ({ isOpen, onClose, onFileUploaded }) => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleSuccess = (response: { filename: string }) => {
    setIsUploading(false);
    const fileName = response.filename;
    setUploadedFile(fileName);
    setTimeout(() => {
      onFileUploaded(fileName);
      setUploadedFile(null);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-light)] to-[var(--accent-purple-light)] flex items-center justify-center">
                <HiDocumentArrowUp className="w-5 h-5 text-[var(--accent-primary)]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] tracking-tight">Add Source</h3>
                <p className="text-xs text-[var(--text-muted)]">Upload documents for context</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn-icon hover:bg-[var(--bg-hover)]"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          {uploadedFile ? (
            <div className="flex flex-col items-center py-10 animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-[var(--accent-green-light)] flex items-center justify-center mb-5 animate-float">
                <IoCheckmarkCircle className="w-12 h-12 text-[var(--accent-green)]" />
              </div>
              <p className="text-[var(--text-primary)] font-semibold text-lg">{uploadedFile}</p>
              <p className="text-sm text-[var(--accent-green)] mt-2 font-medium">Upload complete!</p>
            </div>
          ) : (
            <Uploader
              action="http://127.0.0.1:8000/llm/upload"
              draggable
              onSuccess={handleSuccess}
              onUpload={() => setIsUploading(true)}
              onError={() => setIsUploading(false)}
              accept=".pdf,.doc,.docx,.txt"
            >
              <div className="upload-dropzone group">
                {isUploading ? (
                  <div className="flex flex-col items-center py-4">
                    <div className="w-12 h-12 border-3 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-[var(--text-secondary)] font-medium">Uploading...</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Processing your document</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-4">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center mb-5 transition-transform group-hover:scale-110">
                      <IoCloudUpload className="w-8 h-8 text-[var(--accent-primary)]" />
                    </div>
                    <p className="text-[var(--text-primary)] font-semibold mb-1">
                      Drop files here or click to browse
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      PDF, DOC, DOCX, TXT up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </Uploader>
          )}

          {/* Supported formats */}
          {!uploadedFile && (
            <div className="mt-6 pt-6 border-t border-[var(--border-light)]">
              <p className="text-xs font-medium text-[var(--text-muted)] mb-3 uppercase tracking-wide">Supported formats</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "PDF", className: "format-badge pdf" },
                  { name: "DOC", className: "format-badge doc" },
                  { name: "DOCX", className: "format-badge docx" },
                  { name: "TXT", className: "format-badge txt" },
                ].map((format) => (
                  <span
                    key={format.name}
                    className={format.className}
                  >
                    {format.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!uploadedFile && (
          <div className="modal-footer border-t border-[var(--border-light)]">
            <button onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadModal;
