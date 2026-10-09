'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CreatorCard } from '@/components/CreatorCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { AIBriefModal } from '@/components/AIBriefModal';
import { PortfolioDetailModal } from '@/components/PortfolioDetailModal';
import { CreatorComparisonModal } from '@/components/CreatorComparisonModal';
import { MarketplaceService, CreatorFilterParams } from '@/lib/data/marketplace-service';
import { CreatorWithFullData, PortfolioProject } from '@/types/marketplace';
import { 
  Search, 
  Sparkles, 
  Users, 
  SlidersHorizontal, 
  RotateCcw, 
  Layers, 
  ArrowUpDown,
  FilterX,
  X
} from 'lucide-react';

export default function CreatorsPage() {
  const [filters, setFilters] = useState<CreatorFilterParams>({
    search: '',
    ai_tools: [],
    skills: [],
    industries: [],
    aspect_ratio: 'all',
    budget_max: undefined,
    availability: 'all',
    verified_only: false,
    sortBy: 'relevance',
  });

  const [creators, setCreators] = useState<CreatorWithFullData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isAIBriefOpen, setIsAIBriefOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<CreatorWithFullData | null>(null);

  // Comparison State
  const [selectedForCompare, setSelectedForCompare] = useState<CreatorWithFullData[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Fetch creators whenever filters change
  useEffect(() => {
    setIsLoading(true);
    MarketplaceService.getCreators(filters).then((data) => {
      startTransition(() => {
        setCreators(data);
        setIsLoading(false);
      });
    });
  }, [filters]);

  const handleToggleCompare = (creator: CreatorWithFullData) => {
    const exists = selectedForCompare.some((c) => c.id === creator.id);
    if (exists) {
      setSelectedForCompare(selectedForCompare.filter((c) => c.id !== creator.id));
    } else {
      if (selectedForCompare.length >= 3) {
        alert('You can compare a maximum of 3 creators at once.');
        return;
      }
      setSelectedForCompare([...selectedForCompare, creator]);
    }
  };

  const handleRemoveCompare = (id: string) => {
    setSelectedForCompare(selectedForCompare.filter((c) => c.id !== id));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      ai_tools: [],
      skills: [],
      industries: [],
      aspect_ratio: 'all',
      budget_max: undefined,
      availability: 'all',
      verified_only: false,
      sortBy: 'relevance',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f]">
      <Navbar onOpenAIBrief={() => setIsAIBriefOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/70 border border-violet-700/50 text-violet-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Verified Creator Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Discover Generative AI Creators
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Filter by proprietary ComfyUI nodes, fine-tuned LoRAs, diffusion models, rate cards, and commercial buyout terms.
            </p>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort by:
            </span>
            <select
              value={filters.sortBy || 'relevance'}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white focus:outline-none focus:border-violet-500 cursor-pointer"
            >
              <option value="relevance" className="bg-[#111420]">Relevance & Match</option>
              <option value="rating" className="bg-[#111420]">Highest Rating</option>
              <option value="budget_asc" className="bg-[#111420]">Budget: Low to High</option>
              <option value="budget_desc" className="bg-[#111420]">Budget: High to Low</option>
              <option value="newest" className="bg-[#111420]">Newest Profiles</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Left: Filter Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 p-5 rounded-2xl bg-[#111420]/70 border border-white/10 h-fit sticky top-24">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              totalResults={creators.length}
            />
          </aside>

          {/* Right: Creator Grid */}
          <section className="lg:col-span-8 xl:col-span-9 space-y-6">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>
                Showing <strong className="text-white">{creators.length}</strong> matching AI creator(s)
              </span>

              {/* Compare quick button if creators selected */}
              {selectedForCompare.length > 0 && (
                <button
                  onClick={() => setIsCompareOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md animate-pulse"
                >
                  <Layers className="w-3.5 h-3.5" />
                  Compare Selected ({selectedForCompare.length})
                </button>
              )}
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-96 rounded-2xl bg-white/5 border border-white/5 animate-pulse" />
                ))}
              </div>
            ) : creators.length > 0 ? (
              /* Creator Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creators.map((creator) => (
                  <CreatorCard
                    key={creator.id}
                    creator={creator}
                    isSelectedForCompare={selectedForCompare.some((c) => c.id === creator.id)}
                    onSelectForCompare={handleToggleCompare}
                    onOpenProject={(proj) => {
                      setSelectedProject(proj);
                      setSelectedCreator(creator);
                    }}
                  />
                ))}
              </div>
            ) : (
              /* Empty State with Helpful Suggestions */
              <div className="p-12 text-center rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto text-violet-400">
                  <FilterX className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">No AI creators match your filter combination</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Try broadening your budget threshold, unselecting specific tool combinations (e.g. ComfyUI + Kling), or clearing the keyword search.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset All Filters
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Floating Compare Tray (when 1+ creators selected) */}
        {selectedForCompare.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-5 py-3 rounded-2xl glass-dropdown border border-violet-500/50 shadow-2xl flex items-center gap-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-semibold text-white">
                {selectedForCompare.length} Creator{selectedForCompare.length > 1 ? 's' : ''} in Compare Tray
              </span>
            </div>

            <div className="flex items-center gap-2">
              {selectedForCompare.map((c) => (
                <div key={c.id} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/50 border border-white/10 text-[11px] text-zinc-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.avatar_url || ''} alt={c.display_name} className="w-4 h-4 rounded-full object-cover" />
                  <span>{c.display_name}</span>
                  <button onClick={() => handleRemoveCompare(c.id)} className="text-zinc-500 hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:opacity-95"
            >
              Compare Side-by-Side
            </button>
          </div>
        )}
      </main>

      <Footer />

      {/* AI Brief Modal */}
      <AIBriefModal
        isOpen={isAIBriefOpen}
        onClose={() => setIsAIBriefOpen(false)}
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

      {/* Creator Comparison Modal */}
      <CreatorComparisonModal
        creators={selectedForCompare}
        onClose={() => setIsCompareOpen(false)}
        onRemoveCreator={handleRemoveCompare}
      />
    </div>
  );
}
