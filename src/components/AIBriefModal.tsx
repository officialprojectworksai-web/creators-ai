'use client';

import React, { useState } from 'react';
import { AIBriefOutput } from '@/lib/ai/brief-generator';
import { MarketplaceService } from '@/lib/data/marketplace-service';
import { useAuth } from '@/context/auth-context';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  X, 
  Loader2, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight,
  Sliders,
  DollarSign,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface AIBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBriefSaved?: (briefId: string) => void;
}

const EXAMPLE_PROMPTS = [
  {
    title: 'Diwali Cyberpunk Streetwear (Hackathon Sample)',
    prompt: 'We are launching a premium streetwear brand for young people. We need five cinematic AI-generated Instagram Reels for Diwali, with a futuristic Indian aesthetic and a budget of ₹20,000.',
    brand: 'Lumina Haute Wear'
  },
  {
    title: 'SaaS 3D Cloud GPU Explainer Series',
    prompt: 'Need 3 high-impact 16:9 cinematic teasers showcasing our distributed GPU inference cloud. Must show futuristic server monoliths and neural conduits with a budget of $5,000.',
    brand: 'Synapse Cloud'
  },
  {
    title: 'Energy Drink UGC TikTok Hook Sprint',
    prompt: 'Need 8 high-converting 9:16 viral TikTok & Meta video ads featuring realistic AI athlete avatars crushing superhuman challenges with a budget of $2,500.',
    brand: 'Kinetics Quantum'
  }
];

export function AIBriefModal({ isOpen, onClose, onBriefSaved }: AIBriefModalProps) {
  const { user } = useAuth();
  const [rawPrompt, setRawPrompt] = useState('');
  const [brandName, setBrandName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState<AIBriefOutput | null>(null);
  const [activeTab, setActiveTab] = useState<'prompt' | 'review'>('prompt');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (promptToUse?: string, brandToUse?: string) => {
    const p = promptToUse || rawPrompt;
    const b = brandToUse || brandName;
    if (!p.trim() || p.trim().length < 10) {
      setErrorMsg('Please enter a descriptive prompt with at least 10 characters.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/ai/generate-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          raw_prompt: p,
          preferred_brand_name: b || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Generation failed');
      }

      setGeneratedBrief(json.data);
      setActiveTab('review');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred while generating the brief.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBrief = async () => {
    if (!generatedBrief) return;
    setIsSaving(true);

    try {
      const savedCampaign = await MarketplaceService.createCampaign({
        owner_id: user?.id || '00000000-0000-0000-0000-000000000011',
        owner_role: user?.role === 'agency' ? 'agency' : 'brand',
        title: generatedBrief.title,
        description: generatedBrief.objective + '\n\nCreative Direction: ' + generatedBrief.creative_direction,
        objective: generatedBrief.objective,
        industry: generatedBrief.industry,
        target_audience: generatedBrief.target_audience,
        content_types: generatedBrief.content_types,
        visual_style: generatedBrief.visual_style,
        tone: generatedBrief.tone,
        platforms: generatedBrief.platforms,
        aspect_ratios: generatedBrief.aspect_ratios,
        resolution: generatedBrief.resolution,
        duration_seconds: generatedBrief.duration_seconds,
        deliverable_quantity: generatedBrief.deliverable_quantity,
        required_skills: generatedBrief.required_skills,
        required_tools: generatedBrief.required_tools,
        budget_min: generatedBrief.budget_min,
        budget_max: generatedBrief.budget_max,
        currency: generatedBrief.currency,
        commercial_usage_type: generatedBrief.commercial_usage_type,
        usage_duration: generatedBrief.usage_duration,
        territories: generatedBrief.territories,
        exclusivity: generatedBrief.exclusivity,
        ownership_requirements: generatedBrief.ownership_requirements,
        disclosure_requirements: generatedBrief.disclosure_requirements,
        status: 'published',
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#06b6d4', '#10b981', '#ffffff']
        });
      } catch (e) {}

      if (onBriefSaved) {
        onBriefSaved(savedCampaign.id);
      }
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save campaign');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl glass-dropdown border border-white/15 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#0e111d]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                AI-Assisted Campaign Brief Builder
                {generatedBrief && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800">
                    {generatedBrief.generation_mode === 'llm' ? 'Live LLM Engine' : 'Structured AI Engine'}
                  </span>
                )}
              </h3>
              <p className="text-xs text-zinc-400">
                Transform natural-language ideas into structured, enforceable commercial briefs.
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

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-black/30 px-6">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'prompt'
                ? 'border-violet-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            1. Prompt Input
          </button>
          <button
            onClick={() => generatedBrief && setActiveTab('review')}
            disabled={!generatedBrief}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'review'
                ? 'border-violet-500 text-white'
                : 'border-transparent text-zinc-500 disabled:opacity-40'
            }`}
          >
            2. Structured Review & Edit
            {generatedBrief && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {activeTab === 'prompt' ? (
            <div className="space-y-4">
              {/* Preset Prompts */}
              <div>
                <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Try Quick Example Prompts:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {EXAMPLE_PROMPTS.map((ex, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setRawPrompt(ex.prompt);
                        setBrandName(ex.brand);
                        handleGenerate(ex.prompt, ex.brand);
                      }}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-950/20 text-left transition-all group"
                    >
                      <div className="text-xs font-semibold text-violet-300 group-hover:text-violet-200 mb-1">
                        {ex.title}
                      </div>
                      <div className="text-[11px] text-zinc-400 line-clamp-2 leading-tight">
                        {ex.prompt}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Natural language input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-zinc-200">
                  Campaign Description & Creative Vision:
                </label>
                <textarea
                  rows={4}
                  value={rawPrompt}
                  onChange={(e) => setRawPrompt(e.target.value)}
                  placeholder="e.g. We are launching a premium streetwear brand for young people. We need five cinematic AI-generated Instagram Reels for Diwali, with a futuristic Indian aesthetic and a budget of ₹20,000."
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1.5">
                    Brand / Agency Name (Optional):
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Lumina Haute Wear"
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => handleGenerate()}
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing Brief & Extracting Specs...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Structured Brief
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // REVIEW TAB
            generatedBrief && (
              <div className="space-y-5 text-xs text-zinc-300">
                {/* Editable Title */}
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Campaign Title
                  </label>
                  <input
                    type="text"
                    value={generatedBrief.title}
                    onChange={(e) => setGeneratedBrief({ ...generatedBrief, title: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-sm font-bold text-white focus:border-violet-500 focus:outline-none"
                  />
                </div>

                {/* Objective & Audience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Campaign Objective
                    </label>
                    <textarea
                      rows={3}
                      value={generatedBrief.objective}
                      onChange={(e) => setGeneratedBrief({ ...generatedBrief, objective: e.target.value })}
                      className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-200 focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Target Audience
                    </label>
                    <textarea
                      rows={3}
                      value={generatedBrief.target_audience}
                      onChange={(e) => setGeneratedBrief({ ...generatedBrief, target_audience: e.target.value })}
                      className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-200 focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Visual Style & Tone */}
                <div className="p-3.5 rounded-xl bg-violet-950/20 border border-violet-500/20 space-y-2">
                  <div className="font-semibold text-violet-300 text-xs">Creative Direction & Visual Style</div>
                  <input
                    type="text"
                    value={generatedBrief.visual_style}
                    onChange={(e) => setGeneratedBrief({ ...generatedBrief, visual_style: e.target.value })}
                    className="w-full p-2 rounded-lg bg-black/40 border border-violet-500/30 text-xs text-violet-200 focus:outline-none"
                  />
                  <div className="text-[11px] text-zinc-400">
                    <span className="font-semibold text-zinc-300">Tone: </span>
                    {generatedBrief.tone}
                  </div>
                </div>

                {/* Deliverables & Technical Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-[10px] text-zinc-400 uppercase">Quantity</div>
                    <div className="text-sm font-bold text-white">{generatedBrief.deliverable_quantity} Assets</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-[10px] text-zinc-400 uppercase">Aspect Ratio</div>
                    <div className="text-sm font-bold text-cyan-400">{generatedBrief.aspect_ratios.join(', ')}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-[10px] text-zinc-400 uppercase">Duration</div>
                    <div className="text-sm font-bold text-white">{generatedBrief.duration_seconds}s each</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-[10px] text-zinc-400 uppercase">Budget</div>
                    <div className="text-sm font-bold text-emerald-400">
                      {generatedBrief.currency} {generatedBrief.budget_min.toLocaleString()} – {generatedBrief.budget_max.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Commercial Use & Licensing Guardrails */}
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-emerald-300 text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Commercial Licensing & Compliance Terms
                  </div>
                  <div className="text-xs text-zinc-300">
                    <strong>Usage Type:</strong> {generatedBrief.commercial_usage_type} ({generatedBrief.usage_duration})
                  </div>
                  <div className="text-xs text-zinc-400">
                    <strong>Territory:</strong> {generatedBrief.territories} • <strong>Exclusivity:</strong> {generatedBrief.exclusivity}
                  </div>
                </div>

                {/* Missing Info / Clarifications Box */}
                {generatedBrief.missing_information?.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-950/25 border border-amber-500/25 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                      Clarifications to confirm before booking:
                    </div>
                    <ul className="list-disc list-inside text-[11px] text-zinc-400 space-y-0.5">
                      {generatedBrief.missing_information.map((info, i) => (
                        <li key={i}>{info}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0e111d] flex items-center justify-between">
          {activeTab === 'review' ? (
            <button
              onClick={() => setActiveTab('prompt')}
              className="text-xs text-zinc-400 hover:text-white transition-colors"
            >
              ← Edit Prompt
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            {activeTab === 'review' && (
              <button
                onClick={handleSaveBrief}
                disabled={isSaving}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing Brief...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Approve & Publish Campaign Brief
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
