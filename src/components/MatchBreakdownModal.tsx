'use client';

import React from 'react';
import { CreatorMatch } from '@/types/marketplace';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  TrendingUp, 
  Cpu, 
  DollarSign, 
  Film, 
  ShieldCheck 
} from 'lucide-react';

interface MatchBreakdownModalProps {
  match: CreatorMatch | null;
  onClose: () => void;
}

export function MatchBreakdownModal({ match, onClose }: MatchBreakdownModalProps) {
  if (!match) return null;

  const score = match.total_score;
  const breakdown = match.score_breakdown;

  const getScoreColor = (val: number) => {
    if (val >= 90) return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
    if (val >= 75) return 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30';
    if (val >= 60) return 'text-amber-400 bg-amber-950/40 border-amber-500/30';
    return 'text-rose-400 bg-rose-950/40 border-rose-500/30';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl glass-dropdown border border-white/15 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#0e111d]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Explainable AI Compatibility Breakdown</h3>
              <p className="text-xs text-zinc-400">
                Match evaluation between <strong className="text-white">{match.creator?.display_name}</strong> and <strong className="text-white">{match.campaign?.title}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Total Overall Score Gauge */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-violet-950/40 to-cyan-950/30 border border-violet-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-zinc-400 block">Overall Compatibility</span>
              <div className="text-2xl font-black text-white flex items-baseline gap-1">
                <span>{score.toFixed(1)}</span>
                <span className="text-sm font-normal text-zinc-400">/ 100</span>
              </div>
              <span className="text-[11px] text-zinc-300">
                {score >= 90 ? 'Exceptional Fit (Recommended for Direct Booking)' : score >= 75 ? 'Strong Fit' : 'Moderate Alignment'}
              </span>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 rounded-full text-xs font-bold badge-verified">
                {match.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* 5-Factor Weighted Score Breakdown */}
          <div>
            <h4 className="font-semibold text-zinc-300 uppercase tracking-wider text-[11px] mb-3">
              Itemized Scoring Factors (0–100 Normalized)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Factor 1: Skills */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <div>
                    <div className="font-semibold text-white">Skill Overlap</div>
                    <div className="text-[10px] text-zinc-400">Weight: 30%</div>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded font-mono font-bold text-xs border ${getScoreColor(breakdown?.skill_score || 80)}`}>
                  {breakdown?.skill_score || 80}%
                </div>
              </div>

              {/* Factor 2: Tools & Models */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="font-semibold text-white">AI Tool & Model Fit</div>
                    <div className="text-[10px] text-zinc-400">Weight: 25%</div>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded font-mono font-bold text-xs border ${getScoreColor(breakdown?.tool_score || 85)}`}>
                  {breakdown?.tool_score || 85}%
                </div>
              </div>

              {/* Factor 3: Budget Alignment */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-semibold text-white">Budget Compatibility</div>
                    <div className="text-[10px] text-zinc-400">Weight: 15%</div>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded font-mono font-bold text-xs border ${getScoreColor(breakdown?.budget_score || 90)}`}>
                  {breakdown?.budget_score || 90}%
                </div>
              </div>

              {/* Factor 4: Format & Ratio */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="font-semibold text-white">Aspect Ratio & Channels</div>
                    <div className="text-[10px] text-zinc-400">Weight: 15%</div>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded font-mono font-bold text-xs border ${getScoreColor(breakdown?.format_score || 95)}`}>
                  {breakdown?.format_score || 95}%
                </div>
              </div>

              {/* Factor 5: Commercial & Industry */}
              <div className="sm:col-span-2 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <div>
                    <div className="font-semibold text-white">Commercial Terms & Industry Experience</div>
                    <div className="text-[10px] text-zinc-400">Weight: 15%</div>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded font-mono font-bold text-xs border ${getScoreColor(breakdown?.commercial_score || 90)}`}>
                  {breakdown?.commercial_score || 90}%
                </div>
              </div>
            </div>
          </div>

          {/* Positive Match Reasons */}
          {match.match_reasons && match.match_reasons.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Positive Match Reasons
              </h4>
              <ul className="space-y-1.5">
                {match.match_reasons.map((reason, idx) => (
                  <li key={idx} className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-zinc-200 text-xs flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Compatibility Warnings or Missing Requirements */}
          {((match.missing_requirements && match.missing_requirements.length > 0) || 
            (match.compatibility_warnings && match.compatibility_warnings.length > 0)) && (
            <div className="space-y-2">
              <h4 className="font-semibold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Compatibility Notes & Gaps
              </h4>
              <ul className="space-y-1.5">
                {(match.compatibility_warnings || []).map((warn, idx) => (
                  <li key={`warn-${idx}`} className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-amber-200 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{warn}</span>
                  </li>
                ))}
                {(match.missing_requirements || []).map((req, idx) => (
                  <li key={`req-${idx}`} className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs flex items-start gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0e111d] flex items-center justify-between">
          <div className="text-[11px] text-zinc-500">
            Formula: 0.30(Skills) + 0.25(Tools) + 0.15(Budget) + 0.15(Format) + 0.15(Commercial)
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-white/10 hover:bg-white/20 transition-all"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
