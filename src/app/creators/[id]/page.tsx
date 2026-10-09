'use client';

import React, { useState, useEffect, use, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { VerificationBadge } from '@/components/VerificationBadge';
import { PortfolioDetailModal } from '@/components/PortfolioDetailModal';
import { AIBriefModal } from '@/components/AIBriefModal';
import { MarketplaceService } from '@/lib/data/marketplace-service';
import { CreatorWithFullData, PortfolioProject } from '@/types/marketplace';
import { 
  Sparkles, 
  MapPin, 
  Star, 
  Cpu, 
  Film, 
  Layers, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Calendar, 
  Send, 
  Clock, 
  ArrowLeft,
  Share2,
  FileCode2
} from 'lucide-react';
import Link from 'next/link';

function CreatorProfileContent({ creatorId }: { creatorId: string }) {
  const router = useRouter();
  const [creator, setCreator] = useState<CreatorWithFullData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isAIBriefOpen, setIsAIBriefOpen] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  // Booking Form State
  const [campaignTitle, setCampaignTitle] = useState('');
  const [offeredBudget, setOfferedBudget] = useState('');
  const [briefDetails, setBriefDetails] = useState('');

  useEffect(() => {
    if (creatorId) {
      MarketplaceService.getCreatorById(creatorId).then((data) => {
        setCreator(data);
        setIsLoading(false);
      });
    }
  }, [creatorId]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4 min-h-[60vh]">
        <h2 className="text-xl font-bold text-white">Creator Not Found</h2>
        <p className="text-xs text-zinc-400">The requested AI creator profile does not exist.</p>
        <Link href="/creators" className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold">
          Return to Directory
        </Link>
      </div>
    );
  }

  const profile = creator.creator_profile;
  const verifiedClaims = (creator.verification_claims || []).filter((v) => v.status === 'verified');

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingSuccess(true);
    setTimeout(() => setIsBookingSuccess(false), 5000);
  };

  return (
    <>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          href="/creators"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Creators Directory
        </Link>

        {/* Creator Hero Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111420]/90 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            {/* Left: Avatar & Bio */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={creator.avatar_url || ''}
                alt={creator.display_name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-violet-500/40 shadow-xl ring-2 ring-white/10"
              />

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">{creator.display_name}</h1>
                  {verifiedClaims.length > 0 ? (
                    <VerificationBadge status="verified" label="Verified AI Director" size="md" />
                  ) : (
                    <VerificationBadge status="submitted" label="Evidence Submitted" size="md" />
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                  {creator.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      {creator.location}
                    </span>
                  )}
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {profile?.rating || 4.9} ({profile?.completed_projects || 0} completed projects)
                  </span>
                  <span>•</span>
                  <span className="text-zinc-400">{creator.experience_years} Years in Generative Tech</span>
                </div>

                <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
                  {creator.bio || profile?.experience_summary}
                </p>
              </div>
            </div>

            {/* Right: Rate Card & Instant Actions */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-3 min-w-[240px]">
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Rate Card</span>
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  ${profile?.budget_min?.toLocaleString()} – ${profile?.budget_max?.toLocaleString()}
                  <span className="text-xs text-zinc-400 font-normal font-sans ml-1">/ project</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">
                  Availability: <strong className="text-white capitalize">{profile?.availability}</strong>
                </div>
              </div>

              <a
                href="#booking-section"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-violet-500/25 transition-all"
              >
                Engage Creator
              </a>
            </div>
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. PORTFOLIO SHOWCASE */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Film className="w-4 h-4 text-cyan-400" />
                  AI Production Portfolio ({creator.portfolio?.length || 0})
                </h2>
                <span className="text-xs text-zinc-400">Click any project to inspect ComfyUI workflow</span>
              </div>

              {creator.portfolio && creator.portfolio.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {creator.portfolio.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="group rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/50 overflow-hidden cursor-pointer transition-all shadow-md"
                    >
                      <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.thumbnail_url || project.media_url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end justify-between">
                          <span className="text-[11px] font-semibold text-white">Inspect Workflow</span>
                          <span className="text-[10px] text-zinc-300 font-mono">{project.aspect_ratio}</span>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">
                            {project.category}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-medium">
                            {project.commercial_use_status}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-white group-hover:text-violet-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1 pt-1">
                          {project.tools_used.slice(0, 3).map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-zinc-300">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/10 text-zinc-400 text-xs">
                  Portfolio intake submission under processing.
                </div>
              )}
            </section>

            {/* 2. DOCUMENTED WORKFLOW & METHODOLOGY */}
            <section className="p-6 rounded-2xl bg-[#111420]/80 border border-white/10 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-violet-400" />
                Production Methodology & Pipeline Architecture
              </h2>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {profile?.workflow_description ||
                  'Structured multi-model generative pipeline combining Midjourney v6.1 concept seeds, ComfyUI latent keyframe consistency, and Runway Gen-3 physical camera control with 4K spatial upscaling.'}
              </p>
            </section>

            {/* 3. VERIFIED EVIDENCE & AUDIT CLAIMS */}
            <section className="p-6 rounded-2xl bg-[#111420]/80 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Trust Signals & Audited Evidence Claims ({creator.verification_claims?.length || 0})
                </h2>
                <span className="text-xs text-zinc-400">Admin-audited proofs</span>
              </div>

              <div className="space-y-3">
                {(creator.verification_claims || []).map((claim) => (
                  <div key={claim.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-xs text-white flex items-center gap-2">
                        <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
                        {claim.claim_title}
                      </div>
                      <VerificationBadge status={claim.status} label={claim.badge_label} size="sm" />
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed">{claim.claim_description}</p>

                    {claim.review_notes && (
                      <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-emerald-300">
                        <strong>Auditor Signoff:</strong> {claim.review_notes}
                      </div>
                    )}

                    <div className="pt-1">
                      <a
                        href={claim.evidence_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 hover:underline"
                      >
                        <span>Evidence Source ({claim.evidence_url})</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Stack & Tooling Panel */}
            <div className="p-6 rounded-2xl bg-[#111420]/80 border border-white/10 space-y-5">
              <h3 className="text-xs uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-violet-400" />
                AI Toolset & Neural Models
              </h3>

              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-500 block mb-2">
                  Generative Software & Tools
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(profile?.ai_tools || []).map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-lg bg-violet-950/70 border border-violet-700/50 text-violet-300 text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-500 block mb-2">
                  Fine-tuned Models & Checkpoints
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(profile?.ai_models || []).map((m) => (
                    <span key={m} className="px-2.5 py-1 rounded-lg bg-cyan-950/70 border border-cyan-700/50 text-cyan-300 text-xs font-medium">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-500 block mb-2">
                  Commercial Rights Standard
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {profile?.commercial_use_preferences}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-500 block mb-2">
                  Supported Aspect Ratios & Formats
                </span>
                <div className="text-xs text-zinc-200">
                  {(profile?.supported_formats || []).join(', ')}
                </div>
              </div>
            </div>

            {/* DIRECT ENGAGEMENT BOOKING BOX */}
            <div id="booking-section" className="p-6 rounded-2xl bg-gradient-to-br from-violet-950/40 via-[#111420] to-cyan-950/30 border border-violet-500/30 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Book or Engage {creator.display_name}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Send an official campaign brief or direct project offer. Escrow-secured commercial contracts.
              </p>

              {isBookingSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs space-y-1 animate-fade-in">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Inquiry Sent Successfully!
                  </div>
                  <p className="text-[11px] text-zinc-300">
                    {creator.display_name} has received your brief notification and will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendInquiry} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Campaign Title</label>
                    <input
                      type="text"
                      required
                      value={campaignTitle}
                      onChange={(e) => setCampaignTitle(e.target.value)}
                      placeholder="e.g. Q4 Cyberpunk Lookbook"
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Offered Budget ($ USD)</label>
                    <input
                      type="number"
                      required
                      value={offeredBudget}
                      onChange={(e) => setOfferedBudget(e.target.value)}
                      placeholder={`Min: $${profile?.budget_min || 1000}`}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Brief Description</label>
                    <textarea
                      rows={3}
                      required
                      value={briefDetails}
                      onChange={(e) => setBriefDetails(e.target.value)}
                      placeholder="Describe target deliverables, visual style, and timeline..."
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Direct Engagement Offer
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Workflow Detail Modal */}
      <PortfolioDetailModal
        project={selectedProject}
        creator={creator}
        onClose={() => setSelectedProject(null)}
      />

      {/* AI Brief Modal */}
      <AIBriefModal
        isOpen={isAIBriefOpen}
        onClose={() => setIsAIBriefOpen(false)}
      />
    </>
  );
}

export default function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f]">
      <Navbar />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        </div>
      }>
        <CreatorProfileContent creatorId={resolvedParams.id} />
      </Suspense>
      <Footer />
    </div>
  );
}
