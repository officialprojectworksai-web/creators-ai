'use client';

import React from 'react';
import { CreatorWithFullData } from '@/types/marketplace';
import { VerificationBadge } from './VerificationBadge';
import { 
  X, 
  Sparkles, 
  Star, 
  MapPin, 
  DollarSign, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import Link from 'next/link';

interface CreatorComparisonModalProps {
  creators: CreatorWithFullData[];
  onClose: () => void;
  onRemoveCreator: (id: string) => void;
}

export function CreatorComparisonModal({
  creators,
  onClose,
  onRemoveCreator,
}: CreatorComparisonModalProps) {
  if (creators.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl glass-dropdown border border-white/15 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#0e111d]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Side-by-Side Creator Comparison</h3>
              <p className="text-xs text-zinc-400">
                Comparing {creators.length} AI creators across tools, rate cards, and verified production credentials.
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

        {/* Modal Body: Comparison Table */}
        <div className="p-6 overflow-x-auto overflow-y-auto flex-1 text-xs">
          <div className={`grid gap-4 ${creators.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} min-w-[650px]`}>
            {creators.map((creator) => {
              const profile = creator.creator_profile;
              const verifiedClaim = (creator.verification_claims || []).find((v) => v.status === 'verified');

              return (
                <div key={creator.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between">
                  <div>
                    {/* Header with Remove */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={creator.avatar_url || ''}
                          alt={creator.display_name}
                          className="w-12 h-12 rounded-xl object-cover border border-violet-500/40"
                        />
                        <div>
                          <div className="font-bold text-sm text-white">{creator.display_name}</div>
                          <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {creator.location}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveCreator(creator.id)}
                        className="p-1 text-zinc-500 hover:text-rose-400"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Verification Status */}
                    <div className="mt-3">
                      <VerificationBadge
                        status={verifiedClaim?.status || 'submitted'}
                        label={verifiedClaim?.badge_label || 'Evidence Submitted'}
                        size="sm"
                      />
                    </div>

                    {/* Rating & Completed Projects */}
                    <div className="mt-3 p-2.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Score & Track Record</span>
                      <div className="flex items-center gap-1 font-semibold text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{profile?.rating || 4.9}</span>
                        <span className="text-zinc-500 font-normal">({profile?.completed_projects || 0} jobs)</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mt-3">
                      <div className="text-[10px] uppercase font-mono text-zinc-400 mb-1">Rate Range</div>
                      <div className="text-sm font-bold text-emerald-400">
                        ${profile?.budget_min?.toLocaleString()} – ${profile?.budget_max?.toLocaleString()}
                        <span className="text-[10px] text-zinc-400 font-normal ml-1">/ project</span>
                      </div>
                    </div>

                    {/* AI Tools */}
                    <div className="mt-3">
                      <div className="text-[10px] uppercase font-mono text-zinc-400 mb-1.5 flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-violet-400" />
                        AI Toolset
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(profile?.ai_tools || []).map((tool) => (
                          <span key={tool} className="px-2 py-0.5 rounded bg-violet-950/60 border border-violet-700/40 text-violet-300 text-[10px]">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AI Models */}
                    <div className="mt-3">
                      <div className="text-[10px] uppercase font-mono text-zinc-400 mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        Neural Diffusion Models
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(profile?.ai_models || []).map((model) => (
                          <span key={model} className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-[10px]">
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Supported Formats */}
                    <div className="mt-3">
                      <div className="text-[10px] uppercase font-mono text-zinc-400 mb-1">Supported Formats</div>
                      <div className="text-zinc-300 text-[11px]">
                        {(profile?.supported_formats || []).join(', ')}
                      </div>
                    </div>

                    {/* Commercial Terms */}
                    <div className="mt-3 p-2.5 rounded-lg bg-white/5 text-[11px] text-zinc-300">
                      <div className="font-semibold text-zinc-200 mb-0.5 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        Licensing
                      </div>
                      <p className="line-clamp-2">{profile?.commercial_use_preferences}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                    <Link
                      href={`/creators/${creator.id}`}
                      className="w-full py-2 text-center rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors"
                    >
                      View Full Profile
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0e111d] flex items-center justify-between">
          <div className="text-xs text-zinc-400">
            Selected: {creators.length} creator(s)
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-white/10 hover:bg-white/20 transition-all"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
