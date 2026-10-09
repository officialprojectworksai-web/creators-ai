-- ==============================================================================
-- CreatorOS AI Seed Data
-- Comprehensive realistic demo creators, portfolios, campaigns, verification claims
-- ==============================================================================

-- Create demo user profiles (UUIDs are deterministic for relational integrity)
INSERT INTO public.profiles (id, display_name, avatar_url, bio, role, location, languages, experience_years)
VALUES
    ('00000000-0000-0000-0000-000000000001', 'Aria Vance', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', 'Cinematic AI Director & Multimodal Producer specializing in luxury commercials, photorealistic motion, and bespoke ComfyUI pipelines.', 'creator', 'San Francisco, CA / Remote', ARRAY['English', 'French'], 4),
    ('00000000-0000-0000-0000-000000000002', 'Kenji Sato', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', 'Fashion & Editorial AI Virtuoso creating high-end vertical video campaigns for luxury apparel, haute couture, and digital avatars.', 'creator', 'Tokyo, Japan / Remote', ARRAY['English', 'Japanese'], 3),
    ('00000000-0000-0000-0000-000000000003', 'Elena Rostova', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80', 'Sci-Fi Worldbuilder & Game Creative Director. Pioneer in custom LoRA training, multi-scene narrative consistency, and AI audio design.', 'creator', 'Berlin, Germany / Remote', ARRAY['English', 'German', 'Russian'], 5),
    ('00000000-0000-0000-0000-000000000004', 'Marcus Thorne', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80', 'Direct-Response AI Ads & Performance UGC specialist. Over 120M+ views generated with AI-driven hook optimization and voice synthesis.', 'creator', 'Austin, TX / Remote', ARRAY['English', 'Spanish'], 3),
    ('00000000-0000-0000-0000-000000000005', 'Maya Lin', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80', 'Virtual Influencer creator & 3D Character Sculptor combining ComfyUI node workflows with LivePortrait and neural rendering.', 'creator', 'Singapore / Remote', ARRAY['English', 'Mandarin'], 4),
    ('00000000-0000-0000-0000-000000000006', 'Devon Patel', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80', 'Futuristic Narrative Architect blending traditional cinematography with cutting-edge diffusion motion models for tech brands.', 'creator', 'Mumbai, India / Remote', ARRAY['English', 'Hindi'], 3),
    ('00000000-0000-0000-0000-000000000010', 'Aetherium Creative Agency', 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=400&auto=format&fit=crop&q=80', 'Next-gen creative agency producing global digital campaigns for Tier 1 consumer electronics and luxury fashion houses.', 'agency', 'New York, NY', ARRAY['English'], 8),
    ('00000000-0000-0000-0000-000000000011', 'Lumina Haute Wear', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop&q=80', 'Avant-garde luxury streetwear and cyberpunk apparel brand launching experimental seasonal lookbooks.', 'brand', 'London, UK', ARRAY['English', 'Italian'], 5)
ON CONFLICT (id) DO UPDATE SET 
    display_name = EXCLUDED.display_name,
    avatar_url = EXCLUDED.avatar_url,
    bio = EXCLUDED.bio;

-- Insert creator profile metadata
INSERT INTO public.creator_profiles (
    user_id, skills, specializations, industries, ai_tools, ai_models, content_types, preferred_platforms, 
    supported_formats, budget_min, budget_max, currency, availability, commercial_use_preferences, 
    workflow_description, experience_summary, rating, completed_projects
)
VALUES
    (
        '00000000-0000-0000-0000-000000000001',
        ARRAY['AI Video Generation', 'Prompt Engineering', 'ComfyUI Pipelines', 'VFX Composition', 'Color Grading', 'Voice Synthesis'],
        ARRAY['Luxury & Commercials', 'Cinematic Trailers', 'Motion Graphics'],
        ARRAY['Fashion', 'Automotive', 'Consumer Tech', 'Cosmetics'],
        ARRAY['Runway Gen-3', 'Midjourney v6.1', 'ComfyUI', 'Topaz Video AI', 'ElevenLabs', 'DaVinci Resolve'],
        ARRAY['Flux.1 Dev', 'SDXL Turbo', 'SVD XT', 'Claude 3.7 Sonnet'],
        ARRAY['Instagram Reels', 'Cinematic Adverts', 'YouTube Shorts', 'Brand Lookbooks'],
        ARRAY['Instagram', 'YouTube', 'TikTok', 'X/Twitter'],
        ARRAY['9:16 Vertical Video', '16:9 Landscape Video', '4K Ultra HD', '1:1 Square'],
        1500, 7500, 'USD', 'available',
        'Full Commercial Buyout with master prompt sheets and ComfyUI workflow JSON included.',
        'Structured modular pipeline: Step 1 Concept generation & moodboards in Midjourney; Step 2 Latent keyframe consistency with custom LoRAs in ComfyUI; Step 3 Camera motion & physical simulations in Runway Gen-3 Alpha; Step 4 4K upscaling via Topaz Video AI & final audio mastering in ElevenLabs.',
        '4+ years in commercial VFX, transitioned 100% to AI generative pipelines in 2023. Delivered 40+ paid campaigns for global fashion & luxury tech brands with 99% 5-star feedback.',
        4.98, 42
    ),
    (
        '00000000-0000-0000-0000-000000000002',
        ARRAY['Fashion AI Direction', 'Digital Avatar Creation', 'Lookbook Curation', 'Style Transfer', 'Text-to-Video'],
        ARRAY['Haute Couture', 'E-commerce Ads', 'Editorial Stills'],
        ARRAY['Fashion & Apparel', 'Jewelry', 'Luxury Goods'],
        ARRAY['Flux.1 Pro', 'Kling AI', 'Luma Dream Machine', 'Magnific AI', 'Photoshop Generative Fill'],
        ARRAY['Flux.1 Schnell', 'Midjourney v6.1', 'GPT-4o Vision'],
        ARRAY['Instagram Reels', 'Social Stills', 'Lookbook Video', 'TikTok Drops'],
        ARRAY['Instagram', 'TikTok', 'Pinterest'],
        ARRAY['9:16 Vertical Video', '4:5 Social Portrait', '1:1 Square'],
        1000, 5000, 'USD', 'available',
        'Commercial ready for organic and paid social ads worldwide for 12 months with perpetual archive rights.',
        'High-resolution fabric texture preservation pipeline using Flux Dev LoRAs paired with Kling AI for natural drape dynamics and fluid cloth physics.',
        'Former Tokyo fashion photographer turned generative fashion designer. Featured in Vogue Digital Art Showcase 2025.',
        4.95, 36
    ),
    (
        '00000000-0000-0000-0000-000000000003',
        ARRAY['Sci-Fi Worldbuilding', 'Custom LoRA Training', 'Cinematic Trailers', 'Multi-scene Consistency', 'Neural Audio'],
        ARRAY['Gaming Concept Art', 'Cyberpunk Trailers', 'Metaverse Assets'],
        ARRAY['Gaming', 'Entertainment', 'Fintech', 'SaaS'],
        ARRAY['Midjourney', 'Stable Diffusion XL', 'ComfyUI', 'Suno AI', 'ElevenLabs', 'After Effects'],
        ARRAY['SDXL Base + Refiner', 'AnimateDiff', 'Flux.1 Dev', 'Eleven Multilingual v2'],
        ARRAY['Cinematic Adverts', 'YouTube Shorts', '3D Scene Renders', 'Narrative Spots'],
        ARRAY['YouTube', 'X/Twitter', 'Instagram'],
        ARRAY['16:9 Landscape Video', '9:16 Vertical Video', '21:9 Ultrawide', '4K Ultra HD'],
        2000, 10000, 'USD', 'limited',
        'Worldwide commercial licensing with raw LoRA weights transfer upon request.',
        'Proprietary character seed locking mechanism with ComfyUI OpenPose and IP-Adapter nodes, maintaining 99.4% visual character consistency across 12 distinct scenes.',
        'Pioneer in AI cinematic shorts. Awarded Best Generative Cinema short at Munich AI Film Fest 2025.',
        4.99, 29
    ),
    (
        '00000000-0000-0000-0000-000000000004',
        ARRAY['UGC Performance Ads', 'Hook Optimization', 'Voice Cloning', 'Rapid A/B Creative Testing', 'AI Avatars'],
        ARRAY['Direct-to-Consumer', 'SaaS Onboarding', 'Viral Hooks'],
        ARRAY['DTC Brands', 'Mobile Apps', 'Health & Wellness', 'EdTech'],
        ARRAY['Kling AI', 'HeyGen', 'ElevenLabs', 'CapCut AI', 'Midjourney', 'ChatGPT-4o'],
        ARRAY['ElevenLabs Turbo v2.5', 'Kling 1.5 Pro', 'GPT-4o'],
        ARRAY['Instagram Reels', 'TikTok UGC Ads', 'YouTube Shorts'],
        ARRAY['TikTok', 'Instagram', 'YouTube'],
        ARRAY['9:16 Vertical Video', '1:1 Square'],
        800, 3500, 'USD', 'available',
        'Full commercial ad buyout for paid Meta, TikTok, and Google ads with 60-day revision support.',
        'Data-driven AI creative sprints: generate 10 distinct hooks in 24 hours, test emotional valence with AI audience simulators, and render 4K vertical assets with synced multi-lingual dubs.',
        'Created viral ad creatives driving over $4.2M in verified DTC GMV across beauty and tech gadgets.',
        4.92, 58
    ),
    (
        '00000000-0000-0000-0000-000000000005',
        ARRAY['Virtual Influencers', '3D Neural Rendering', 'Facial Performance Capture', 'LivePortrait', 'ControlNet'],
        ARRAY['Brand Ambassadors', 'Interactive Avatars', 'Virtual Fashion Models'],
        ARRAY['Cosmetics', 'Luxury', 'Gaming', 'Consumer Tech'],
        ARRAY['ComfyUI', 'LivePortrait', 'Blender', 'Flux.1', 'Magnific AI', 'Topaz Gigapixel'],
        ARRAY['Flux.1 Dev', 'SD 1.5 AnimateDiff', 'ControlNet v1.1'],
        ARRAY['Virtual Influencer Posts', 'Instagram Reels', '3D Renders', 'Interactive Avatars'],
        ARRAY['Instagram', 'TikTok', 'YouTube'],
        ARRAY['9:16 Vertical Video', '1:1 Square', '4:5 Social Portrait'],
        1200, 6000, 'USD', 'available',
        'Full digital likeness copyright transfer with exclusivity clauses available per sector.',
        'End-to-end photorealistic virtual persona architecture combining 3D facial rigging in Blender with real-time diffusion mapping in ComfyUI.',
        'Creator of 2 verified AI virtual ambassadors with over 350k combined social following.',
        4.94, 22
    ),
    (
        '00000000-0000-0000-0000-000000000006',
        ARRAY['Futuristic Commercials', 'Indian Aesthetic Synthesis', 'Cinematic Color Science', 'Storyboarding', 'Soundtrack AI'],
        ARRAY['Cultural Sci-Fi', 'Streetwear Campaigns', 'Festival Specials'],
        ARRAY['Apparel & Streetwear', 'Beverage', 'Hospitality', 'Tech Hardware'],
        ARRAY['Runway Gen-3', 'Midjourney v6.1', 'Flux.1', 'ElevenLabs', 'Udio', 'After Effects'],
        ARRAY['Flux.1 Dev', 'Runway Gen-3 Alpha', 'Claude 3.7 Sonnet'],
        ARRAY['Instagram Reels', 'Cinematic Adverts', 'YouTube Shorts', 'Social Stills'],
        ARRAY['Instagram', 'YouTube', 'X/Twitter'],
        ARRAY['9:16 Vertical Video', '16:9 Landscape Video', '1:1 Square'],
        1000, 4500, 'USD', 'available',
        'Full Commercial Buyout with full commercial rights for OTT and social media.',
        'Blends authentic South Asian cultural motifs, cyberpunk lighting, and cinematic slow-motion generative cameras with bespoke synth-sitar audio scores.',
        'Directs commercial AI spots for fast-growing lifestyle brands across India and the US.',
        4.96, 31
    )
ON CONFLICT (user_id) DO UPDATE SET 
    skills = EXCLUDED.skills,
    ai_tools = EXCLUDED.ai_tools,
    ai_models = EXCLUDED.ai_models,
    budget_min = EXCLUDED.budget_min,
    budget_max = EXCLUDED.budget_max;

-- Insert Portfolio Projects
INSERT INTO public.portfolio_projects (
    id, creator_id, title, description, media_type, media_url, thumbnail_url, category, industry,
    tools_used, models_used, skills_used, workflow_steps, aspect_ratio, duration_seconds, platform,
    commercial_use_status, license_information, evidence_links, is_published, featured, views_count, likes_count
)
VALUES
    (
        '10000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000001',
        'Aura Chrono — Luxury Timepiece in Zero Gravity',
        'A cinematic 30-second advert depicting a sapphire crystal luxury timepiece assembling in zero gravity amidst iridescent nebula dust.',
        'video',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1080&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
        'Luxury Commercial', 'Fashion & Luxury',
        ARRAY['Runway Gen-3', 'Midjourney v6.1', 'Topaz Video AI', 'ElevenLabs'],
        ARRAY['Flux.1 Dev', 'Runway Gen-3 Alpha'],
        ARRAY['AI Video Generation', 'ComfyUI Pipelines', 'VFX Composition'],
        '[{"step":1,"title":"Concept & Macro Lighting","detail":"Prompted 40+ macro sapphire watch textures in Midjourney v6.1."},{"step":2,"title":"Zero-G Motion Synthesis","detail":"Fed keyframes into Runway Gen-3 with custom camera yaw and orbital physics."},{"step":3,"title":"4K Spatial Upscale","detail":"Processed at 60fps through Topaz Video AI Iris model."}]'::jsonb,
        '9:16', 30, 'Instagram Reels',
        'Verified Commercial Ready', 'Exclusive Commercial Buyout for Zenith Watches Q4 Campaign',
        ARRAY['https://github.com/creatoros/evidence-demo-01', 'https://huggingface.co/workflows/comfyui-aura-chrono'],
        true, true, 2840, 312
    ),
    (
        '10000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000001',
        'Cyber-Lotus Electric Hypercar Reveal',
        'Photorealistic launch teaser showcasing an electric hypercar navigating neon-drenched monsoon streets of Neo-Tokyo.',
        'video',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1080&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80',
        'Automotive Campaign', 'Automotive',
        ARRAY['Midjourney v6.1', 'Runway Gen-3', 'ComfyUI', 'DaVinci Resolve'],
        ARRAY['Flux.1 Dev', 'SDXL Turbo'],
        ARRAY['Cinematic Trailers', 'Style Transfer', 'Color Grading'],
        '[{"step":1,"title":"Hard-Surface 3D Consistency","detail":"Utilized ControlNet depth maps to lock vehicle chassis geometry across 8 shots."},{"step":2,"title":"Rain & Wet Surface Dynamics","detail":"Runway Gen-3 motion brush for atmospheric reflection distortion."}]'::jsonb,
        '16:9', 45, 'YouTube Shorts',
        'Verified Commercial Ready', 'Full Commercial License with raw ProRes master files',
        ARRAY['https://github.com/creatoros/evidence-demo-02'],
        true, true, 4120, 580
    ),
    (
        '10000000-0000-0000-0000-000000000003',
        '00000000-0000-0000-0000-000000000002',
        'Neo-Silk: Bioluminescent Runway 2026',
        'Editorial fashion film displaying synthetic bioluminescent silk textiles reacting to ambient electronic music.',
        'video',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1080&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
        'Haute Couture', 'Fashion & Apparel',
        ARRAY['Flux.1 Pro', 'Kling AI', 'Magnific AI'],
        ARRAY['Flux.1 Dev', 'Kling 1.5'],
        ARRAY['Fashion AI Direction', 'Lookbook Curation', 'Text-to-Video'],
        '[{"step":1,"title":"Textile Fabric Synthesis","detail":"Trained custom LoRA on micro-weave silk textures."},{"step":2,"title":"Runway Walk Animation","detail":"Kling AI motion generation with slow-motion cloth simulation."}]'::jsonb,
        '9:16', 20, 'Instagram Reels',
        'Verified Commercial Ready', 'Global Commercial Rights for Milan Fashion Week digital billboard',
        ARRAY['https://github.com/creatoros/evidence-demo-03'],
        true, true, 5320, 720
    ),
    (
        '10000000-0000-0000-0000-000000000004',
        '00000000-0000-0000-0000-000000000006',
        'Diwali 2088 — Cyberpunk Streetwear Collection',
        '5-part vertical campaign depicting futuristic Indian youth adorned in neon LED-embroidered streetwear during a cyberpunk festival of lights.',
        'video',
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1080&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
        'Streetwear Campaign', 'Apparel & Streetwear',
        ARRAY['Runway Gen-3', 'Flux.1', 'ElevenLabs', 'Udio'],
        ARRAY['Flux.1 Dev', 'Runway Gen-3 Alpha'],
        ARRAY['Futuristic Commercials', 'Indian Aesthetic Synthesis', 'Voice Synthesis'],
        '[{"step":1,"title":"Cultural Fusion Concept","detail":"Midjourney v6.1 prompt matrix blending traditional Banarasi silk patterns with cyberpunk LED circuits."},{"step":2,"title":"Kinetic Motion","detail":"Runway Gen-3 camera sweeps over nighttime street markets."},{"step":3,"title":"Custom Soundtrack","detail":"Synthesized cyber-sitar electro score via Udio."}]'::jsonb,
        '9:16', 30, 'Instagram Reels',
        'Verified Commercial Ready', 'Full Commercial Buyout for Lumina Haute Wear Q4 Campaign',
        ARRAY['https://github.com/creatoros/evidence-demo-04'],
        true, true, 8920, 1140
    ),
    (
        '10000000-0000-0000-0000-000000000005',
        '00000000-0000-0000-0000-000000000003',
        'Chronicles of Aethelgard — Fantasy RPG Teaser',
        'Atmospheric 60-second worldbuilding teaser showcasing hyper-detailed mythical dragons, floating citadels, and ancient rune spells.',
        'video',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1080&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
        'Gaming Teaser', 'Gaming',
        ARRAY['Midjourney', 'Stable Diffusion XL', 'ComfyUI', 'Suno AI'],
        ARRAY['SDXL Base', 'AnimateDiff', 'Flux.1 Dev'],
        ARRAY['Sci-Fi Worldbuilding', 'Custom LoRA Training', 'Multi-scene Consistency'],
        '[{"step":1,"title":"Environment Latent Exploration","detail":"Generated consistent fantasy landscape seed maps."},{"step":2,"title":"Character Consistency Rig","detail":"IP-Adapter applied in ComfyUI for armor and facial features."}]'::jsonb,
        '16:9', 60, 'YouTube Shorts',
        'Verified Commercial Ready', 'Full Commercial Game Promo Buyout',
        ARRAY['https://github.com/creatoros/evidence-demo-05'],
        true, true, 6420, 890
    ),
    (
        '10000000-0000-0000-0000-000000000006',
        '00000000-0000-0000-0000-000000000004',
        'AuraSleep Smart Ring — Viral UGC Ad Suite',
        'High-converting 3-hook vertical video package highlighting biometric sleep tracking and dream state visualization with 3.8% CTR.',
        'video',
        'https://images.unsplash.com/photo-1510519138161-58474ebf8804?w=1080&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80',
        'DTC Ad Campaign', 'Consumer Tech',
        ARRAY['Kling AI', 'HeyGen', 'ElevenLabs', 'CapCut AI'],
        ARRAY['ElevenLabs Turbo v2.5', 'Kling 1.5 Pro'],
        ARRAY['UGC Performance Ads', 'Hook Optimization', 'Voice Cloning'],
        '[{"step":1,"title":"Hook Generation","detail":"5 high-retention hooks created with conversational AI voice synthesis."},{"step":2,"title":"Product Hologram Inset","detail":"Composed 3D ring hologram with human avatar reactions."}]'::jsonb,
        '9:16', 25, 'TikTok UGC Ads',
        'Verified Commercial Ready', 'Exclusive Paid Media Usage Rights for 90 Days',
        ARRAY['https://github.com/creatoros/evidence-demo-06'],
        true, false, 12400, 1680
    )
ON CONFLICT (id) DO NOTHING;

-- Insert Verification Claims
INSERT INTO public.verification_claims (
    id, creator_id, claim_type, claim_title, claim_description, evidence_url, status, 
    reviewer_id, reviewed_at, review_notes, badge_label
)
VALUES
    (
        '20000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000001',
        'workflow_authorship',
        'ComfyUI Zero-Gravity Node Workflow Authorship',
        'Submitted complete JSON node graph, custom checkpoint fine-tune logs, and step-by-step screen recording verifying original production of Aura Chrono.',
        'https://github.com/ariavance/comfyui-aura-chrono-pipeline',
        'verified',
        '00000000-0000-0000-0000-000000000010',
        now() - INTERVAL '3 days',
        'Verified by admin: Workflow runs deterministically on RTX 4090, source seed matches published asset frames 100%.',
        'Verified Workflow'
    ),
    (
        '20000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000001',
        'tool_proficiency',
        'Runway Gen-3 Advanced Camera Motion & Motion Brush Certification',
        'Provided certified project export IDs and commercial API usage tokens demonstrating 100+ hours of advanced cinematic camera direction.',
        'https://runwayml.com/creators/ariavance-portfolio-audit',
        'verified',
        '00000000-0000-0000-0000-000000000010',
        now() - INTERVAL '5 days',
        'Verified by admin: API logs verified, advanced motion brush parameters confirmed.',
        'Verified Tool Master'
    ),
    (
        '20000000-0000-0000-0000-000000000003',
        '00000000-0000-0000-0000-000000000002',
        'portfolio_authenticity',
        'Haute Couture Fabric Physics & LoRA Weights',
        'Supplied proprietary Flux LoRA Safetensors file trained on high-density silk weave datasets.',
        'https://huggingface.co/kenjisato/flux-silk-physics-v2',
        'verified',
        '00000000-0000-0000-0000-000000000010',
        now() - INTERVAL '2 days',
        'Verified by admin: Model weights inspected and validated for genuine original training.',
        'Verified LoRA Model'
    ),
    (
        '20000000-0000-0000-0000-000000000004',
        '00000000-0000-0000-0000-000000000006',
        'commercial_license_compliance',
        'Diwali Cyberpunk Commercial Rights & Master Source Deliverables',
        'Submitted master ProRes 4444 export, split audio stems from Udio, and license agreements.',
        'https://dropbox.com/sh/devonpatel-diwali-commercial-audit',
        'verified',
        '00000000-0000-0000-0000-000000000010',
        now() - INTERVAL '1 day',
        'Verified by admin: Full stem clearance and prompt log audit passed.',
        'Commercial Cleared'
    ),
    (
        '20000000-0000-0000-0000-000000000005',
        '00000000-0000-0000-0000-000000000004',
        'client_reference',
        'DTC Brand $4.2M GMV Performance Reference',
        'Submitted signed verification letter from CMO of AuraSleep confirming $4.2M attribution and 3.8% CTR.',
        'https://aurasleep.io/press/creator-reference-mthorne.pdf',
        'under_review',
        NULL, NULL,
        'Evidence submitted: Awaiting agency partner secondary signoff.',
        'Evidence Under Review'
    ),
    (
        '20000000-0000-0000-0000-000000000006',
        '00000000-0000-0000-0000-000000000005',
        'workflow_authorship',
        'LivePortrait Facial Rigging Pipeline Documentation',
        'Submitted technical breakdown PDF and node schematic for interactive avatar streaming.',
        'https://github.com/mayalin/liveportrait-3d-pipeline',
        'submitted',
        NULL, NULL,
        'Evidence submitted by creator on 2026-10-08.',
        'Evidence Submitted'
    )
ON CONFLICT (id) DO NOTHING;

-- Insert Campaigns
INSERT INTO public.campaigns (
    id, owner_id, owner_role, title, description, objective, industry, target_audience,
    content_types, visual_style, tone, platforms, aspect_ratios, resolution, duration_seconds,
    deliverable_quantity, required_skills, required_tools, budget_min, budget_max, currency,
    deadline, commercial_usage_type, usage_duration, territories, exclusivity,
    ownership_requirements, disclosure_requirements, status
)
VALUES
    (
        '30000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000011',
        'brand',
        'Diwali 2088: Cyberpunk Streetwear Collection Launch',
        'Looking for a top-tier multimodal AI creator to produce 5 cinematic 9:16 Instagram Reels for the festive launch of our futuristic cyberpunk streetwear line. Aesthetic should fuse traditional Indian festive motifs (diyas, gold embroidery, Banarasi textures) with neon cyberpunk cityscapes and synthwave energy.',
        'Drive 500k+ impressions and direct pre-orders for the limited-edition Diwali 2088 drops.',
        'Fashion & Apparel',
        'Gen-Z and millennial fashion innovators, streetwear enthusiasts aged 18-32',
        ARRAY['Instagram Reels', 'YouTube Shorts', 'Social Stills'],
        'Cyberpunk Festive, Neon Noir with Gold & Crimson Highlights',
        'High-energy, avant-garde, premium, futuristic',
        ARRAY['Instagram', 'YouTube', 'TikTok'],
        ARRAY['9:16', '1:1'],
        '4K 60fps Ultra HD', 30, 5,
        ARRAY['AI Video Generation', 'Prompt Engineering', 'Voice Synthesis', 'VFX Composition'],
        ARRAY['Runway Gen-3', 'Flux.1', 'Midjourney', 'ElevenLabs'],
        2500, 6000, 'USD',
        now() + INTERVAL '21 days',
        'Full Commercial Buyout (Paid Ads + Organic)', '12 Months', 'Worldwide',
        'Category Exclusive in Apparel for 60 days',
        'Master ProRes exports, split audio stems, and prompt workflow sheets',
        'Standard AI Transparency tag in caption',
        'published'
    ),
    (
        '30000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000010',
        'agency',
        'Synapse AI Developer Cloud — 3D Explainer Series',
        'Seeking an experienced generative AI director to create 3 high-impact 16:9 cinematic teasers showcasing our distributed GPU inference cloud. Must showcase neural networks, hyper-speed data conduits, and futuristic server monoliths.',
        'Educate enterprise CTOs and AI engineers on 10x lower latency GPU clusters.',
        'Tech & SaaS',
        'Software Engineers, AI Researchers, CTOs, Tech Executives',
        ARRAY['Cinematic Adverts', 'YouTube Shorts', '3D Scene Renders'],
        'Sleek Dark Mode, Bioluminescent Cyan & Purple Data Visuals',
        'Authoritative, sophisticated, visionary, high-tech',
        ARRAY['YouTube', 'LinkedIn', 'X/Twitter'],
        ARRAY['16:9', '9:16'],
        '4K 60fps', 45, 3,
        ARRAY['Sci-Fi Worldbuilding', 'ComfyUI Pipelines', 'Cinematic Trailers'],
        ARRAY['Midjourney', 'Runway Gen-3', 'ComfyUI', 'Topaz Video AI'],
        4000, 9500, 'USD',
        now() + INTERVAL '30 days',
        'Perpetual Worldwide Commercial Buyout', 'Perpetual', 'Worldwide',
        'Non-exclusive',
        'Raw project source files + uncompressed master deliverables',
        'AI Assisted notation included in brand guidelines',
        'published'
    ),
    (
        '30000000-0000-0000-0000-000000000003',
        '00000000-0000-0000-0000-000000000011',
        'brand',
        'Kinetics Quantum Energy Drink — UGC Hook Sprint',
        'Need 8 high-converting 9:16 viral TikTok & Meta video ads featuring realistic AI athlete avatars crushing superhuman challenges after drinking Kinetics Quantum.',
        'Maximize ROAS on paid social campaigns with a target $12 CPA.',
        'Food & Beverage',
        'Fitness enthusiasts, gamers, and university students aged 18-28',
        ARRAY['Instagram Reels', 'TikTok UGC Ads'],
        'Dynamic UGC, Raw Smartphone Aesthetic with Hyper-Realistic AI CGI Effects',
        'Relatable, energetic, punchy, humorous',
        ARRAY['TikTok', 'Instagram'],
        ARRAY['9:16'],
        '1080p 60fps', 20, 8,
        ARRAY['UGC Performance Ads', 'Hook Optimization', 'Voice Cloning'],
        ARRAY['Kling AI', 'HeyGen', 'ElevenLabs', 'CapCut AI'],
        1500, 4000, 'USD',
        now() + INTERVAL '14 days',
        'Paid Media Social Buyout for 90 Days', '90 Days', 'United States & Canada',
        'Non-exclusive',
        '10 variations of initial 3-second hooks + 8 final video cuts',
        'Standard social disclosures',
        'published'
    )
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Creator Matches
INSERT INTO public.creator_matches (
    id, campaign_id, creator_id, total_score, score_breakdown, match_reasons, missing_requirements, compatibility_warnings, status
)
VALUES
    (
        '40000000-0000-0000-0000-000000000001',
        '30000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000006',
        96.5,
        '{"skill_score":98,"tool_score":95,"budget_score":96,"format_score":100,"commercial_score":94}'::jsonb,
        ARRAY[
            'Perfect cultural and stylistic match: Creator has proven track record with Indian Cyberpunk aesthetics',
            'Full toolset alignment: Expert in Runway Gen-3, Flux.1, Midjourney, and ElevenLabs',
            'Budget compatibility: Creator rate ($1,000 - $4,500) sits comfortably within campaign budget ($2,500 - $6,000)',
            'Deliverable format fit: 9:16 vertical video and 4K capability verified'
        ],
        ARRAY[]::text[],
        ARRAY[]::text[],
        'shortlisted'
    ),
    (
        '40000000-0000-0000-0000-000000000001',
        '30000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000001',
        93.0,
        '{"skill_score":95,"tool_score":94,"budget_score":88,"format_score":100,"commercial_score":90}'::jsonb,
        ARRAY[
            'World-class luxury and commercial visual fidelity',
            'Verified ComfyUI and Runway Gen-3 tool mastery',
            'Supports 9:16 and 4K Ultra HD deliverables'
        ],
        ARRAY['Higher average price point for complex custom pipelines'],
        ARRAY['Creator budget ceiling ($7,500) slightly exceeds campaign budget ($6,000)'],
        'suggested'
    ),
    (
        '40000000-0000-0000-0000-000000000002',
        '30000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000003',
        97.0,
        '{"skill_score":99,"tool_score":98,"budget_score":94,"format_score":98,"commercial_score":96}'::jsonb,
        ARRAY[
            'Industry leader in Sci-Fi worldbuilding and futuristic server/tech visualizations',
            'Complete ComfyUI node pipeline and custom LoRA capabilities',
            '16:9 4K landscape format specialist'
        ],
        ARRAY[]::text[],
        ARRAY[]::text[],
        'shortlisted'
    )
ON CONFLICT (campaign_id, creator_id) DO NOTHING;
