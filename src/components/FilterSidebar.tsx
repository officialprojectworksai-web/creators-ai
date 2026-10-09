'use client';

import React from 'react';
import { CreatorFilterParams } from '@/lib/data/marketplace-service';
import { 
  Search, 
  RotateCcw, 
  Filter, 
  Sparkles, 
  DollarSign, 
  ShieldCheck, 
  CheckSquare, 
  Square,
  SlidersHorizontal
} from 'lucide-react';

interface FilterSidebarProps {
  filters: CreatorFilterParams;
  onFilterChange: (newFilters: CreatorFilterParams) => void;
  totalResults: number;
}

const AI_TOOLS_LIST = [
  'Runway Gen-3',
  'Midjourney v6.1',
  'Flux.1',
  'ComfyUI',
  'Kling AI',
  'ElevenLabs',
  'Topaz Video AI',
  'Luma Dream Machine',
  'Magnific AI'
];

const SKILLS_LIST = [
  'AI Video Generation',
  'Prompt Engineering',
  'ComfyUI Pipelines',
  'Custom LoRA Training',
  'Voice Synthesis',
  'Cinematic Trailers',
  'VFX Composition',
  'UGC Performance Ads'
];

const INDUSTRIES_LIST = [
  'Fashion & Luxury',
  'Tech & SaaS',
  'Automotive',
  'Food & Beverage',
  'Gaming',
  'Apparel & Streetwear'
];

const ASPECT_RATIOS = [
  { value: 'all', label: 'All Formats' },
  { value: '9:16', label: '9:16 Vertical (Reels / Shorts)' },
  { value: '16:9', label: '16:9 Landscape (Cinema / OTT)' },
  { value: '1:1', label: '1:1 Square (Social Feed)' }
];

export function FilterSidebar({ filters, onFilterChange, totalResults }: FilterSidebarProps) {
  const activeFiltersCount = 
    (filters.search ? 1 : 0) +
    (filters.ai_tools?.length || 0) +
    (filters.skills?.length || 0) +
    (filters.industries?.length || 0) +
    (filters.aspect_ratio && filters.aspect_ratio !== 'all' ? 1 : 0) +
    (filters.budget_max ? 1 : 0) +
    (filters.verified_only ? 1 : 0);

  const handleToolToggle = (tool: string) => {
    const current = filters.ai_tools || [];
    const exists = current.includes(tool);
    const updated = exists ? current.filter((t) => t !== tool) : [...current, tool];
    onFilterChange({ ...filters, ai_tools: updated });
  };

  const handleSkillToggle = (skill: string) => {
    const current = filters.skills || [];
    const exists = current.includes(skill);
    const updated = exists ? current.filter((s) => s !== skill) : [...current, skill];
    onFilterChange({ ...filters, skills: updated });
  };

  const handleIndustryToggle = (industry: string) => {
    const current = filters.industries || [];
    const exists = current.includes(industry);
    const updated = exists ? current.filter((i) => i !== industry) : [...current, industry];
    onFilterChange({ ...filters, industries: updated });
  };

  const resetAllFilters = () => {
    onFilterChange({
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
    <div className="w-full space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          type="text"
          value={filters.search || ''}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          placeholder="Search by creator name, prompt, tool, or industry..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
        />
        {filters.search && (
          <button
            onClick={() => onFilterChange({ ...filters, search: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Header with Active Count & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-violet-400" />
          <span className="font-semibold text-sm text-white">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-600 text-white">
              {activeFiltersCount}
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={resetAllFilters}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-violet-300 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset all
          </button>
        )}
      </div>

      {/* Verified Only Toggle */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/30 to-cyan-950/20 border border-emerald-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <div>
            <div className="text-xs font-semibold text-emerald-300">Verified Evidence Only</div>
            <div className="text-[10px] text-zinc-400">Audited ComfyUI / API proofs</div>
          </div>
        </div>
        <input
          type="checkbox"
          checked={filters.verified_only || false}
          onChange={(e) => onFilterChange({ ...filters, verified_only: e.target.checked })}
          className="w-4 h-4 rounded border-zinc-700 text-emerald-500 focus:ring-emerald-400 bg-zinc-900 cursor-pointer"
        />
      </div>

      {/* AI Tool Stack Filter */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2.5">
          AI Tools & Models
        </label>
        <div className="flex flex-wrap gap-1.5">
          {AI_TOOLS_LIST.map((tool) => {
            const isSelected = (filters.ai_tools || []).includes(tool);
            return (
              <button
                key={tool}
                onClick={() => handleToolToggle(tool)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-violet-600 text-white border border-violet-400 shadow-sm shadow-violet-600/30'
                    : 'bg-white/5 text-zinc-400 border border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                {tool}
              </button>
            );
          })}
        </div>
      </div>

      {/* Specialized Skills */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2.5">
          Core AI Skills
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SKILLS_LIST.map((skill) => {
            const isSelected = (filters.skills || []).includes(skill);
            return (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-cyan-600 text-white border border-cyan-400 shadow-sm shadow-cyan-600/30'
                    : 'bg-white/5 text-zinc-400 border border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      {/* Aspect Ratio & Format Filter */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2.5">
          Deliverable Format & Ratio
        </label>
        <div className="space-y-1">
          {ASPECT_RATIOS.map((ratio) => {
            const isSelected = (filters.aspect_ratio || 'all') === ratio.value;
            return (
              <button
                key={ratio.value}
                onClick={() => onFilterChange({ ...filters, aspect_ratio: ratio.value })}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-white/10 text-white font-medium border border-white/15'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                <span>{ratio.label}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Industry */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2.5">
          Industry Track Record
        </label>
        <div className="space-y-1">
          {INDUSTRIES_LIST.map((industry) => {
            const isSelected = (filters.industries || []).includes(industry);
            return (
              <button
                key={industry}
                onClick={() => handleIndustryToggle(industry)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-violet-950/40 text-violet-300 font-medium border border-violet-500/30'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                <span>{industry}</span>
                {isSelected ? (
                  <CheckSquare className="w-3.5 h-3.5 text-violet-400" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-zinc-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Maximum Project Budget Slider */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Budget Cap (USD)
          </label>
          <span className="text-xs font-mono font-semibold text-emerald-400">
            {filters.budget_max ? `< $${filters.budget_max.toLocaleString()}` : 'Any Budget'}
          </span>
        </div>
        <input
          type="range"
          min={1000}
          max={10000}
          step={500}
          value={filters.budget_max || 10000}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            onFilterChange({ ...filters, budget_max: val === 10000 ? undefined : val });
          }}
          className="w-full accent-violet-500 bg-zinc-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
          <span>$1,000</span>
          <span>$5,000</span>
          <span>$10,000+</span>
        </div>
      </div>
    </div>
  );
}
