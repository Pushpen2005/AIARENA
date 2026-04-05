import React from 'react';
import { CheckCircle2, Target } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

export default function JudgeRecommendation({ judge }) {
  if (!judge) return null;

  const winner =
    judge.solution_1_score > judge.solution_2_score ? 1
    : judge.solution_1_score < judge.solution_2_score ? 2
    : 0;

  return (
    <div className="glass glow-green border border-transparent rounded-xl overflow-hidden mt-2">

      {/* ── Top accent bar ── */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#39ff14] via-[#39ff1488] to-transparent" />

      {/* ── Judge Header ── */}
      <div className="px-6 py-4 border-b border-[#39ff14]/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target size={16} className="text-[#39ff14]" style={{ filter: 'drop-shadow(0 0 4px #39ff14)' }} />
          <span
            className="text-xs font-bold tracking-[0.2em] uppercase text-[#39ff14]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Judge Panel Analysis
          </span>
        </div>
        <div
          className="text-[10px] tracking-[0.2em] uppercase text-[#39ff14]/50"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {winner === 0 ? 'TIE' : `SOL ${winner} WINS`}
        </div>
      </div>

      {/* ── Judge Content: 2 columns each with score + reasoning side by side ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">

        {/* Solution 1 */}
        <div className="p-6 flex gap-5">
          {/* Score badge */}
          <div className="shrink-0 flex flex-col items-center justify-center min-w-[72px]">
            <span
              className={`text-4xl font-black leading-none ${winner === 1 ? 'score-green' : 'score-dim'}`}
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {judge.solution_1_score}
            </span>
            <span
              className="text-[9px] tracking-[0.25em] uppercase text-white/30 mt-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              /10
            </span>
            {winner === 1 && (
              <CheckCircle2 size={14} className="text-[#39ff14] mt-2" style={{ filter: 'drop-shadow(0 0 4px #39ff14)' }} />
            )}
          </div>
          {/* Divider */}
          <div className="w-px bg-white/5 shrink-0" />
          {/* Reasoning */}
          <div className="flex-1 min-w-0">
            <div
              className="text-[10px] tracking-[0.2em] uppercase text-[#00f5ff]/50 mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Model Alpha · Sol 01
            </div>
            <div className="text-sm text-white/70 leading-relaxed">
              <MarkdownRenderer content={judge.solution_1_reasoning} />
            </div>
          </div>
        </div>

        {/* Solution 2 */}
        <div className="p-6 flex gap-5">
          {/* Score badge */}
          <div className="shrink-0 flex flex-col items-center justify-center min-w-[72px]">
            <span
              className={`text-4xl font-black leading-none ${winner === 2 ? 'score-green' : 'score-dim'}`}
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {judge.solution_2_score}
            </span>
            <span
              className="text-[9px] tracking-[0.25em] uppercase text-white/30 mt-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              /10
            </span>
            {winner === 2 && (
              <CheckCircle2 size={14} className="text-[#39ff14] mt-2" style={{ filter: 'drop-shadow(0 0 4px #39ff14)' }} />
            )}
          </div>
          {/* Divider */}
          <div className="w-px bg-white/5 shrink-0" />
          {/* Reasoning */}
          <div className="flex-1 min-w-0">
            <div
              className="text-[10px] tracking-[0.2em] uppercase text-[#ff0080]/50 mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Model Beta · Sol 02
            </div>
            <div className="text-sm text-white/70 leading-relaxed">
              <MarkdownRenderer content={judge.solution_2_reasoning} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
