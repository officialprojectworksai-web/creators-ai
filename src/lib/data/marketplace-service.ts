import { 
  CreatorWithFullData, 
  Campaign, 
  CreatorMatch, 
  VerificationClaim, 
  PortfolioProject,
  UserRole 
} from '@/types/marketplace';
import { INITIAL_CREATORS } from './mock-creators';
import { INITIAL_CAMPAIGNS } from './mock-campaigns';
import { generateAllMatches } from '../matching-engine';

// In-memory runtime cache for fallback/hybrid operations
let creatorsCache: CreatorWithFullData[] = [...INITIAL_CREATORS];
let campaignsCache: Campaign[] = [...INITIAL_CAMPAIGNS];

export interface CreatorFilterParams {
  search?: string;
  skills?: string[];
  ai_tools?: string[];
  ai_models?: string[];
  industries?: string[];
  content_types?: string[];
  platforms?: string[];
  supported_formats?: string[];
  aspect_ratio?: string;
  budget_max?: number;
  availability?: string;
  commercial_use?: string;
  verified_only?: boolean;
  sortBy?: 'relevance' | 'budget_asc' | 'budget_desc' | 'rating' | 'newest';
}

export const MarketplaceService = {
  // 1. CREATORS
  async getCreators(filters: CreatorFilterParams = {}): Promise<CreatorWithFullData[]> {
    let result = [...creatorsCache];

    // Search text across name, bio, skills, tools, models, industry, and portfolio
    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter((creator) => {
        const nameMatch = creator.display_name.toLowerCase().includes(q);
        const bioMatch = (creator.bio || '').toLowerCase().includes(q);
        const skillMatch = (creator.creator_profile?.skills || []).some((s) => s.toLowerCase().includes(q));
        const toolMatch = (creator.creator_profile?.ai_tools || []).some((t) => t.toLowerCase().includes(q));
        const modelMatch = (creator.creator_profile?.ai_models || []).some((m) => m.toLowerCase().includes(q));
        const industryMatch = (creator.creator_profile?.industries || []).some((i) => i.toLowerCase().includes(q));
        const locationMatch = (creator.location || '').toLowerCase().includes(q);
        const portfolioMatch = (creator.portfolio || []).some((p) =>
          p.title.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)
        );
        return nameMatch || bioMatch || skillMatch || toolMatch || modelMatch || industryMatch || locationMatch || portfolioMatch;
      });
    }

    // AI Tools Filter
    if (filters.ai_tools && filters.ai_tools.length > 0) {
      result = result.filter((creator) =>
        filters.ai_tools!.some((tool) =>
          (creator.creator_profile?.ai_tools || []).map((t) => t.toLowerCase()).includes(tool.toLowerCase())
        )
      );
    }

    // AI Models Filter
    if (filters.ai_models && filters.ai_models.length > 0) {
      result = result.filter((creator) =>
        filters.ai_models!.some((model) =>
          (creator.creator_profile?.ai_models || []).map((m) => m.toLowerCase()).includes(model.toLowerCase())
        )
      );
    }

    // Skills Filter
    if (filters.skills && filters.skills.length > 0) {
      result = result.filter((creator) =>
        filters.skills!.some((skill) =>
          (creator.creator_profile?.skills || []).map((s) => s.toLowerCase()).includes(skill.toLowerCase())
        )
      );
    }

    // Industry Filter
    if (filters.industries && filters.industries.length > 0) {
      result = result.filter((creator) =>
        filters.industries!.some((ind) =>
          (creator.creator_profile?.industries || []).map((i) => i.toLowerCase()).includes(ind.toLowerCase())
        )
      );
    }

    // Platform Filter
    if (filters.platforms && filters.platforms.length > 0) {
      result = result.filter((creator) =>
        filters.platforms!.some((plat) =>
          (creator.creator_profile?.preferred_platforms || []).map((p) => p.toLowerCase()).includes(plat.toLowerCase())
        )
      );
    }

    // Format / Aspect Ratio Filter
    if (filters.aspect_ratio && filters.aspect_ratio !== 'all') {
      result = result.filter((creator) =>
        (creator.creator_profile?.supported_formats || []).some((f) =>
          f.toLowerCase().includes(filters.aspect_ratio!.toLowerCase())
        ) ||
        (creator.portfolio || []).some((p) => p.aspect_ratio === filters.aspect_ratio)
      );
    }

    // Budget Max Filter
    if (filters.budget_max && filters.budget_max > 0) {
      result = result.filter((creator) => (creator.creator_profile?.budget_min || 0) <= filters.budget_max!);
    }

    // Availability Filter
    if (filters.availability && filters.availability !== 'all') {
      result = result.filter((creator) => creator.creator_profile?.availability === filters.availability);
    }

    // Verified only filter
    if (filters.verified_only) {
      result = result.filter((creator) =>
        (creator.verification_claims || []).some((v) => v.status === 'verified')
      );
    }

    // Sorting
    if (filters.sortBy === 'budget_asc') {
      result.sort((a, b) => (a.creator_profile?.budget_min || 0) - (b.creator_profile?.budget_min || 0));
    } else if (filters.sortBy === 'budget_desc') {
      result.sort((a, b) => (b.creator_profile?.budget_max || 0) - (a.creator_profile?.budget_max || 0));
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => (b.creator_profile?.rating || 0) - (a.creator_profile?.rating || 0));
    } else if (filters.sortBy === 'newest') {
      result.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
    }

    return result;
  },

  async getCreatorById(id: string): Promise<CreatorWithFullData | null> {
    const found = creatorsCache.find((c) => c.id === id);
    return found || null;
  },

  async updateCreatorProfile(userId: string, data: Partial<CreatorWithFullData>): Promise<CreatorWithFullData | null> {
    const index = creatorsCache.findIndex((c) => c.id === userId);
    if (index === -1) return null;

    creatorsCache[index] = {
      ...creatorsCache[index],
      ...data,
      creator_profile: {
        ...creatorsCache[index].creator_profile,
        ...(data.creator_profile || {}),
      },
      updated_at: new Date().toISOString(),
    };
    return creatorsCache[index];
  },

  // 2. PORTFOLIO
  async addPortfolioProject(creatorId: string, project: Omit<PortfolioProject, 'id' | 'created_at' | 'updated_at'>): Promise<PortfolioProject> {
    const newProject: PortfolioProject = {
      ...project,
      id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      creator_id: creatorId,
      views_count: 0,
      likes_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const creator = creatorsCache.find((c) => c.id === creatorId);
    if (creator) {
      creator.portfolio = [newProject, ...(creator.portfolio || [])];
    }
    return newProject;
  },

  async deletePortfolioProject(creatorId: string, projectId: string): Promise<boolean> {
    const creator = creatorsCache.find((c) => c.id === creatorId);
    if (!creator) return false;
    creator.portfolio = (creator.portfolio || []).filter((p) => p.id !== projectId);
    return true;
  },

  // 3. CAMPAIGNS
  async getCampaigns(): Promise<Campaign[]> {
    return [...campaignsCache];
  },

  async getCampaignById(id: string): Promise<Campaign | null> {
    return campaignsCache.find((c) => c.id === id) || null;
  },

  async createCampaign(campaignData: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>): Promise<Campaign> {
    const newCampaign: Campaign = {
      ...campaignData,
      id: `camp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    campaignsCache = [newCampaign, ...campaignsCache];
    return newCampaign;
  },

  // 4. MATCHING
  async getMatchesForCampaign(campaignId: string): Promise<CreatorMatch[]> {
    const campaign = await this.getCampaignById(campaignId);
    if (!campaign) return [];
    const allCreators = await this.getCreators();
    return generateAllMatches(campaign, allCreators);
  },

  // 5. VERIFICATION CLAIMS & ADMIN
  async getVerificationClaims(): Promise<VerificationClaim[]> {
    const allClaims: VerificationClaim[] = [];
    creatorsCache.forEach((creator) => {
      (creator.verification_claims || []).forEach((claim) => {
        allClaims.push({
          ...claim,
          creator: {
            id: creator.id,
            display_name: creator.display_name,
            avatar_url: creator.avatar_url,
            bio: creator.bio,
            role: creator.role,
            languages: creator.languages,
            experience_years: creator.experience_years,
          },
        });
      });
    });
    return allClaims;
  },

  async createVerificationClaim(
    creatorId: string, 
    claim: Omit<VerificationClaim, 'id' | 'created_at' | 'updated_at'>
  ): Promise<VerificationClaim> {
    const newClaim: VerificationClaim = {
      ...claim,
      id: `claim-${Date.now()}`,
      creator_id: creatorId,
      status: 'submitted',
      badge_label: 'Evidence Submitted',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const creator = creatorsCache.find((c) => c.id === creatorId);
    if (creator) {
      creator.verification_claims = [newClaim, ...(creator.verification_claims || [])];
    }
    return newClaim;
  },

  async updateVerificationClaimStatus(
    claimId: string, 
    status: 'verified' | 'rejected' | 'under_review',
    reviewNotes: string,
    reviewerId: string
  ): Promise<VerificationClaim | null> {
    for (const creator of creatorsCache) {
      const claim = (creator.verification_claims || []).find((c) => c.id === claimId);
      if (claim) {
        claim.status = status;
        claim.review_notes = reviewNotes;
        claim.reviewer_id = reviewerId;
        claim.reviewed_at = new Date().toISOString();
        claim.badge_label = status === 'verified' ? 'Verified by Admin' : status === 'rejected' ? 'Rejected' : 'Under Review';
        return claim;
      }
    }
    return null;
  }
};
