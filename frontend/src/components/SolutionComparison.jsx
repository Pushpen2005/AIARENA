import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';

export default function SolutionComparison({ solution1, solution2 }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

      {/* ── Model Alpha — Cyan ── */}
      <div className="glass glow-cyan border border-transparent rounded-xl overflow-hidden flex flex-col">
        {/* Header accent bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-[#00f5ff] via-[#00f5ff88] to-transparent" />
        <div className="px-5 py-3 border-b border-[#00f5ff]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] shadow-[0_0_6px_#00f5ff]" />
            <span
              className="text-xs font-bold tracking-[0.15em] uppercase text-[#00f5ff]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Model MistralAI
            </span>
          </div>
          <span
            className="text-[10px] tracking-widest text-white/20 uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Solution 01
          </span>
        </div>
        <div className="p-6 flex-1 overflow-x-auto">
          <MarkdownRenderer content={solution1} />
        </div>
      </div>

      {/* ── Model Beta — Pink ── */}
      <div className="glass glow-pink border border-transparent rounded-xl overflow-hidden flex flex-col">
        <div className="h-0.5 w-full bg-gradient-to-r from-[#ff0080] via-[#ff008088] to-transparent" />
        <div className="px-5 py-3 border-b border-[#ff0080]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff0080] shadow-[0_0_6px_#ff0080]" />
            <span
              className="text-xs font-bold tracking-[0.15em] uppercase text-[#ff0080]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Model GroqAI
            </span>
          </div>
          <span
            className="text-[10px] tracking-widest text-white/20 uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Solution 02
          </span>
        </div>
        <div className="p-6 flex-1 overflow-x-auto">
          <MarkdownRenderer content={solution2} />
        </div>
      </div>

    </div>
  );
}
