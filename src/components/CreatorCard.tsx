'use client';

import React from 'react';
import Link from 'next/link';
import { CreatorWithFullData, PortfolioProject } from '@/types/marketplace';
import { VerificationBadge } from './VerificationBadge';
import { 
  Star, 
  MapPin, 
  Sparkles, 
  DollarSign, 
  Film, 
  CheckCircle2, 
  ExternalLink,
  Layers
} from 'lucide-react';

interface CreatorCardProps {
  creator: CreatorWithFullData;
  onSelectForCompare?: (creator: CreatorWithFullData) => void;
  isSelectedForCompare?: boolean;
  onOpenProject?: (project: PortfolioProject, creator: CreatorWithFullData) => void;
}

export function CreatorCard({
  creator,
  onSelectForCompare,
  isSelectedForCompare,
  onOpenProject,
}: CreatorCardProps) {
  const profile = creator.creator_profile;
  const verifiedClaim = (creator.verification_claims || []).find((v) => v.status === 'verified');
  const reviewClaim = (creator.verification_claims || []).find((v) => v.status === 'under_review');
  const submittedClaim = (creator.verification_claims || []).find((v) => v.status === 'submitted');
  const topProject = (creator.portfolio || [])[0];

  const primaryBadge = verifiedClaim || reviewClaim || submittedClaim;

  return (
    <div className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
      isSelectedForCompare 
        ? 'border-violet-500 bg-violet-950/20 shadow-lg shadow-violet-500/20' 
        : 'border-white/10 bg-[#111420]/85 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-950/30'
    }`}>
      {/* Top Banner / Media Preview */}
      <div className="relative w-full aspect-[16/10] bg-zinc-950 overflow-hidden">
        {topProject ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={topProject.thumbnail_url || topProject.media_url}
              alt={topProject.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111420] via-transparent to-black/40" />

            {/* Top Project Tag */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-zinc-200">
              <Film className="w-3 h-3 text-cyan-400" />
              <span>{topProject.category}</span>
              <span className="text-zinc-500 font-mono text-[10px]">{topProject.aspect_ratio}</span>
            </div>

            {/* Quick View Button */}
            {onOpenProject && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenProject(topProject, creator);
                }}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 rounded-md bg-violet-600/90 hover:bg-violet-600 text-white text-xs font-semibold flex items-center gap-1 shadow-lg"
              >
                <Layers className="w-3 h-3" />
                Workflow
              </button>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900/60 text-zinc-600 text-xs">
            No media showcase
          </div>
        )}

        {/* Creator Avatar Overlay */}
        <div className="absolute -bottom-6 left-5 flex items-end gap-3">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={creator.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={creator.display_name}
              className="w-14 h-14 rounded-xl object-cover border-2 border-[#111420] shadow-md ring-1 ring-white/20"
            />
            {profile?.availability === 'available' && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#111420]" title="Available for projects" />
            )}
          </div>
        </div>

        {/* Compare Checkbox in Top Right Corner */}
        {onSelectForCompare && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectForCompare(creator);
            }}
            className={`absolute bottom-2 right-3 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
              isSelectedForCompare
                ? 'bg-violet-600 text-white font-semibold'
                : 'bg-black/70 hover:bg-black/90 text-zinc-300 border border-white/15'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isSelectedForCompare ? 'text-white' : 'text-zinc-500'}`} />
            {isSelectedForCompare ? 'Selected' : 'Compare'}
          </button>
        )}
      </div>

      {/* Body Content */}
      <div className="pt-8 px-5 pb-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Info: Name & Trust Signal */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div>
              <Link
                href={`/creators/${creator.id}`}
                className="font-bold text-base text-white group-hover:text-violet-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span>{creator.display_name}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
              </Link>
              <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                {creator.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    {creator.location}
                  </span>
                )}
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {profile?.rating || 4.9}
                </span>
                <span className="text-zinc-500 font-mono">({profile?.completed_projects || 0} jobs)</span>
              </div>
            </div>

            {/* Verification Badge */}
            <div>
              <VerificationBadge
                status={primaryBadge?.status || 'submitted'}
                label={primaryBadge?.badge_label}
                size="sm"
              />
            </div>
          </div>

          {/* Short Bio */}
          <p className="text-xs text-zinc-300 line-clamp-2 mt-2 leading-relaxed font-normal">
            {creator.bio || profile?.experience_summary}
          </p>

          {/* AI Tools & Models Badges */}
          <div className="mt-3.5">
            <div className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider mb-1.5">
              AI Stack & Tools
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(profile?.ai_tools || []).slice(0, 4).map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/5 border border-white/10 text-violet-300"
                >
                  {tool}
                </span>
              ))}
              {(profile?.ai_tools?.length || 0) > 4 && (
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-zinc-400">
                  +{(profile?.ai_tools?.length || 0) - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Specializations & Skills */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {(profile?.skills || []).slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/50"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Pricing & Action */}
        <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-zinc-500 block">Rate Card</span>
            <div className="text-xs font-semibold text-emerald-400">
              ${profile?.budget_min?.toLocaleString()} – ${profile?.budget_max?.toLocaleString()}
              <span className="text-[10px] text-zinc-400 font-normal ml-1">/ project</span>
            </div>
          </div>

          <Link
            href={`/creators/${creator.id}`}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-white/10 hover:bg-violet-600 border border-white/10 hover:border-violet-500 transition-all duration-200"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
