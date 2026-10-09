'use client';

import React, { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MatchBreakdownModal } from '@/components/MatchBreakdownModal';
import { VerificationBadge } from '@/components/VerificationBadge';
import { AIBriefModal } from '@/components/AIBriefModal';
import { MarketplaceService } from '@/lib/data/marketplace-service';
import { Campaign, CreatorMatch } from '@/types/marketplace';
import { 
  Briefcase, 
  Sparkles, 
  TrendingUp, 
  ArrowLeft, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Cpu, 
  Film, 
  ExternalLink, 
  Layers, 
  Send 
} from 'lucide-react';

function CampaignDetailContent({ campaignId }: { campaignId: string }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [matches, setMatches] = useState<CreatorMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<CreatorMatch | null>(null);
  const [isAIBriefOpen, setIsAIBriefOpen] = useState(false);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);

  useEffect(() => {
    if (campaignId) {
      Promise.all([
        MarketplaceService.getCampaignById(campaignId),
        MarketplaceService.getMatchesForCampaign(campaignId),
      ]).then(([camp, matchResults]) => {
        setCampaign(camp);
        setMatches(matchResults);
        setIsLoading(false);
      });
    }
  }, [campaignId]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4 min-h-[60vh]">
        <h2 className="text-xl font-bold text-white">Campaign Brief Not Found</h2>
        <Link href="/campaigns" className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold">
          Back to Campaigns
        </Link>
      </div>
    );
  }

  const handleToggleShortlist = (creatorId: string) => {
    if (shortlistedIds.includes(creatorId)) {
      setShortlistedIds(shortlistedIds.filter((id) => id !== creatorId));
    } else {
      setShortlistedIds([...shortlistedIds, creatorId]);
    }
  };

  return (
    <>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          href="/campaigns"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Campaigns Directory
        </Link>

        {/* Campaign Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111420]/90 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-950 text-violet-300 border border-violet-800">
                  {campaign.industry}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Status: {campaign.status.toUpperCase()}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {campaign.title}
              </h1>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {campaign.description}
              </p>
            </div>

            {/* Right: Budget Box */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2 min-w-[220px]">
              <span className="text-[10px] uppercase font-mono text-zinc-400 block">Campaign Budget</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                ${campaign.budget_min.toLocaleString()} – ${campaign.budget_max.toLocaleString()}
              </div>
              <span className="text-[11px] text-zinc-400 block">
                Deliverables: <strong className="text-white">{campaign.deliverable_quantity} Assets</strong>
              </span>
            </div>
          </div>

          {/* Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[10px] text-zinc-500 uppercase font-mono">Visual Style</div>
              <div className="font-semibold text-white truncate">{campaign.visual_style}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[10px] text-zinc-500 uppercase font-mono">Deliverable Formats</div>
              <div className="font-semibold text-cyan-400">{campaign.aspect_ratios.join(', ')} ({campaign.resolution})</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[10px] text-zinc-500 uppercase font-mono">Licensing Usage</div>
              <div className="font-semibold text-emerald-400 truncate">{campaign.commercial_usage_type}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[10px] text-zinc-500 uppercase font-mono">Target Platforms</div>
              <div className="font-semibold text-zinc-200">{campaign.platforms.join(', ')}</div>
            </div>
          </div>
        </div>

        {/* AI CREATOR MATCHING ENGINE RESULTS */}
        <div className="mt-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1">
                <TrendingUp className="w-4 h-4" />
                Explainable AI Matching Engine
              </div>
              <h2 className="text-2xl font-bold text-white">
                Best Matched Creators for this Brief ({matches.length})
              </h2>
            </div>

            <div className="text-xs text-zinc-400 font-mono">
              Scoring Weights: Skills (30%) • Tools (25%) • Budget (15%) • Format (15%) • Commercial (15%)
            </div>
          </div>

          {/* Match Cards List */}
          <div className="space-y-4">
            {matches.map((match, rank) => {
              const creator = match.creator;
              if (!creator) return null;
              const profile = creator.creator_profile;
              const isShortlisted = shortlistedIds.includes(creator.id);

              return (
                <div
                  key={match.id}
                  className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl ${
                    match.total_score >= 90
                      ? 'bg-gradient-to-r from-violet-950/30 via-[#111420] to-[#111420] border-violet-500/40'
                      : 'bg-[#111420]/80 border-white/10'
                  }`}
                >
                  {/* Left: Rank & Creator Details */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-sm text-zinc-400 flex-shrink-0">
                      #{rank + 1}
                    </div>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={creator.avatar_url || ''}
                      alt={creator.display_name}
                      className="w-16 h-16 rounded-xl object-cover border border-violet-500/40 flex-shrink-0"
                    />

                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/creators/${creator.id}`}
                          className="font-bold text-lg text-white hover:text-violet-300 transition-colors"
                        >
                          {creator.display_name}
                        </Link>
                        <VerificationBadge status="verified" label="Verified Workflow" size="sm" />
                      </div>

                      <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                        {creator.bio || profile?.experience_summary}
                      </p>

                      {/* AI Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(profile?.ai_tools || []).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-violet-950/70 border border-violet-700/40 text-violet-300 text-[10px]">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Top Match Reason Snippet */}
                      {match.match_reasons.length > 0 && (
                        <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 pt-1">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{match.match_reasons[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Match Score Gauge & Direct Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                    <div className="text-left lg:text-right">
                      <span className="text-[10px] uppercase font-mono text-zinc-400 block">Match Score</span>
                      <div className="text-2xl font-black text-white flex items-baseline gap-1 font-mono">
                        <span className={match.total_score >= 90 ? 'text-emerald-400' : 'text-cyan-400'}>
                          {match.total_score.toFixed(1)}
                        </span>
                        <span className="text-xs text-zinc-500 font-sans">/ 100</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        Rate: ${profile?.budget_min?.toLocaleString()} - ${profile?.budget_max?.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedMatch(match)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        Scoring Breakdown
                      </button>

                      <button
                        onClick={() => handleToggleShortlist(creator.id)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          isShortlisted
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-violet-600 hover:bg-violet-500 text-white'
                        }`}
                      >
                        {isShortlisted ? '✓ Shortlisted' : 'Shortlist Creator'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Match Breakdown Modal */}
      <MatchBreakdownModal
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />

      {/* AI Brief Modal */}
      <AIBriefModal
        isOpen={isAIBriefOpen}
        onClose={() => setIsAIBriefOpen(false)}
      />
    </>
  );
}

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f]">
      <Navbar />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        </div>
      }>
        <CampaignDetailContent campaignId={resolvedParams.id} />
      </Suspense>
      <Footer />
    </div>
  );
}
