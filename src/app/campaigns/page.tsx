'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AIBriefModal } from '@/components/AIBriefModal';
import { MarketplaceService } from '@/lib/data/marketplace-service';
import { Campaign } from '@/types/marketplace';
import { 
  Sparkles, 
  Briefcase, 
  ArrowRight, 
  Clock, 
  DollarSign, 
  Film, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  PlusCircle,
  Search
} from 'lucide-react';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [isAIBriefOpen, setIsAIBriefOpen] = useState(false);

  useEffect(() => {
    MarketplaceService.getCampaigns().then(setCampaigns);
  }, []);

  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesSearch = 
      camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.industry.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry = selectedIndustry === 'all' || camp.industry.toLowerCase().includes(selectedIndustry.toLowerCase());

    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f]">
      <Navbar onOpenAIBrief={() => setIsAIBriefOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-700/50 text-cyan-300 text-xs font-semibold mb-3">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Campaign Opportunities</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Brand & Agency Campaign Briefs
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Explore active AI video and image campaigns. Each brief features commercial terms, required model toolsets, and automated match scores.
            </p>
          </div>

          <button
            onClick={() => setIsAIBriefOpen(true)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-violet-500/25 inline-flex items-center gap-2 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            + Create New AI Brief
          </button>
        </div>

        {/* Search & Industry Filter Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search briefs by keyword or tool..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {['all', 'Fashion & Apparel', 'Tech & SaaS', 'Food & Beverage'].map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedIndustry === ind
                    ? 'bg-violet-600 text-white font-semibold'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {ind === 'all' ? 'All Industries' : ind}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredCampaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-6 rounded-2xl bg-[#111420]/80 border border-white/10 hover:border-violet-500/40 transition-all flex flex-col justify-between shadow-xl group"
            >
              <div className="space-y-3.5">
                {/* Header Tag & Budget */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-950 text-violet-300 border border-violet-800">
                    {camp.industry}
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Budget Cap</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      ${camp.budget_min.toLocaleString()} – ${camp.budget_max.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base text-white group-hover:text-violet-300 transition-colors leading-snug">
                  <Link href={`/campaigns/${camp.id}`}>{camp.title}</Link>
                </h3>

                {/* Objective */}
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {camp.objective}
                </p>

                {/* Specs Pill Summary */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-[11px] text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Deliverables:</span>
                    <span className="font-mono text-white font-semibold">{camp.deliverable_quantity} Assets ({camp.aspect_ratios.join(', ')})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Duration:</span>
                    <span className="font-mono text-zinc-300">{camp.duration_seconds}s per piece</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Commercial Term:</span>
                    <span className="text-emerald-400 font-medium truncate max-w-[170px]">{camp.commercial_usage_type}</span>
                  </div>
                </div>

                {/* Required AI Tools */}
                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-500 block mb-1.5">Required AI Models</span>
                  <div className="flex flex-wrap gap-1">
                    {camp.required_tools.map((tool) => (
                      <span key={tool} className="px-2 py-0.5 rounded bg-violet-950/60 border border-violet-800/40 text-violet-300 text-[10px]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Due in 21 days
                </span>

                <Link
                  href={`/campaigns/${camp.id}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 transition-colors inline-flex items-center gap-1.5 shadow-md"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  View Matched Creators
                </Link>
              </div>
            </div>
          ))}
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
