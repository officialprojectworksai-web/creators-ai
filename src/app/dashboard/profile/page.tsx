'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { VerificationBadge } from '@/components/VerificationBadge';
import { PortfolioDetailModal } from '@/components/PortfolioDetailModal';
import { AIBriefModal } from '@/components/AIBriefModal';
import { useAuth } from '@/context/auth-context';
import { MarketplaceService } from '@/lib/data/marketplace-service';
import { CreatorWithFullData, PortfolioProject, VerificationClaimType } from '@/types/marketplace';
import confetti from 'canvas-confetti';
import { 
  Palette, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  DollarSign, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ExternalLink, 
  Save, 
  User, 
  Film, 
  ArrowLeft,
  Share2
} from 'lucide-react';

export default function CreatorProfileSystemPage() {
  const { user, role, switchRole, updateUserProfile } = useAuth();
  const [creators, setCreators] = useState<CreatorWithFullData[]>([]);
  const [currentCreator, setCurrentCreator] = useState<CreatorWithFullData | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isAIBriefOpen, setIsAIBriefOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Form State
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [experienceYears, setExperienceYears] = useState(4);
  const [skills, setSkills] = useState<string[]>([]);
  const [aiTools, setAiTools] = useState<string[]>([]);
  const [aiModels, setAiModels] = useState<string[]>([]);
  const [budgetMin, setBudgetMin] = useState(1500);
  const [budgetMax, setBudgetMax] = useState(7500);
  const [availability, setAvailability] = useState<'available' | 'limited' | 'busy'>('available');
  const [commercialTerms, setCommercialTerms] = useState('Full Buyout & Commercial Rights Included');
  const [workflowDesc, setWorkflowDesc] = useState('');

  // New Project Form Modal / Inline
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjCategory, setNewProjCategory] = useState('Luxury Commercial');
  const [newProjMediaUrl, setNewProjMediaUrl] = useState('');
  const [newProjRatio, setNewProjRatio] = useState('9:16');
  const [newProjTools, setNewProjTools] = useState('Runway Gen-3, Midjourney v6.1, ComfyUI');
  const [newProjStep1, setNewProjStep1] = useState('Latent concept generation in Midjourney v6.1');
  const [newProjStep2, setNewProjStep2] = useState('Custom LoRA node assembly in ComfyUI');
  const [newProjStep3, setNewProjStep3] = useState('Runway Gen-3 motion dynamics & 4K Topaz upscale');

  // Verification Claim Form
  const [isAddingClaim, setIsAddingClaim] = useState(false);
  const [claimType, setClaimType] = useState<VerificationClaimType>('workflow_authorship');
  const [claimTitle, setClaimTitle] = useState('');
  const [claimDesc, setClaimDesc] = useState('');
  const [claimUrl, setClaimUrl] = useState('');

  useEffect(() => {
    MarketplaceService.getCreators().then((data) => {
      setCreators(data);
      const active = data.find((c) => c.id === user?.id) || data[0];
      if (active) {
        setCurrentCreator(active);
        setDisplayName(active.display_name);
        setBio(active.bio || '');
        setLocation(active.location || '');
        setExperienceYears(active.experience_years || 4);
        setSkills(active.creator_profile?.skills || []);
        setAiTools(active.creator_profile?.ai_tools || []);
        setAiModels(active.creator_profile?.ai_models || []);
        setBudgetMin(active.creator_profile?.budget_min || 1500);
        setBudgetMax(active.creator_profile?.budget_max || 7500);
        setAvailability((active.creator_profile?.availability as any) || 'available');
        setCommercialTerms(active.creator_profile?.commercial_use_preferences || 'Full Buyout & Commercial Rights Included');
        setWorkflowDesc(active.creator_profile?.workflow_description || '');
      }
    });
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCreator) return;

    await MarketplaceService.updateCreatorProfile(currentCreator.id, {
      display_name: displayName,
      bio,
      location,
      experience_years: experienceYears,
      creator_profile: {
        ...currentCreator.creator_profile,
        skills,
        ai_tools: aiTools,
        ai_models: aiModels,
        budget_min: budgetMin,
        budget_max: budgetMax,
        availability,
        commercial_use_preferences: commercialTerms,
        workflow_description: workflowDesc,
      },
    });

    updateUserProfile({ display_name: displayName, bio, location, experience_years: experienceYears });
    setIsSaved(true);
    try { confetti({ particleCount: 50, spread: 60 }); } catch (e) {}
    setTimeout(() => setIsSaved(false), 4000);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCreator) return;

    await MarketplaceService.addPortfolioProject(currentCreator.id, {
      creator_id: currentCreator.id,
      title: newProjTitle,
      description: 'Custom AI generative production asset with complete verified node graph.',
      media_type: 'video',
      media_url: newProjMediaUrl || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1080&auto=format&fit=crop&q=80',
      thumbnail_url: newProjMediaUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      category: newProjCategory,
      industry: 'Fashion & Luxury',
      tools_used: newProjTools.split(',').map((t) => t.trim()),
      models_used: ['Flux.1 Dev', 'SDXL Turbo'],
      skills_used: ['AI Video Generation', 'ComfyUI Pipelines'],
      workflow_steps: [
        { step: 1, title: 'Phase 1: Seed Generation', detail: newProjStep1 },
        { step: 2, title: 'Phase 2: Node Assembly', detail: newProjStep2 },
        { step: 3, title: 'Phase 3: Motion & Upscale', detail: newProjStep3 },
      ],
      aspect_ratio: newProjRatio,
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

    const updated = await MarketplaceService.getCreators();
    setCreators(updated);
    const refreshed = updated.find((c) => c.id === currentCreator.id);
    if (refreshed) setCurrentCreator(refreshed);
    setIsAddingProject(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  const handleCreateClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCreator) return;

    await MarketplaceService.createVerificationClaim(currentCreator.id, {
      creator_id: currentCreator.id,
      claim_type: claimType,
      claim_title: claimTitle,
      claim_description: claimDesc,
      evidence_url: claimUrl,
      status: 'submitted',
      badge_label: 'Evidence Submitted',
    });

    const updated = await MarketplaceService.getCreators();
    setCreators(updated);
    const refreshed = updated.find((c) => c.id === currentCreator.id);
    if (refreshed) setCurrentCreator(refreshed);
    setIsAddingClaim(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f]">
      <Navbar onOpenAIBrief={() => setIsAIBriefOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Workspace
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-xs font-semibold text-violet-400">Creator Profile Studio</span>
          </div>

          <Link
            href={`/creators/${currentCreator?.id || '00000000-0000-0000-0000-000000000001'}`}
            target="_blank"
            className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition-all"
          >
            <span>View Public Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </Link>
        </div>

        {isSaved && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Profile and portfolio changes saved to Supabase & live marketplace!</span>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-8">
          {/* Section 1: Basic Identity & Bio */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111420]/90 border border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
              <User className="w-5 h-5 text-violet-400" />
              <h2 className="text-lg font-bold text-white">Creator Identity & Professional Summary</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Display Name</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Location & Remote Preferences</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="San Francisco, CA / Remote"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-zinc-300 font-semibold mb-1">Professional Bio & Directorial Focus</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Cinematic AI Director & Multimodal Producer specializing in luxury commercials & ComfyUI pipelines."
                  className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Years of AI Production Experience</label>
                <input
                  type="number"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(parseInt(e.target.value, 10))}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Current Availability Status</label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none"
                >
                  <option value="available">🟢 Available for new campaigns</option>
                  <option value="limited">🟡 Limited availability (selective projects)</option>
                  <option value="busy">🔴 Currently booked</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: AI Stack & Neural Models */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111420]/90 border border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Multimodal AI Stack & Tooling Mastery</h2>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  AI Tools (comma separated)
                </label>
                <input
                  type="text"
                  value={aiTools.join(', ')}
                  onChange={(e) => setAiTools(e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
                  placeholder="Runway Gen-3, Midjourney v6.1, ComfyUI, ElevenLabs, Topaz Video AI"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Diffusion Models & Checkpoints (comma separated)
                </label>
                <input
                  type="text"
                  value={aiModels.join(', ')}
                  onChange={(e) => setAiModels(e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
                  placeholder="Flux.1 Dev, SDXL Turbo, SVD XT, Claude 3.7 Sonnet"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Core AI Skills & Specializations (comma separated)
                </label>
                <input
                  type="text"
                  value={skills.join(', ')}
                  onChange={(e) => setSkills(e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
                  placeholder="AI Video Generation, Prompt Engineering, ComfyUI Pipelines, VFX Composition"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Rate Cards & Commercial Buyout Terms */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111420]/90 border border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Rate Cards & Commercial Licensing Terms</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Minimum Project Budget ($ USD)</label>
                <input
                  type="number"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(parseInt(e.target.value, 10))}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Maximum Project Budget ($ USD)</label>
                <input
                  type="number"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(parseInt(e.target.value, 10))}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-zinc-300 font-semibold mb-1">Standard Commercial Licensing Terms</label>
                <textarea
                  rows={2}
                  value={commercialTerms}
                  onChange={(e) => setCommercialTerms(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-zinc-300 font-semibold mb-1">Production Methodology Description</label>
                <textarea
                  rows={3}
                  value={workflowDesc}
                  onChange={(e) => setWorkflowDesc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 shadow-xl shadow-violet-500/25 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Creator Profile Settings
            </button>
          </div>
        </form>

        {/* Section 4: Manage Portfolio Projects with Workflow Builder */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#111420]/90 border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Film className="w-5 h-5 text-cyan-400" />
              <div>
                <h2 className="text-lg font-bold text-white">Portfolio Projects & 3-Phase Workflows</h2>
                <p className="text-xs text-zinc-400">Add showcase videos with verified node pipeline documentation.</p>
              </div>
            </div>

            <button
              onClick={() => setIsAddingProject(!isAddingProject)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              {isAddingProject ? 'Cancel' : 'Upload New Project'}
            </button>
          </div>

          {/* Add Project Form */}
          {isAddingProject && (
            <form onSubmit={handleAddProject} className="p-6 rounded-2xl bg-black/40 border border-violet-500/40 space-y-4 text-xs animate-fade-in">
              <h3 className="text-sm font-bold text-violet-300">New Portfolio Asset with Workflow Proof</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    placeholder="e.g. Cyberpunk Luxury Ad"
                    className="w-full p-2.5 rounded-lg bg-black/60 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Category</label>
                  <select
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-black/60 border border-white/10 text-white"
                  >
                    <option value="Luxury Commercial">Luxury Commercial</option>
                    <option value="Streetwear Campaign">Streetwear Campaign</option>
                    <option value="Automotive Campaign">Automotive Campaign</option>
                    <option value="Gaming Teaser">Gaming Teaser</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-300 font-semibold mb-1">Media Preview Image / Video URL</label>
                  <input
                    type="url"
                    value={newProjMediaUrl}
                    onChange={(e) => setNewProjMediaUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 rounded-lg bg-black/60 border border-white/10 text-white"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] font-bold text-cyan-300 uppercase">3-Step Pipeline Documentation</span>
                  <input
                    type="text"
                    value={newProjStep1}
                    onChange={(e) => setNewProjStep1(e.target.value)}
                    placeholder="Phase 1: Seed Generation"
                    className="w-full p-2 rounded bg-black/60 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={newProjStep2}
                    onChange={(e) => setNewProjStep2(e.target.value)}
                    placeholder="Phase 2: Node Assembly"
                    className="w-full p-2 rounded bg-black/60 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={newProjStep3}
                    onChange={(e) => setNewProjStep3(e.target.value)}
                    placeholder="Phase 3: Motion & Upscale"
                    className="w-full p-2 rounded bg-black/60 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 shadow-md"
              >
                Publish Project to Portfolio
              </button>
            </form>
          )}

          {/* Projects List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(currentCreator?.portfolio || []).map((proj) => (
              <div key={proj.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={proj.thumbnail_url || proj.media_url} alt={proj.title} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold text-sm text-white">{proj.title}</div>
                    <div className="text-[11px] text-zinc-400">{proj.category} • {proj.aspect_ratio}</div>
                    <div className="text-[10px] text-emerald-400">{proj.commercial_use_status}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(proj)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-violet-600 text-white text-xs font-semibold"
                >
                  Inspect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Trust Verification Claims */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#111420]/90 border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <h2 className="text-lg font-bold text-white">Trust & Verification Credentials</h2>
                <p className="text-xs text-zinc-400">Submit GitHub ComfyUI repositories, model checkpoint hashes, and commercial client references.</p>
              </div>
            </div>

            <button
              onClick={() => setIsAddingClaim(!isAddingClaim)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md"
            >
              + Submit Evidence Claim
            </button>
          </div>

          {isAddingClaim && (
            <form onSubmit={handleCreateClaim} className="p-4 rounded-2xl bg-black/40 border border-emerald-500/40 space-y-3 text-xs animate-fade-in">
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
                    value={claimUrl}
                    onChange={(e) => setClaimUrl(e.target.value)}
                    placeholder="https://github.com/... or https://huggingface.co/..."
                    className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-300 font-semibold mb-1">Description & Audit Notes</label>
                  <textarea
                    rows={2}
                    required
                    value={claimDesc}
                    onChange={(e) => setClaimDesc(e.target.value)}
                    placeholder="Explain how the auditor can reproduce this workflow..."
                    className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500"
              >
                Submit Evidence to Auditor Desk
              </button>
            </form>
          )}

          <div className="space-y-3">
            {(currentCreator?.verification_claims || []).map((c) => (
              <div key={c.id} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">{c.claim_title}</div>
                  <div className="text-[11px] text-zinc-400 font-mono truncate max-w-md">{c.evidence_url}</div>
                </div>
                <VerificationBadge status={c.status} label={c.badge_label} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Portfolio Detail Modal */}
      <PortfolioDetailModal
        project={selectedProject}
        creator={currentCreator}
        onClose={() => setSelectedProject(null)}
      />

      {/* AI Brief Modal */}
      <AIBriefModal
        isOpen={isAIBriefOpen}
        onClose={() => setIsAIBriefOpen(false)}
      />
    </div>
  );
}
