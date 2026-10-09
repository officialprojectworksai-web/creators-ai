# CreatorOS AI — AI Content Creator Marketplace
> **From Brief → Best Creator → Campaign → Content.**  
> Built for **HacXLerate 2026 Challenge #2: AI Content Creator Marketplace**.

---

## 🌟 Executive Summary

**CreatorOS AI** is an AI-native marketplace platform engineered to bridge top brands and creative agencies with vetted generative AI creators. The platform enables discovery, evaluation, matching, and commercial engagement with creators who possess demonstrable production skills, audited ComfyUI/diffusion pipelines, transparent portfolios, and legally compliant commercial-use licensing.

---

## 🚀 Key Functional Modules (Rubric Mapping)

### 1. Creator Profiles & AI Portfolios (30% Rubric Weight)
- **Multimodal AI Stack Profiling**: Deep categorization across image generation (*Midjourney v6.1, Flux.1 Pro*), video generation (*Runway Gen-3, Kling AI, Luma Dream Machine*), LLMs (*Claude 3.7, GPT-4o*), voice cloning (*ElevenLabs*), and neural rendering (*ComfyUI, ControlNet, LivePortrait*).
- **Documented Workflow Pipelines**: Every portfolio asset includes phase-by-phase workflow breakdowns (e.g. Phase 1: Latent Seed Exploration → Phase 2: ComfyUI LoRA Node Assembly → Phase 3: 4K Spatial Upscaling).
- **Commercial Licensing Transparency**: Clear designations for commercial buyout rights, master asset source transfers (ProRes 4444, split audio stems, LoRA weights), and FTC/EU AI Act transparency tags.
- **Multiformat Previews**: Native support for 9:16 vertical video (Instagram Reels, TikTok UGC, YouTube Shorts), 16:9 cinematic landscape, 1:1 social square, and 4K Ultra HD.

### 2. Brand & Agency Briefs & AI Brief Builder (20% Rubric Weight)
- **AI-Assisted Brief Builder**: Server-side AI engine that converts rough natural language concepts into structured, enforceable commercial briefs with automatic parameter extraction:
  - Deliverable quantities, aspect ratios, durations, resolution
  - Visual tone, lighting cues, prompt guidelines
  - Required AI tools and model proficiencies
  - Budget ranges (USD/INR), deadlines, and commercial usage scope
  - Flags missing information and generates clarification questions
- **Deterministic AI Fallback**: Guarantees zero-configuration offline exploration for judges with instant structured output even before supplying custom LLM API keys.

### 3. Creator Search & Multi-Factor Filtering (25% Rubric Weight)
- **Dynamic Multi-Field Search**: Searches across creator names, bio, specific tools, models, skills, industries, and portfolio asset text.
- **Combined Filter Matrix**:
  - AI Tools & Models (*Runway, Kling, Flux, ComfyUI, ElevenLabs, Topaz*)
  - Core AI Skills (*AI Video Generation, Prompt Engineering, LoRA Training*)
  - Industry Track Record (*Fashion & Luxury, Tech & SaaS, Automotive, Food & Beverage*)
  - Deliverable Format (*9:16 Vertical, 16:9 Landscape, 1:1 Square*)
  - Budget Cap Slider ($1,000 – $10,000+)
  - Verified Evidence Only toggle
- **Sorting Options**: Relevance & Match Score, Highest Rating, Budget Low-to-High, Budget High-to-Low, Newest.
- **Empty State Recovery**: Zero-result states provide actionable suggestions to adjust filter constraints.

### 4. Explainable Matching Engine (0–100 Compatibility Score)
- **Deterministic 5-Factor Weighted Formula**:
  $$\text{Total Score} = 0.30(\text{Skills}) + 0.25(\text{Tools}) + 0.15(\text{Budget}) + 0.15(\text{Format}) + 0.15(\text{Commercial})$$
- **Itemized Score Breakdown**: Visual modal displays exact percentage ratings for each factor.
- **Positive Justifications**: Specific bullet points explaining why a creator matches the brief.
- **Compatibility Warnings & Missing Flags**: Warns brands if a creator's rate exceeds budget caps or if critical format requirements are unlisted.

### 5. Creator Trust & Verification Desk (Bonus / Core)
- **Evidence-Based Pipeline**: Creators submit external evidence URLs (GitHub repositories, HuggingFace model weights, Dropbox ProRes masters, client attribution letters).
- **Auditor Review Portal (`/admin/verification`)**: Authorized reviewers inspect proofs, record audit notes, and approve with **"Verified by Admin"** or request additional reproducibility evidence.
- **No False Signals**: Clear differentiation between *Verified by Admin*, *Under Review*, *Evidence Submitted*, and *Self-Reported*.

### 6. Side-by-Side Creator Comparison
- Compare up to 3 shortlisted creators across AI toolsets, diffusion checkpoints, hourly/project rate cards, aspect ratios, and verified credentials.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router, Server Components, Route Handlers)
- **Language**: TypeScript (Strict type checking)
- **Styling**: Tailwind CSS (Custom sleek dark mode SaaS aesthetic)
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS) & Storage
- **Validation**: Zod (AI input/output validation & form schemas)
- **Icons & Micro-Interactions**: Lucide React, Canvas Confetti

---

## 🗄️ Database Schema & Migrations

All SQL migrations and realistic demo seeds are version-controlled in the repository:
- `supabase/migrations/20261009000000_creatoros_schema.sql`
- `supabase/seed.sql`

### Core Database Entities:
1. `profiles`: User identities linked to `auth.users`, display names, avatars, roles (`creator`, `brand`, `agency`, `admin`).
2. `creator_profiles`: Deep AI skills, specialized toolsets, diffusion models, rate cards, availability status.
3. `portfolio_projects`: Assets, aspect ratios, 3-step workflow breakdowns, commercial rights, evidence links.
4. `campaigns`: Brand campaign briefs, target demographics, deliverable requirements, commercial buyout terms.
5. `creator_matches`: Computed 0–100 match scores, score breakdowns, positive reasons, and warning indicators.
6. `verification_claims`: Evidence audit submissions, claim types, reviewer IDs, audit notes, and statuses.
7. `engagements`: Direct bookings, proposed budgets, agreed milestones, and deadlines.
8. `deliverables`: Asset submissions and client feedback iterations.

---

## ⚡ Getting Started (Local Development)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/creatoros-ai.git
cd creatoros-ai
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(Optional: CreatorOS AI runs out of the box with zero configuration thanks to its built-in deterministic AI fallback and comprehensive seed dataset).*

### 3. Run Automated System Tests
```bash
npm run test
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🎭 Instant Persona Switching (Judge Evaluation)

Use the Persona Switcher in the top navigation bar to test all user journeys instantly:
- **🎨 AI Creator (`Aria Vance`)**: Publish portfolio projects with ComfyUI workflows, submit verification evidence.
- **🏢 Brand Client (`Lumina Haute Wear`)**: Create briefs with the AI brief builder, view explainable matches, shortlist creators.
- **⚡ Agency Lead (`Aetherium Agency`)**: Manage multi-deliverable high-budget campaigns.
- **🛡️ Auditor Desk (`CreatorOS Desk`)**: Inspect evidence links, approve or reject verification claims at `/admin/verification`.

---

## 🚢 Deployment Guide (Vercel & Supabase)

1. Push repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete CreatorOS AI platform for HacXLerate 2026"
   git push origin main
   ```
2. Import repository into [Vercel](https://vercel.com).
3. Add environment variables in Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `AI_PROVIDER_API_KEY` (Optional)
4. Apply Supabase migrations by running the SQL in `supabase/migrations/` and `supabase/seed.sql` in your Supabase SQL Editor.
5. Deploy!

---

## 📄 License & Compliance

CreatorOS AI enforces transparent workflow documentation, source prompt checks, and clear commercial rights buyout terms under FTC and EU AI Act disclosure standards.
