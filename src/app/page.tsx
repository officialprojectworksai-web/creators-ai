'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CreatorCard } from '@/components/CreatorCard';
import { AIBriefModal } from '@/components/AIBriefModal';
import { PortfolioDetailModal } from '@/components/PortfolioDetailModal';
import { MarketplaceService } from '@/lib/data/marketplace-service';
import { CreatorWithFullData, PortfolioProject, Campaign } from '@/types/marketplace';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  TrendingUp, 
  Layers, 
  Film, 
  CheckCircle2, 
  Briefcase, 
  Play, 
  Zap,
  Users
} from 'lucide-react';

export default function HomePage() {
  const [creators, setCreators] = useState<CreatorWithFullData[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isAIBriefOpen, setIsAIBriefOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<CreatorWithFullData | null>(null);

  useEffect(() => {
    MarketplaceService.getCreators().then(setCreators);
    MarketplaceService.getCampaigns().then(setCampaigns);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f]">
      <Navbar onOpenAIBrief={() => setIsAIBriefOpen(true)} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-violet-600/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Hackathon Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/70 border border-violet-700/50 text-violet-300 text-xs font-semibold mb-6 animate-fade-in shadow-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>HacXLerate 2026 AI Content Creator Marketplace</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
              From Brief <span className="text-violet-500 font-serif font-normal">→</span> Best Creator{' '}
              <span className="text-cyan-400 font-serif font-normal">→</span> Campaign{' '}
              <span className="text-emerald-400 font-serif font-normal">→</span> Content.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-10">
              The AI-native marketplace connecting leading brands & agencies with vetted generative creators. Discover transparent portfolios, audited ComfyUI workflows, and enforceable commercial rights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsAIBriefOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 shadow-xl shadow-violet-500/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
                Launch AI Brief Builder
              </button>

              <Link
                href="/creators"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4 text-zinc-400" />
                Explore Creator Directory
              </Link>
            </div>

            {/* Key Platform Proof Points */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-10 border-t border-white/10 text-left">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-black text-white font-mono">100%</div>
                <div className="text-xs text-zinc-400 mt-0.5">Audited AI Workflows</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-black text-violet-400 font-mono">0–100</div>
                <div className="text-xs text-zinc-400 mt-0.5">Explainable Match Score</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-black text-cyan-400 font-mono">Full Buyout</div>
                <div className="text-xs text-zinc-400 mt-0.5">Commercial Rights Ready</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-black text-emerald-400 font-mono">&lt; 30s</div>
                <div className="text-xs text-zinc-400 mt-0.5">AI Brief Structuring</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4-STEP MARKETPLACE WORKFLOW */}
        <section className="py-20 border-y border-white/10 bg-[#0c0e17]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-xs uppercase font-bold tracking-widest text-violet-400 mb-2">
                Engineered for High-End AI Production
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                How CreatorOS AI Solves Generative Sourcing
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/40 transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/40 text-violet-400 flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h4 className="font-bold text-white text-base">AI-Assisted Brief Builder</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Turn rough ideas into structured briefs with resolution, aspect ratio, tone, prompt guidelines, and commercial terms.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h4 className="font-bold text-white text-base">Explainable Match Engine</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Deterministic 5-factor scoring evaluating skills, toolkits, format support, budget compatibility, and track record.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h4 className="font-bold text-white text-base">Evidence-Based Trust Desk</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  No fake badges. Verify creators with audited ComfyUI node graphs, LoRA weights, API logs, and client revenue references.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/40 transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold text-sm">
                  04
                </div>
                <h4 className="font-bold text-white text-base">Commercial Delivery</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Clear licensing terms, master asset source transfers, and FTC/EU AI Act transparency compliance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TOP VERIFIED CREATORS SHOWCASE */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-xs uppercase font-bold tracking-widest text-violet-400 mb-1">
                  Vetted AI Artists & Directors
                </h2>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Featured Creators with Audited Portfolios
                </h3>
              </div>

              <Link
                href="/creators"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 group"
              >
                <span>Browse all {creators.length} creators</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creators.slice(0, 3).map((creator) => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  onOpenProject={(proj) => {
                    setSelectedProject(proj);
                    setSelectedCreator(creator);
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ACTIVE CAMPAIGN BRIEFS */}
        <section className="py-16 border-t border-white/10 bg-[#0b0d16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-xs uppercase font-bold tracking-widest text-cyan-400 mb-1">
                  Live Opportunities
                </h2>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Active Brand & Agency Briefs
                </h3>
              </div>

              <Link
                href="/campaigns"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group"
              >
                <span>View all active briefs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {campaigns.map((camp) => (
                <div key={camp.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/40 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-950 text-violet-300 border border-violet-800">
                        {camp.industry}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        ${camp.budget_min.toLocaleString()} – ${camp.budget_max.toLocaleString()}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-base leading-snug">{camp.title}</h4>
                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                      {camp.objective}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {camp.required_tools.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {camp.deliverable_quantity} Assets • {camp.aspect_ratios.join(', ')}
                    </span>
                    <Link
                      href={`/campaigns/${camp.id}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 transition-colors"
                    >
                      View Matches
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI BRIEF BUILDER HERO BANNER */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-violet-950/60 via-[#111420] to-cyan-950/40 border border-violet-500/30 text-center space-y-6 relative shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/50 border border-violet-600/40 text-violet-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Zero-Friction Creative Intake</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Have a campaign in mind? Let AI generate the brief.
              </h2>
              <p className="text-sm text-zinc-300 max-w-xl mx-auto">
                Paste any rough creative concept. Our engine extracts deliverables, visual styling, required AI models, and commercial terms in seconds.
              </p>

              <button
                onClick={() => setIsAIBriefOpen(true)}
                className="px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 shadow-xl shadow-violet-500/25 inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                Try AI Brief Generator Now
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* AI Brief Modal */}
      <AIBriefModal
        isOpen={isAIBriefOpen}
        onClose={() => setIsAIBriefOpen(false)}
        onBriefSaved={(briefId) => {
          MarketplaceService.getCampaigns().then(setCampaigns);
        }}
      />

      {/* Portfolio Detail Modal */}
      <PortfolioDetailModal
        project={selectedProject}
        creator={selectedCreator}
        onClose={() => {
          setSelectedProject(null);
          setSelectedCreator(null);
        }}
      />
    </div>
  );
}
