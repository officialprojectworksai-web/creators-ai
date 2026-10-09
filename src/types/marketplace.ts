export type UserRole = 'creator' | 'brand' | 'agency' | 'admin';

export type AvailabilityStatus = 'available' | 'limited' | 'busy' | 'unavailable';

export type MediaType = 'video' | 'image' | 'carousel' | 'interactive';

export type VerificationStatus = 'submitted' | 'under_review' | 'verified' | 'rejected' | 'expired';

export type VerificationClaimType = 
  | 'tool_proficiency' 
  | 'workflow_authorship' 
  | 'portfolio_authenticity' 
  | 'commercial_license_compliance' 
  | 'client_reference';

export type CampaignStatus = 'draft' | 'published' | 'matching' | 'in_progress' | 'completed' | 'archived';

export type MatchStatus = 'suggested' | 'shortlisted' | 'contacted' | 'declined' | 'hired';

export type EngagementStatus = 'pending' | 'accepted' | 'in_production' | 'review_pending' | 'completed' | 'cancelled';

export type DeliverableStatus = 'draft' | 'submitted' | 'changes_requested' | 'approved';

export interface Profile {
  id: string;
  display_name: string;
  avatar_url?: string | null;
  bio?: string | null;
  role: UserRole;
  location?: string | null;
  languages: string[];
  experience_years: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreatorProfile {
  user_id: string;
  skills: string[];
  specializations: string[];
  industries: string[];
  ai_tools: string[];
  ai_models: string[];
  content_types: string[];
  preferred_platforms: string[];
  supported_formats: string[];
  budget_min: number;
  budget_max: number;
  currency: string;
  availability: AvailabilityStatus;
  commercial_use_preferences: string;
  workflow_description?: string | null;
  experience_summary?: string | null;
  rating: number;
  completed_projects: number;
  created_at?: string;
  updated_at?: string;
  profile?: Profile;
}

export interface WorkflowStep {
  step: number;
  title: string;
  detail: string;
}

export interface PortfolioProject {
  id: string;
  creator_id: string;
  title: string;
  description?: string | null;
  media_type: MediaType;
  media_url: string;
  thumbnail_url?: string | null;
  category: string;
  industry: string;
  tools_used: string[];
  models_used: string[];
  skills_used: string[];
  workflow_steps: WorkflowStep[];
  aspect_ratio: string;
  duration_seconds: number;
  platform: string;
  commercial_use_status: string;
  license_information: string;
  evidence_links: string[];
  is_published: boolean;
  featured: boolean;
  views_count: number;
  likes_count: number;
  created_at?: string;
  updated_at?: string;
  creator?: Profile & { creator_profile?: CreatorProfile };
}

export interface Campaign {
  id: string;
  owner_id: string;
  owner_role: 'brand' | 'agency' | 'admin';
  title: string;
  description: string;
  objective: string;
  industry: string;
  target_audience: string;
  content_types: string[];
  visual_style: string;
  tone: string;
  platforms: string[];
  aspect_ratios: string[];
  resolution: string;
  duration_seconds: number;
  deliverable_quantity: number;
  required_skills: string[];
  required_tools: string[];
  budget_min: number;
  budget_max: number;
  currency: string;
  deadline?: string | null;
  commercial_usage_type: string;
  usage_duration: string;
  territories: string;
  exclusivity: string;
  ownership_requirements: string;
  disclosure_requirements: string;
  status: CampaignStatus;
  created_at?: string;
  updated_at?: string;
  owner?: Profile;
}

export interface ScoreBreakdown {
  skill_score: number;
  tool_score: number;
  budget_score: number;
  format_score: number;
  commercial_score: number;
}

export interface CreatorMatch {
  id: string;
  campaign_id: string;
  creator_id: string;
  total_score: number;
  score_breakdown: ScoreBreakdown;
  match_reasons: string[];
  missing_requirements: string[];
  compatibility_warnings: string[];
  status: MatchStatus;
  created_at?: string;
  creator?: Profile & { creator_profile?: CreatorProfile; portfolio?: PortfolioProject[]; verification_claims?: VerificationClaim[] };
  campaign?: Campaign;
}

export interface VerificationClaim {
  id: string;
  creator_id: string;
  claim_type: VerificationClaimType;
  claim_title: string;
  claim_description: string;
  evidence_url: string;
  status: VerificationStatus;
  reviewer_id?: string | null;
  reviewed_at?: string | null;
  review_notes?: string | null;
  badge_label?: string | null;
  created_at?: string;
  updated_at?: string;
  creator?: Profile;
}

export interface Engagement {
  id: string;
  campaign_id: string;
  creator_id: string;
  brand_id: string;
  status: EngagementStatus;
  proposed_budget: number;
  agreed_deliverables: string;
  delivery_deadline: string;
  terms_accepted: boolean;
  created_at?: string;
  updated_at?: string;
  campaign?: Campaign;
  creator?: Profile;
  brand?: Profile;
}

export interface Deliverable {
  id: string;
  engagement_id: string;
  title: string;
  description?: string | null;
  file_url: string;
  version_number: number;
  status: DeliverableStatus;
  submitted_at: string;
  feedback?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CreatorWithFullData extends Profile {
  creator_profile: CreatorProfile;
  portfolio: PortfolioProject[];
  verification_claims: VerificationClaim[];
}
