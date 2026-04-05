import React from 'react';
import SolutionComparison from './SolutionComparison';
import JudgeRecommendation from './JudgeRecommendation';

export default function ChatMessage({ message, index }) {
  return (
    <div className="animate-fade-up py-12 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── User Prompt ── */}
        <div className="mb-8 flex items-start gap-4">
          <div
            className="shrink-0 text-[10px] font-bold tracking-[0.2em] uppercase text-[#00f5ff]/60 pt-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            #{String(index + 1).padStart(2, '0')}
          </div>
          <div>
            <div
              className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Problem Statement
            </div>
            <p
              className="text-white/90 text-lg leading-relaxed font-medium"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {message.problem}
            </p>
          </div>
        </div>

        {/* ── Solutions ── */}
        <SolutionComparison solution1={message.solution_1} solution2={message.solution_2} />

        {/* ── Judge ── */}
        <JudgeRecommendation judge={message.judge} />

      </div>
    </div>
  );
}
