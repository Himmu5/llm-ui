"use client";

import { FC, useState } from "react";
import { IoPlay, IoPause, IoSparkles, IoVolumeHigh } from "react-icons/io5";
import { HiLightBulb, HiBookOpen, HiChatBubbleLeftRight, HiBeaker } from "react-icons/hi2";

type StudioPanelProps = {
  hasMessages: boolean;
  onGenerateSummary?: () => void;
};

const StudioPanel: FC<StudioPanelProps> = ({ hasMessages }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioGenerated, setAudioGenerated] = useState(false);

  const handleGenerateAudio = () => {
    setAudioGenerated(true);
  };

  return (
    <aside className="studio-panel">
      {/* Header */}
      <div className="studio-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-primary)] flex items-center justify-center">
            <HiBeaker className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] tracking-tight">Studio</h2>
            <p className="text-xs text-[var(--text-muted)]">AI-powered tools</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="studio-content">
        {/* Audio Overview Card */}
        <div className="audio-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <IoVolumeHigh className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Audio Overview</h3>
              <p className="text-xs opacity-80">Podcast-style summary</p>
            </div>
          </div>
          
          {audioGenerated ? (
            <>
              <div className="audio-waveform">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="audio-bar"
                    style={{
                      animationDelay: `${i * 0.05}s`,
                      height: isPlaying ? undefined : "20%",
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all hover:scale-105"
                >
                  {isPlaying ? (
                    <IoPause className="w-5 h-5" />
                  ) : (
                    <IoPlay className="w-5 h-5 ml-0.5" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-white rounded-full transition-all" />
                  </div>
                  <div className="flex justify-between mt-1.5 text-xs opacity-70">
                    <span>0:52</span>
                    <span>2:34</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={handleGenerateAudio}
              disabled={!hasMessages}
              className="w-full py-3 rounded-xl bg-white/20 hover:bg-white/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-medium hover:scale-[1.02] active:scale-100"
            >
              Generate Audio
            </button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 tracking-tight">Quick Actions</h3>
          
          <button className="w-full flex items-center gap-4 px-4 py-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-tertiary)] text-left hover:bg-[var(--bg-hover)] hover:border-[var(--border-medium)] transition-all duration-200 group hover:-translate-y-0.5 hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)] group-hover:text-white transition-all duration-200">
              <HiLightBulb className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-primary)]">Summarize</p>
              <p className="text-xs text-[var(--text-muted)]">Extract key points</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 px-4 py-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-tertiary)] text-left hover:bg-[var(--bg-hover)] hover:border-[var(--border-medium)] transition-all duration-200 group hover:-translate-y-0.5 hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-purple-light)] flex items-center justify-center text-[var(--accent-purple)] group-hover:bg-[var(--accent-purple)] group-hover:text-white transition-all duration-200">
              <HiBookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-primary)]">Study Guide</p>
              <p className="text-xs text-[var(--text-muted)]">Create flashcards</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 px-4 py-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-tertiary)] text-left hover:bg-[var(--bg-hover)] hover:border-[var(--border-medium)] transition-all duration-200 group hover:-translate-y-0.5 hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-green-light)] flex items-center justify-center text-[var(--accent-green)] group-hover:bg-[var(--accent-green)] group-hover:text-white transition-all duration-200">
              <HiChatBubbleLeftRight className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-primary)]">FAQ</p>
              <p className="text-xs text-[var(--text-muted)]">Common questions</p>
            </div>
          </button>
        </div>

        {/* Tips */}
        <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-hover)] border border-[var(--border-light)]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
              <IoSparkles className="w-4 h-4 text-[var(--accent-primary)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Pro tip</p>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Upload multiple sources to get comprehensive answers with cross-references and citations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default StudioPanel;
