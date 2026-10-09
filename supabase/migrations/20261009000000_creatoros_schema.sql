-- ==============================================================================
-- CreatorOS AI Database Schema Migration
-- HacXLerate 2026 Challenge #2: AI Content Creator Marketplace
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Core identity, linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    role TEXT NOT NULL CHECK (role IN ('creator', 'brand', 'agency', 'admin')),
    location TEXT,
    languages TEXT[] DEFAULT '{}',
    experience_years INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. CREATOR_PROFILES TABLE (Deep AI skills, specialized toolsets, commercial terms)
CREATE TABLE IF NOT EXISTS public.creator_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    skills TEXT[] DEFAULT '{}' NOT NULL,
    specializations TEXT[] DEFAULT '{}' NOT NULL,
    industries TEXT[] DEFAULT '{}' NOT NULL,
    ai_tools TEXT[] DEFAULT '{}' NOT NULL,
    ai_models TEXT[] DEFAULT '{}' NOT NULL,
    content_types TEXT[] DEFAULT '{}' NOT NULL,
    preferred_platforms TEXT[] DEFAULT '{}' NOT NULL,
    supported_formats TEXT[] DEFAULT '{}' NOT NULL,
    budget_min NUMERIC DEFAULT 500 NOT NULL,
    budget_max NUMERIC DEFAULT 5000 NOT NULL,
    currency TEXT DEFAULT 'USD' NOT NULL,
    availability TEXT DEFAULT 'available' CHECK (availability IN ('available', 'limited', 'busy', 'unavailable')) NOT NULL,
    commercial_use_preferences TEXT DEFAULT 'Full Buyout & Commercial Rights Included' NOT NULL,
    workflow_description TEXT,
    experience_summary TEXT,
    rating NUMERIC DEFAULT 4.9 NOT NULL,
    completed_projects INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. PORTFOLIO_PROJECTS TABLE (AI production assets with workflow documentation)
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    media_type TEXT NOT NULL CHECK (media_type IN ('video', 'image', 'carousel', 'interactive')),
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category TEXT NOT NULL,
    industry TEXT NOT NULL,
    tools_used TEXT[] DEFAULT '{}' NOT NULL,
    models_used TEXT[] DEFAULT '{}' NOT NULL,
    skills_used TEXT[] DEFAULT '{}' NOT NULL,
    workflow_steps JSONB DEFAULT '[]'::jsonb NOT NULL,
    aspect_ratio TEXT DEFAULT '9:16' NOT NULL,
    duration_seconds INT DEFAULT 0 NOT NULL,
    platform TEXT DEFAULT 'Instagram Reels' NOT NULL,
    commercial_use_status TEXT DEFAULT 'Verified Commercial Ready' NOT NULL,
    license_information TEXT DEFAULT 'Standard Commercial License - Full Transfer on Engagement' NOT NULL,
    evidence_links TEXT[] DEFAULT '{}' NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    featured BOOLEAN DEFAULT false NOT NULL,
    views_count INT DEFAULT 0 NOT NULL,
    likes_count INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. CAMPAIGNS TABLE (Brand / Agency briefs with commercial licensing requirements)
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    owner_role TEXT NOT NULL CHECK (owner_role IN ('brand', 'agency', 'admin')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    objective TEXT NOT NULL,
    industry TEXT NOT NULL,
    target_audience TEXT NOT NULL,
    content_types TEXT[] DEFAULT '{}' NOT NULL,
    visual_style TEXT NOT NULL,
    tone TEXT NOT NULL,
    platforms TEXT[] DEFAULT '{}' NOT NULL,
    aspect_ratios TEXT[] DEFAULT '{}' NOT NULL,
    resolution TEXT DEFAULT '1080p / 4K' NOT NULL,
    duration_seconds INT DEFAULT 30 NOT NULL,
    deliverable_quantity INT DEFAULT 1 NOT NULL,
    required_skills TEXT[] DEFAULT '{}' NOT NULL,
    required_tools TEXT[] DEFAULT '{}' NOT NULL,
    budget_min NUMERIC DEFAULT 1000 NOT NULL,
    budget_max NUMERIC DEFAULT 5000 NOT NULL,
    currency TEXT DEFAULT 'USD' NOT NULL,
    deadline TIMESTAMPTZ,
    commercial_usage_type TEXT DEFAULT 'Full Commercial Buyout (Paid Ads + Organic)' NOT NULL,
    usage_duration TEXT DEFAULT '12 Months' NOT NULL,
    territories TEXT DEFAULT 'Worldwide' NOT NULL,
    exclusivity TEXT DEFAULT 'Non-exclusive within industry for 30 days' NOT NULL,
    ownership_requirements TEXT DEFAULT 'Master asset source files + full derivative rights' NOT NULL,
    disclosure_requirements TEXT DEFAULT 'AI-Generated label per FTC / EU AI Act standards' NOT NULL,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'matching', 'in_progress', 'completed', 'archived')) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 5. CREATOR_MATCHES TABLE (Explainable AI matching scores & breakdowns)
CREATE TABLE IF NOT EXISTS public.creator_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    total_score NUMERIC NOT NULL CHECK (total_score >= 0 AND total_score <= 100),
    score_breakdown JSONB DEFAULT '{}'::jsonb NOT NULL,
    match_reasons TEXT[] DEFAULT '{}' NOT NULL,
    missing_requirements TEXT[] DEFAULT '{}' NOT NULL,
    compatibility_warnings TEXT[] DEFAULT '{}' NOT NULL,
    status TEXT DEFAULT 'suggested' CHECK (status IN ('suggested', 'shortlisted', 'contacted', 'declined', 'hired')) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(campaign_id, creator_id)
);

-- 6. VERIFICATION_CLAIMS TABLE (Evidence-backed trust signals)
CREATE TABLE IF NOT EXISTS public.verification_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    claim_type TEXT NOT NULL CHECK (claim_type IN ('tool_proficiency', 'workflow_authorship', 'portfolio_authenticity', 'commercial_license_compliance', 'client_reference')),
    claim_title TEXT NOT NULL,
    claim_description TEXT NOT NULL,
    evidence_url TEXT NOT NULL,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'verified', 'rejected', 'expired')) NOT NULL,
    reviewer_id UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    review_notes TEXT,
    badge_label TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 7. ENGAGEMENTS TABLE (Contracts and active campaigns between Brand & Creator)
CREATE TABLE IF NOT EXISTS public.engagements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    brand_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_production', 'review_pending', 'completed', 'cancelled')) NOT NULL,
    proposed_budget NUMERIC NOT NULL,
    agreed_deliverables TEXT NOT NULL,
    delivery_deadline TIMESTAMPTZ NOT NULL,
    terms_accepted BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 8. DELIVERABLES TABLE (Asset submissions and iteration reviews)
CREATE TABLE IF NOT EXISTS public.deliverables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    engagement_id UUID NOT NULL REFERENCES public.engagements(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    version_number INT DEFAULT 1 NOT NULL,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'changes_requested', 'approved')) NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==============================================================================
-- INDEXES FOR FAST DISCOVERY, FILTERING & MATCHING
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_creator_profiles_skills ON public.creator_profiles USING GIN (skills);
CREATE INDEX IF NOT EXISTS idx_creator_profiles_ai_tools ON public.creator_profiles USING GIN (ai_tools);
CREATE INDEX IF NOT EXISTS idx_creator_profiles_ai_models ON public.creator_profiles USING GIN (ai_models);
CREATE INDEX IF NOT EXISTS idx_creator_profiles_industries ON public.creator_profiles USING GIN (industries);
CREATE INDEX IF NOT EXISTS idx_creator_profiles_budget ON public.creator_profiles (budget_min, budget_max);
CREATE INDEX IF NOT EXISTS idx_portfolio_creator ON public.portfolio_projects (creator_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_tools ON public.portfolio_projects USING GIN (tools_used);
CREATE INDEX IF NOT EXISTS idx_portfolio_published ON public.portfolio_projects (is_published);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON public.campaigns (status);
CREATE INDEX IF NOT EXISTS idx_verification_creator ON public.verification_claims (creator_id, status);
CREATE INDEX IF NOT EXISTS idx_creator_matches_campaign ON public.creator_matches (campaign_id, total_score DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- CREATOR_PROFILES POLICIES
CREATE POLICY "Creator profiles viewable by everyone" ON public.creator_profiles
    FOR SELECT USING (true);

CREATE POLICY "Creators can insert own creator profile" ON public.creator_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Creators can update own creator profile" ON public.creator_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- PORTFOLIO_PROJECTS POLICIES
CREATE POLICY "Published portfolio projects viewable by everyone" ON public.portfolio_projects
    FOR SELECT USING (is_published = true OR auth.uid() = creator_id);

CREATE POLICY "Creators can insert own portfolio project" ON public.portfolio_projects
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update own portfolio project" ON public.portfolio_projects
    FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Creators can delete own portfolio project" ON public.portfolio_projects
    FOR DELETE USING (auth.uid() = creator_id);

-- CAMPAIGNS POLICIES
CREATE POLICY "Published campaigns viewable by everyone" ON public.campaigns
    FOR SELECT USING (status != 'draft' OR auth.uid() = owner_id);

CREATE POLICY "Brands/Agencies can insert campaigns" ON public.campaigns
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own campaigns" ON public.campaigns
    FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete own campaigns" ON public.campaigns
    FOR DELETE USING (auth.uid() = owner_id);

-- CREATOR_MATCHES POLICIES
CREATE POLICY "Matches viewable by campaign owner or matched creator" ON public.creator_matches
    FOR SELECT USING (
        auth.uid() = creator_id OR 
        EXISTS (SELECT 1 FROM public.campaigns WHERE campaigns.id = creator_matches.campaign_id AND campaigns.owner_id = auth.uid())
    );

CREATE POLICY "Campaign owners can manage matches" ON public.creator_matches
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.campaigns WHERE campaigns.id = creator_matches.campaign_id AND campaigns.owner_id = auth.uid())
    );

-- VERIFICATION_CLAIMS POLICIES
CREATE POLICY "Verification claims viewable by everyone" ON public.verification_claims
    FOR SELECT USING (true);

CREATE POLICY "Creators can insert own verification claims" ON public.verification_claims
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update own non-verified claims" ON public.verification_claims
    FOR UPDATE USING (auth.uid() = creator_id AND status != 'verified');

CREATE POLICY "Admin reviewers can update verification claims" ON public.verification_claims
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
    );

-- ENGAGEMENTS POLICIES
CREATE POLICY "Engagements viewable by brand or creator" ON public.engagements
    FOR SELECT USING (auth.uid() = brand_id OR auth.uid() = creator_id);

CREATE POLICY "Brands can insert engagements" ON public.engagements
    FOR INSERT WITH CHECK (auth.uid() = brand_id);

CREATE POLICY "Participants can update engagements" ON public.engagements
    FOR UPDATE USING (auth.uid() = brand_id OR auth.uid() = creator_id);

-- DELIVERABLES POLICIES
CREATE POLICY "Deliverables viewable by engagement participants" ON public.deliverables
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.engagements WHERE engagements.id = deliverables.engagement_id AND (engagements.brand_id = auth.uid() OR engagements.creator_id = auth.uid()))
    );

CREATE POLICY "Creators can insert deliverables" ON public.deliverables
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.engagements WHERE engagements.id = deliverables.engagement_id AND engagements.creator_id = auth.uid())
    );

CREATE POLICY "Participants can update deliverables" ON public.deliverables
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.engagements WHERE engagements.id = deliverables.engagement_id AND (engagements.brand_id = auth.uid() OR engagements.creator_id = auth.uid()))
    );

-- ==============================================================================
-- TRIGGER FOR AUTOMATIC PROFILE CREATION ON USER SIGNUP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, avatar_url, role, bio)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'),
        COALESCE(NEW.raw_user_meta_data->>'role', 'creator'),
        COALESCE(NEW.raw_user_meta_data->>'bio', 'AI Creative Director & Multimodal Producer')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
