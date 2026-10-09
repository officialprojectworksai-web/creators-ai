import { Campaign, CreatorWithFullData, CreatorMatch, ScoreBreakdown } from '@/types/marketplace';

/**
 * CreatorOS Explainable Matching Engine
 * 
 * Computes deterministic, normalized 0–100 compatibility scores between a Brand Brief and a Creator Profile.
 * 
 * Weights:
 * - Skills Overlap: 30%
 * - Tools & Models: 25%
 * - Budget Alignment: 15%
 * - Deliverable Formats & Platforms: 15%
 * - Industry & Commercial Terms: 15%
 */
export function calculateMatchScore(
  campaign: Campaign,
  creator: CreatorWithFullData
): {
  total_score: number;
  score_breakdown: ScoreBreakdown;
  match_reasons: string[];
  missing_requirements: string[];
  compatibility_warnings: string[];
} {
  const profile = creator.creator_profile;
  const match_reasons: string[] = [];
  const missing_requirements: string[] = [];
  const compatibility_warnings: string[] = [];

  // 1. Skill Score (30%)
  let skill_score = 70; // Baseline
  if (campaign.required_skills && campaign.required_skills.length > 0) {
    const creatorSkillsLower = (profile?.skills || []).map((s) => s.toLowerCase());
    const matchedSkills = campaign.required_skills.filter((reqSkill) =>
      creatorSkillsLower.some((cSkill) => cSkill.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(cSkill))
    );
    const skillRatio = matchedSkills.length / campaign.required_skills.length;
    skill_score = Math.round(skillRatio * 100);

    if (matchedSkills.length > 0) {
      match_reasons.push(`Strong skill overlap: Verified proficiency in ${matchedSkills.slice(0, 3).join(', ')}.`);
    }

    const missingSkills = campaign.required_skills.filter((reqSkill) => !matchedSkills.includes(reqSkill));
    if (missingSkills.length > 0) {
      missing_requirements.push(`Missing explicit skill tag: ${missingSkills.join(', ')}.`);
    }
  }

  // 2. Tools & Models Score (25%)
  let tool_score = 75;
  if (campaign.required_tools && campaign.required_tools.length > 0) {
    const creatorToolsLower = [
      ...(profile?.ai_tools || []),
      ...(profile?.ai_models || [])
    ].map((t) => t.toLowerCase());

    const matchedTools = campaign.required_tools.filter((reqTool) =>
      creatorToolsLower.some((cTool) => cTool.includes(reqTool.toLowerCase()) || reqTool.toLowerCase().includes(cTool))
    );
    const toolRatio = matchedTools.length / campaign.required_tools.length;
    tool_score = Math.round(toolRatio * 100);

    if (matchedTools.length > 0) {
      match_reasons.push(`Direct AI tool mastery: Uses ${matchedTools.slice(0, 3).join(', ')}.`);
    }
    const missingTools = campaign.required_tools.filter((reqTool) => !matchedTools.includes(reqTool));
    if (missingTools.length > 0) {
      missing_requirements.push(`Unlisted tools: ${missingTools.join(', ')}.`);
    }
  }

  // 3. Budget Score (15%)
  let budget_score = 90;
  const cMin = profile?.budget_min || 0;
  const cMax = profile?.budget_max || 10000;
  const bMin = campaign.budget_min || 0;
  const bMax = campaign.budget_max || 10000;

  // Check overlap
  const hasOverlap = Math.max(cMin, bMin) <= Math.min(cMax, bMax);
  if (hasOverlap) {
    budget_score = 98;
    match_reasons.push(`Budget aligned: Creator rate range ($${cMin.toLocaleString()} - $${cMax.toLocaleString()}) fits within campaign budget ($${bMin.toLocaleString()} - $${bMax.toLocaleString()}).`);
  } else if (cMin > bMax) {
    budget_score = Math.max(20, Math.round(100 - ((cMin - bMax) / bMax) * 100));
    compatibility_warnings.push(`Rate mismatch: Creator minimum rate ($${cMin.toLocaleString()}) exceeds campaign budget cap ($${bMax.toLocaleString()}).`);
  } else {
    budget_score = 85;
    match_reasons.push(`Cost-effective: Creator pricing ($${cMin.toLocaleString()} - $${cMax.toLocaleString()}) is below campaign upper threshold.`);
  }

  // 4. Format & Platform Fit (15%)
  let format_score = 80;
  const creatorFormats = (profile?.supported_formats || []).map((f) => f.toLowerCase());
  const creatorPlatforms = (profile?.preferred_platforms || []).map((p) => p.toLowerCase());

  const matchedAspect = campaign.aspect_ratios.filter((ratio) =>
    creatorFormats.some((cf) => cf.includes(ratio.toLowerCase()))
  );
  const matchedPlatforms = campaign.platforms.filter((plat) =>
    creatorPlatforms.some((cp) => cp.includes(plat.toLowerCase()))
  );

  if (matchedAspect.length > 0 || matchedPlatforms.length > 0) {
    format_score = 95;
    match_reasons.push(`Format & channel ready: Supports ${campaign.aspect_ratios.join(', ')} deliverables across ${campaign.platforms.join(', ')}.`);
  } else {
    format_score = 65;
  }

  // 5. Commercial & Industry Compatibility (15%)
  let commercial_score = 85;
  const creatorIndustries = (profile?.industries || []).map((i) => i.toLowerCase());
  const isIndustryMatch = creatorIndustries.some((ci) =>
    ci.includes(campaign.industry.toLowerCase()) || campaign.industry.toLowerCase().includes(ci)
  );

  if (isIndustryMatch) {
    commercial_score = 98;
    match_reasons.push(`Industry track record: Experienced in ${campaign.industry}.`);
  }

  // Check verification bonus
  const verifiedClaimsCount = (creator.verification_claims || []).filter((v) => v.status === 'verified').length;
  if (verifiedClaimsCount > 0) {
    commercial_score = Math.min(100, commercial_score + 5);
    match_reasons.push(`Trust signal: ${verifiedClaimsCount} verified tool/workflow credentials on file.`);
  }

  // Calculate weighted total score
  const total_score = Number(
    (
      skill_score * 0.30 +
      tool_score * 0.25 +
      budget_score * 0.15 +
      format_score * 0.15 +
      commercial_score * 0.15
    ).toFixed(1)
  );

  return {
    total_score,
    score_breakdown: {
      skill_score,
      tool_score,
      budget_score,
      format_score,
      commercial_score,
    },
    match_reasons,
    missing_requirements,
    compatibility_warnings,
  };
}

export function generateAllMatches(campaign: Campaign, creators: CreatorWithFullData[]): CreatorMatch[] {
  return creators
    .map((creator) => {
      const matchResult = calculateMatchScore(campaign, creator);
      const match: CreatorMatch = {
        id: `match-${campaign.id}-${creator.id}`,
        campaign_id: campaign.id,
        creator_id: creator.id,
        total_score: matchResult.total_score,
        score_breakdown: matchResult.score_breakdown,
        match_reasons: matchResult.match_reasons,
        missing_requirements: matchResult.missing_requirements,
        compatibility_warnings: matchResult.compatibility_warnings,
        status: matchResult.total_score >= 90 ? 'shortlisted' : 'suggested',
        creator,
        campaign,
      };
      return match;
    })
    .sort((a, b) => b.total_score - a.total_score);
}
