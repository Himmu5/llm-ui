"use client";

import { FC, useState } from "react";
import { IoClose, IoCloudUpload, IoCheckmarkCircle } from "react-icons/io5";
import { TbFileAnalytics, TbReportMoney } from "react-icons/tb";
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
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/20">
                <TbReportMoney className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Upload Financial Report</h3>
                <p className="text-xs text-slate-400">Add company reports for AI analysis</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn-icon hover:bg-slate-800"
            >
              <IoClose className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          {uploadedFile ? (
            <div className="flex flex-col items-center py-10 animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-5 animate-float border border-emerald-500/20">
                <IoCheckmarkCircle className="w-12 h-12 text-emerald-400" />
              </div>
              <p className="text-white font-semibold text-lg">{uploadedFile}</p>
              <p className="text-sm text-emerald-400 mt-2 font-medium">Report uploaded successfully!</p>
            </div>
          ) : (
            <Uploader
              action="http://127.0.0.1:8000/llm/upload"
              draggable
              onSuccess={handleSuccess}
              onUpload={() => setIsUploading(true)}
              onError={() => setIsUploading(false)}
              accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
            >
              <div className="upload-dropzone group">
                {isUploading ? (
                  <div className="flex flex-col items-center py-6">
                    <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-5" />
                    <p className="text-white font-semibold">Processing Report...</p>
                    <p className="text-xs text-slate-400 mt-2">Analyzing document structure</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-6">
                    <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/10 border border-emerald-500/20">
                      <TbFileAnalytics className="w-10 h-10 text-emerald-400" />
                    </div>
                    <p className="text-white font-semibold mb-2">
                      Drop financial reports here
                    </p>
                    <p className="text-sm text-slate-400">
                      or click to browse your files
                    </p>
                  </div>
                )}
              </div>
            </Uploader>
          )}

          {/* Supported formats */}
          {!uploadedFile && (
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Supported document types</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "10-K Report", color: "emerald" },
                  { name: "Annual Report", color: "teal" },
                  { name: "Financial Statements", color: "cyan" },
                  { name: "SEC Filings", color: "blue" },
                ].map((format) => (
                  <span
                    key={format.name}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium bg-${format.color}-500/10 text-${format.color}-400 border border-${format.color}-500/20`}
                  >
                    {format.name}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {["PDF", "DOC", "DOCX", "TXT", "XLS", "XLSX"].map((ext) => (
                  <span
                    key={ext}
                    className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-400 uppercase tracking-wider"
                  >
                    .{ext.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!uploadedFile && (
          <div className="modal-footer border-t border-slate-700/50">
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
