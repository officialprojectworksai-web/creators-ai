'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AIBriefModal } from '@/components/AIBriefModal';
import { VerificationBadge } from '@/components/VerificationBadge';
import { PortfolioDetailModal } from '@/components/PortfolioDetailModal';
import { useAuth } from '@/context/auth-context';
import { MarketplaceService } from '@/lib/data/marketplace-service';
import { CreatorWithFullData, Campaign, PortfolioProject, VerificationClaimType } from '@/types/marketplace';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Layers, 
  Briefcase, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Film, 
  UploadCloud, 
  Send, 
  ExternalLink,
  Cpu,
  Clock,
  TrendingUp,
  FileCode2,
  Users
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, role, switchRole } = useAuth();
  const [isAIBriefOpen, setIsAIBriefOpen] = useState(false);
  const [creators, setCreators] = useState<CreatorWithFullData[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Creator Dashboard State
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectMediaUrl, setProjectMediaUrl] = useState('');
  const [projectCategory, setProjectCategory] = useState('Luxury Commercial');
  const [projectAspectRatio, setProjectAspectRatio] = useState('9:16');
  const [projectTools, setProjectTools] = useState('Runway Gen-3, Midjourney, ComfyUI');
  const [projectStep1, setProjectStep1] = useState('Latent concept prompt generation in Midjourney v6.1');
  const [projectStep2, setProjectStep2] = useState('ComfyUI custom LoRA consistency pipeline');
  const [projectStep3, setProjectStep3] = useState('Runway Gen-3 motion physics & 4K Topaz upscale');

  // Claim State
  const [claimType, setClaimType] = useState<VerificationClaimType>('workflow_authorship');
  const [claimTitle, setClaimTitle] = useState('');
  const [claimDesc, setClaimDesc] = useState('');
  const [claimEvidenceUrl, setClaimEvidenceUrl] = useState('');

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    MarketplaceService.getCreators().then(setCreators);
    MarketplaceService.getCampaigns().then(setCampaigns);
  }, []);

  const currentCreatorData = creators.find((c) => c.id === user?.id) || creators[0];

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCreatorData) return;

    const newProj = await MarketplaceService.addPortfolioProject(currentCreatorData.id, {
      creator_id: currentCreatorData.id,
      title: projectTitle,
      description: projectDesc,
      media_type: 'video',
      media_url: projectMediaUrl || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1080&auto=format&fit=crop&q=80',
      thumbnail_url: projectMediaUrl || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      category: projectCategory,
      industry: 'Fashion & Luxury',
      tools_used: projectTools.split(',').map((t) => t.trim()),
      models_used: ['Flux.1 Dev', 'SDXL Turbo'],
      skills_used: ['AI Video Generation', 'ComfyUI Pipelines'],
      workflow_steps: [
        { step: 1, title: 'Phase 1: Seed Generation', detail: projectStep1 },
        { step: 2, title: 'Phase 2: Node Assembly', detail: projectStep2 },
        { step: 3, title: 'Phase 3: Motion & Upscale', detail: projectStep3 },
      ],
      aspect_ratio: projectAspectRatio,
      duration_seconds: 30,
      platform: 'Instagram Reels',
      commercial_use_status: 'Verified Commercial Ready',
      license_information: 'Full Commercial Buyout - Verified Rights Included',
      evidence_links: ['https://github.com/creatoros/demo-evidence'],
      is_published: true,
      featured: true,
      views_count: 1,
      likes_count: 0,
    });

    // Refresh
    const updated = await MarketplaceService.getCreators();
    setCreators(updated);
    setIsAddingProject(false);
    setNotification('New portfolio project with documented workflow created successfully!');
    try { confetti({ particleCount: 50, spread: 60 }); } catch (e) {}
    setTimeout(() => setNotification(null), 4000);
  };

  const handleCreateClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCreatorData) return;

    await MarketplaceService.createVerificationClaim(currentCreatorData.id, {
      creator_id: currentCreatorData.id,
      claim_type: claimType,
      claim_title: claimTitle,
      claim_description: claimDesc,
      evidence_url: claimEvidenceUrl,
      status: 'submitted',
      badge_label: 'Evidence Submitted',
    });

    const updated = await MarketplaceService.getCreators();
    setCreators(updated);
    setIsSubmittingClaim(false);
    setNotification('Verification claim submitted for admin review!');
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f]">
      <Navbar onOpenAIBrief={() => setIsAIBriefOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Role Selector Header Bar */}
        <div className="p-4 rounded-2xl bg-[#111420]/90 border border-white/10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Active Workspace Persona</div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                <span>{user?.display_name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-violet-950 text-violet-300 border border-violet-800">
                  {role}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
            {(['creator', 'brand', 'agency', 'admin'] as const).map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all capitalize ${
                  role === r
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {r === 'admin' ? 'Admin Desk' : `${r} View`}
              </button>
            ))}
          </div>
        </div>

        {notification && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* ============================================================ */}
        {/* CREATOR VIEW */}
        {/* ============================================================ */}
        {role === 'creator' && currentCreatorData && (
          <div className="space-y-8">
            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-zinc-400">Projects Published</div>
                <div className="text-2xl font-black text-white mt-1">
                  {currentCreatorData.portfolio?.length || 0}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-zinc-400">Verified Evidence Claims</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  {(currentCreatorData.verification_claims || []).filter((v) => v.status === 'verified').length}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-zinc-400">Overall Rating</div>
                <div className="text-2xl font-black text-amber-400 mt-1">
                  {currentCreatorData.creator_profile?.rating || 4.9} ★
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-zinc-400">Rate Range</div>
                <div className="text-sm font-bold text-white mt-2 font-mono">
                  ${currentCreatorData.creator_profile?.budget_min?.toLocaleString()} - ${currentCreatorData.creator_profile?.budget_max?.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Portfolio Projects Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Film className="w-5 h-5 text-cyan-400" />
                  Your AI Portfolio & Workflows ({currentCreatorData.portfolio?.length || 0})
                </h2>

                <button
                  onClick={() => setIsAddingProject(!isAddingProject)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 inline-flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  {isAddingProject ? 'Cancel' : 'Add Project with Workflow'}
                </button>
              </div>

              {/* Add Project Form */}
              {isAddingProject && (
                <form onSubmit={handleAddProject} className="p-6 rounded-2xl bg-[#111420] border border-violet-500/40 space-y-4 animate-fade-in">
                  <h3 className="text-sm font-bold text-violet-300">Add Portfolio Project & Document Workflow</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">Project Title</label>
                      <input
                        type="text"
                        required
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="e.g. Neo-Cyberpunk Luxury Commercial"
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">Category & Format</label>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={projectCategory}
                          onChange={(e) => setProjectCategory(e.target.value)}
                          className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none"
                        >
                          <option value="Luxury Commercial">Luxury Commercial</option>
                          <option value="Streetwear Campaign">Streetwear Campaign</option>
                          <option value="Automotive Campaign">Automotive Campaign</option>
                          <option value="Gaming Teaser">Gaming Teaser</option>
                          <option value="DTC Ad Campaign">DTC Ad Campaign</option>
                        </select>
                        <select
                          value={projectAspectRatio}
                          onChange={(e) => setProjectAspectRatio(e.target.value)}
                          className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none"
                        >
                          <option value="9:16">9:16 Vertical</option>
                          <option value="16:9">16:9 Landscape</option>
                          <option value="1:1">1:1 Square</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-zinc-300 font-semibold mb-1">Project Image/Media Preview URL</label>
                      <input
                        type="url"
                        value={projectMediaUrl}
                        onChange={(e) => setProjectMediaUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/... (or paste video/image URL)"
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-zinc-300 font-semibold mb-1">AI Tools & Models Used</label>
                      <input
                        type="text"
                        value={projectTools}
                        onChange={(e) => setProjectTools(e.target.value)}
                        placeholder="e.g. Runway Gen-3, Midjourney v6.1, ComfyUI, ElevenLabs"
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-2 p-3.5 rounded-xl bg-black/30 border border-white/5">
                      <span className="text-[11px] font-bold text-violet-300 uppercase tracking-wider block">
                        3-Step Production Pipeline Workflow
                      </span>
                      <div>
                        <span className="text-[10px] text-zinc-400">Step 1: Concept & Latent Seed</span>
                        <input
                          type="text"
                          value={projectStep1}
                          onChange={(e) => setProjectStep1(e.target.value)}
                          className="w-full p-2 rounded bg-black/40 border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400">Step 2: Consistency Node Graph</span>
                        <input
                          type="text"
                          value={projectStep2}
                          onChange={(e) => setProjectStep2(e.target.value)}
                          className="w-full p-2 rounded bg-black/40 border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400">Step 3: Motion & Upscale</span>
                        <input
                          type="text"
                          value={projectStep3}
                          onChange={(e) => setProjectStep3(e.target.value)}
                          className="w-full p-2 rounded bg-black/40 border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 shadow-md"
                  >
                    Save & Publish Portfolio Project
                  </button>
                </form>
              )}

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(currentCreatorData.portfolio || []).map((project) => (
                  <div key={project.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={project.thumbnail_url || project.media_url} alt={project.title} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <div className="font-bold text-sm text-white">{project.title}</div>
                        <div className="text-[11px] text-zinc-400">{project.category} • {project.aspect_ratio}</div>
                        <div className="text-[10px] text-emerald-400">{project.commercial_use_status}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-violet-600 text-white text-xs font-semibold transition-all"
                    >
                      Inspect
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Verification Claims Section */}
            <section className="p-6 rounded-2xl bg-[#111420]/80 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    Trust & Verification Claims
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Submit ComfyUI workflow files, API generation logs, or client references to earn verified signals.
                  </p>
                </div>

                <button
                  onClick={() => setIsSubmittingClaim(!isSubmittingClaim)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md"
                >
                  + Submit Evidence Claim
                </button>
              </div>

              {/* Submit Claim Form */}
              {isSubmittingClaim && (
                <form onSubmit={handleCreateClaim} className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 space-y-3 text-xs animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">Claim Type</label>
                      <select
                        value={claimType}
                        onChange={(e) => setClaimType(e.target.value as any)}
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-white"
                      >
                        <option value="workflow_authorship">Workflow Authorship (ComfyUI / Nodes)</option>
                        <option value="tool_proficiency">Tool Proficiency (API Logs / Exports)</option>
                        <option value="portfolio_authenticity">Model Weights (LoRA / Checkpoints)</option>
                        <option value="client_reference">Client Reference / Commercial Attribution</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">Claim Title</label>
                      <input
                        type="text"
                        required
                        value={claimTitle}
                        onChange={(e) => setClaimTitle(e.target.value)}
                        placeholder="e.g. ComfyUI Zero-Gravity Node Pipeline Proof"
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-zinc-300 font-semibold mb-1">Evidence URL (GitHub / HuggingFace / Drive)</label>
                      <input
                        type="url"
                        required
                        value={claimEvidenceUrl}
                        onChange={(e) => setClaimEvidenceUrl(e.target.value)}
                        placeholder="https://github.com/... or https://huggingface.co/..."
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-zinc-300 font-semibold mb-1">Description & Audit Instructions</label>
                      <textarea
                        rows={2}
                        required
                        value={claimDesc}
                        onChange={(e) => setClaimDesc(e.target.value)}
                        placeholder="Describe how the auditor can reproduce or inspect this evidence..."
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500"
                  >
                    Submit to Review Desk
                  </button>
                </form>
              )}

              {/* Claims List */}
              <div className="space-y-3">
                {(currentCreatorData.verification_claims || []).map((c) => (
                  <div key={c.id} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">{c.claim_title}</div>
                      <div className="text-[11px] text-zinc-400 font-mono truncate max-w-md">{c.evidence_url}</div>
                    </div>
                    <VerificationBadge status={c.status} label={c.badge_label} size="sm" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ============================================================ */}
        {/* BRAND & AGENCY VIEW */}
        {/* ============================================================ */}
        {(role === 'brand' || role === 'agency') && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Your Campaign Briefs & Active Sprints</h2>
                <p className="text-xs text-zinc-400">Manage campaign briefs, run AI brief generator, and review matched creators.</p>
              </div>

              <button
                onClick={() => setIsAIBriefOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 shadow-md flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                AI-Assisted Brief Builder
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {campaigns.map((camp) => (
                <div key={camp.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-950 text-violet-300 border border-violet-800 uppercase">
                      {camp.industry}
                    </span>
                    <h3 className="font-bold text-white text-base">{camp.title}</h3>
                    <p className="text-xs text-zinc-400 line-clamp-3">{camp.objective}</p>
                    <div className="text-xs font-bold text-emerald-400 font-mono">
                      ${camp.budget_min.toLocaleString()} – ${camp.budget_max.toLocaleString()}
                    </div>
                  </div>

                  <Link
                    href={`/campaigns/${camp.id}`}
                    className="w-full py-2 rounded-xl text-center text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 transition-colors"
                  >
                    View AI Matches & Shortlist
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ADMIN REVIEW DESK VIEW */}
        {/* ============================================================ */}
        {role === 'admin' && (
          <div className="p-8 rounded-3xl bg-[#111420] border border-amber-500/30 text-center space-y-4">
            <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto" />
            <h2 className="text-2xl font-bold text-white">Administrator Review Desk</h2>
            <p className="text-xs text-zinc-300 max-w-lg mx-auto leading-relaxed">
              You are logged in with Auditor privileges. Inspect evidence links, review ComfyUI node graphs, and approve or reject creator verification claims.
            </p>
            <Link
              href="/admin/verification"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs inline-flex items-center gap-2 shadow-lg"
            >
              Open Auditor Review Portal
            </Link>
          </div>
        )}
      </main>

      <Footer />

      {/* AI Brief Modal */}
      <AIBriefModal
        isOpen={isAIBriefOpen}
        onClose={() => setIsAIBriefOpen(false)}
        onBriefSaved={() => {
          MarketplaceService.getCampaigns().then(setCampaigns);
        }}
      />

      {/* Workflow Inspection Modal */}
      <PortfolioDetailModal
        project={selectedProject}
        creator={currentCreatorData}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
