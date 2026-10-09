'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AIBriefModal } from '@/components/AIBriefModal';
import { useAuth } from '@/context/auth-context';
import { MarketplaceService } from '@/lib/data/marketplace-service';
import { Campaign, CreatorWithFullData } from '@/types/marketplace';
import confetti from 'canvas-confetti';
import { 
  Building2, 
  Sparkles, 
  Briefcase, 
  ShieldCheck, 
  Globe, 
  DollarSign, 
  Save, 
  CheckCircle2, 
  Plus, 
  ArrowRight, 
  TrendingUp,
  ExternalLink,
  Layers,
  Users
} from 'lucide-react';

export default function BrandProfileSystemPage() {
  const { user, role, switchRole, updateUserProfile } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [creators, setCreators] = useState<CreatorWithFullData[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isAIBriefOpen, setIsAIBriefOpen] = useState(false);

  // Brand Form State
  const [brandName, setBrandName] = useState(user?.display_name || 'Lumina Haute Wear');
  const [industry, setIndustry] = useState('Fashion & Apparel');
  const [website, setWebsite] = useState('https://lumina-haute.luxury');
  const [companySize, setCompanySize] = useState('11-50 employees');
  const [monthlyBudget, setMonthlyBudget] = useState(25000);
  const [brandDescription, setBrandDescription] = useState(
    'Avant-garde luxury streetwear & cyberpunk apparel brand launching quarterly experimental lookbooks and social advert sprints.'
  );
  const [targetAudience, setTargetAudience] = useState(
    'Gen-Z and millennial fashion innovators aged 18-32 across North America, Europe, and Asia.'
  );
  const [visualTone, setVisualTone] = useState(
    'Cyberpunk Festive, Neon Noir with Gold & Crimson Highlights, high-energy and avant-garde.'
  );
  const [negativeGuidelines, setNegativeGuidelines] = useState(
    'No low-resolution artifacting, avoid generic static studio lighting, require authentic cultural motifs.'
  );

  useEffect(() => {
    MarketplaceService.getCampaigns().then(setCampaigns);
    MarketplaceService.getCreators().then(setCreators);
  }, []);

  const handleSaveBrandProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ display_name: brandName });
    setIsSaved(true);
    try { confetti({ particleCount: 50, spread: 60 }); } catch (e) {}
    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f]">
      <Navbar onOpenAIBrief={() => setIsAIBriefOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
            >
              Workspace
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-xs font-semibold text-cyan-400">Brand Profile & Campaign Desk</span>
          </div>

          <button
            onClick={() => setIsAIBriefOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            Launch AI Brief Builder
          </button>
        </div>

        {isSaved && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Brand Profile & Creative Guidelines saved successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Brand Profile Editor (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleSaveBrandProfile} className="space-y-6">
              {/* Card 1: Brand Identity */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#111420]/90 border border-white/10 shadow-2xl space-y-6">
                <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-bold text-white">Brand Identity & Company Profile</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Company / Brand Name</label>
                    <input
                      type="text"
                      required
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Industry Sector</label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none"
                    >
                      <option value="Fashion & Apparel">Fashion & Apparel</option>
                      <option value="Tech & SaaS">Tech & SaaS</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Gaming & Entertainment">Gaming & Entertainment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Official Website</label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Monthly Generative Budget ($ USD)</label>
                    <input
                      type="number"
                      value={monthlyBudget}
                      onChange={(e) => setMonthlyBudget(parseInt(e.target.value, 10))}
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-zinc-300 font-semibold mb-1">Brand Overview & Mission</label>
                    <textarea
                      rows={3}
                      value={brandDescription}
                      onChange={(e) => setBrandDescription(e.target.value)}
                      className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Creative Guidelines */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#111420]/90 border border-white/10 shadow-2xl space-y-6">
                <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  <h2 className="text-lg font-bold text-white">Visual Guidelines & Audience Parameters</h2>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Target Audience Demographics</label>
                    <textarea
                      rows={2}
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Visual Style & Tone of Voice</label>
                    <textarea
                      rows={2}
                      value={visualTone}
                      onChange={(e) => setVisualTone(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Negative Constraints (What to avoid in AI generations)</label>
                    <textarea
                      rows={2}
                      value={negativeGuidelines}
                      onChange={(e) => setNegativeGuidelines(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-95 shadow-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Brand Guidelines
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Active Briefs & Top Matched Creators (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Active Briefs Card */}
            <div className="p-6 rounded-3xl bg-[#111420]/90 border border-white/10 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  Your Active Campaign Briefs ({campaigns.length})
                </h3>

                <button
                  onClick={() => setIsAIBriefOpen(true)}
                  className="text-xs text-cyan-400 hover:underline font-semibold"
                >
                  + New Brief
                </button>
              </div>

              <div className="space-y-3">
                {campaigns.map((camp) => (
                  <div key={camp.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="font-bold text-xs text-white leading-tight">{camp.title}</div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        ${camp.budget_min.toLocaleString()} - ${camp.budget_max.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-400 line-clamp-2">{camp.objective}</p>

                    <div className="pt-2 flex items-center justify-between border-t border-white/5 text-[11px]">
                      <span className="text-zinc-500">{camp.deliverable_quantity} Assets ({camp.aspect_ratios.join(', ')})</span>
                      <Link
                        href={`/campaigns/${camp.id}`}
                        className="text-cyan-400 font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>View Matches</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Shortlisted Creators Card */}
            <div className="p-6 rounded-3xl bg-[#111420]/90 border border-white/10 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-violet-400" />
                  Recommended Verified AI Creators
                </h3>
                <Link href="/creators" className="text-xs text-violet-400 hover:underline">
                  Browse All
                </Link>
              </div>

              <div className="space-y-3">
                {creators.slice(0, 3).map((creator) => (
                  <div key={creator.id} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={creator.avatar_url || ''} alt={creator.display_name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <div className="font-bold text-xs text-white">{creator.display_name}</div>
                        <div className="text-[10px] text-zinc-400">${creator.creator_profile?.budget_min?.toLocaleString()} - ${creator.creator_profile?.budget_max?.toLocaleString()}</div>
                      </div>
                    </div>

                    <Link
                      href={`/creators/${creator.id}`}
                      className="px-3 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold"
                    >
                      Hire
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
}
