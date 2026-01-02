"use client";

import { FC } from "react";
import { IoDocumentText, IoAdd, IoTrash, IoCheckmarkCircle, IoCheckbox, IoSquareOutline } from "react-icons/io5";
import { HiDocument, HiSparkles } from "react-icons/hi2";
import { BsFilePdf, BsFileWord, BsFileText } from "react-icons/bs";

type Source = {
  id: string;
  name: string;
  type: "pdf" | "doc" | "txt" | "default";
};

type SourcesSidebarProps = {
  sources: Source[];
  onAddSource: () => void;
  onRemoveSource: (id: string) => void;
  onToggleSource: (id: string) => void;
  onSelectAll: () => void;
  selectedSourceIds: string[];
};

const SourcesSidebar: FC<SourcesSidebarProps> = ({
  sources,
  onAddSource,
  onRemoveSource,
  onToggleSource,
  onSelectAll,
  selectedSourceIds,
}) => {
  const getSourceIcon = (type: Source["type"]) => {
    switch (type) {
      case "pdf":
        return <BsFilePdf className="w-5 h-5" />;
      case "doc":
        return <BsFileWord className="w-5 h-5" />;
      case "txt":
        return <BsFileText className="w-5 h-5" />;
      default:
        return <HiDocument className="w-5 h-5" />;
    }
  };

  const getIconClass = (type: Source["type"]) => {
    switch (type) {
      case "pdf":
        return "source-icon pdf";
      case "doc":
        return "source-icon doc";
      case "txt":
        return "source-icon txt";
      default:
        return "source-icon default";
    }
  };

  const isSelected = (id: string) => selectedSourceIds.includes(id);
  const allSelected = sources.length > 0 && selectedSourceIds.length === sources.length;

  return (
    <aside className="sources-sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="notebook-logo">
          <div className="notebook-logo-icon">
            <HiSparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-[var(--text-primary)] tracking-tight">NotebookLM</h1>
            <p className="text-xs text-[var(--text-muted)]">AI Research Assistant</p>
          </div>
        </div>
      </div>

      {/* Sources Header */}
      <div className="px-5 py-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] tracking-tight">Sources</h2>
        <div className="flex items-center gap-2">
          {sources.length > 0 && (
            <button
              onClick={onSelectAll}
              className="text-xs text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
            >
              {allSelected ? "Deselect all" : "Select all"}
            </button>
          )}
          <span className="px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] text-xs font-medium text-[var(--text-muted)]">
            {selectedSourceIds.length > 0 ? `${selectedSourceIds.length}/${sources.length}` : sources.length}
          </span>
        </div>
      </div>

      {/* Add Source Button */}
      <div className="px-4 mb-3">
        <button
          onClick={onAddSource}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-[var(--border-medium)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-all duration-200 text-sm font-medium group"
        >
          <IoAdd className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span>Add source</span>
        </button>
      </div>

      {/* Sources List */}
      <div className="sidebar-content">
        {sources.length === 0 ? (
          <div className="text-center py-12 px-6 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-hover)] flex items-center justify-center">
              <IoDocumentText className="w-7 h-7 text-[var(--text-muted)]" />
            </div>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">
              No sources yet
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Upload PDFs, docs, or text files to get contextual AI responses
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {sources.map((source, index) => (
              <div
                key={source.id}
                className={`source-card ${isSelected(source.id) ? "active" : ""}`}
                onClick={() => onToggleSource(source.id)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    isSelected(source.id) 
                      ? "bg-[var(--accent-primary)] text-white" 
                      : "border border-[var(--border-medium)] text-transparent hover:border-[var(--accent-primary)]"
                  }`}>
                    {isSelected(source.id) && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  
                  <div className={getIconClass(source.type)}>
                    {getSourceIcon(source.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate leading-tight">
                      {source.name}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-wide">
                      {source.type}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSource(source.id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-all duration-200"
                  >
                    <IoTrash className="w-4 h-4" />
                  </button>
                </div>
                {isSelected(source.id) && (
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[var(--border-light)]">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse-subtle" />
                    <span className="text-xs font-medium text-[var(--accent-primary)]">Selected for RAG</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[var(--border-light)]">
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          {selectedSourceIds.length > 1 
            ? "💡 Multiple sources selected - great for comparing documents!"
            : "💡 Select multiple sources to compare and cross-reference"}
        </p>
      </div>
    </aside>
  );
};

export default SourcesSidebar;
