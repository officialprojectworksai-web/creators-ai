import { z } from 'zod';

export const AIBriefInputSchema = z.object({
  raw_prompt: z.string().min(10, 'Prompt must be at least 10 characters long to generate a meaningful brief.'),
  preferred_brand_name: z.string().optional(),
  target_industry: z.string().optional(),
});

export const AIBriefOutputSchema = z.object({
  title: z.string(),
  objective: z.string(),
  industry: z.string(),
  target_audience: z.string(),
  creative_direction: z.string(),
  visual_style: z.string(),
  tone: z.string(),
  content_types: z.array(z.string()),
  platforms: z.array(z.string()),
  aspect_ratios: z.array(z.string()),
  resolution: z.string(),
  duration_seconds: z.number(),
  deliverable_quantity: z.number(),
  required_skills: z.array(z.string()),
  required_tools: z.array(z.string()),
  budget_min: z.number(),
  budget_max: z.number(),
  currency: z.string(),
  commercial_usage_type: z.string(),
  usage_duration: z.string(),
  territories: z.string(),
  exclusivity: z.string(),
  ownership_requirements: z.string(),
  disclosure_requirements: z.string(),
  missing_information: z.array(z.string()),
  clarification_questions: z.array(z.string()),
  generation_mode: z.enum(['llm', 'deterministic_fallback']),
});

export type AIBriefInput = z.infer<typeof AIBriefInputSchema>;
export type AIBriefOutput = z.infer<typeof AIBriefOutputSchema>;

/**
 * Deterministic AI brief builder that intelligently parses natural language keywords
 * without needing external API credentials, ensuring zero-configuration hackathon evaluation.
 */
export function generateDeterministicBrief(rawPrompt: string, brandName?: string): AIBriefOutput {
  const promptLower = rawPrompt.toLowerCase();

  // Extract Quantity
  let deliverable_quantity = 3;
  const numMatch = promptLower.match(/(\d+)\s*(reels|shorts|videos|assets|pieces|creatives|cuts)/);
  if (numMatch && parseInt(numMatch[1], 10) > 0) {
    deliverable_quantity = parseInt(numMatch[1], 10);
  } else if (promptLower.includes('five') || promptLower.includes(' 5 ')) {
    deliverable_quantity = 5;
  } else if (promptLower.includes('three') || promptLower.includes(' 3 ')) {
    deliverable_quantity = 3;
  } else if (promptLower.includes('eight') || promptLower.includes(' 8 ')) {
    deliverable_quantity = 8;
  }

  // Extract Budget & Currency
  let budget_min = 1500;
  let budget_max = 4000;
  let currency = 'USD';

  const inrMatch = promptLower.match(/(?:₹|inr|rs\.?)\s*([\d,]+(?:\.\d+)?)/);
  const usdMatch = promptLower.match(/(?:\$|usd)\s*([\d,]+(?:\.\d+)?)/);

  if (inrMatch) {
    const rawVal = parseInt(inrMatch[1].replace(/,/g, ''), 10);
    budget_min = Math.round(rawVal * 0.85);
    budget_max = rawVal;
    currency = 'INR';
  } else if (usdMatch) {
    const rawVal = parseInt(usdMatch[1].replace(/,/g, ''), 10);
    budget_min = Math.round(rawVal * 0.8);
    budget_max = rawVal;
    currency = 'USD';
  } else if (promptLower.includes('20,000') || promptLower.includes('20000')) {
    budget_min = 18000;
    budget_max = 25000;
    currency = promptLower.includes('₹') || promptLower.includes('diwali') ? 'INR' : 'USD';
  }

  // Extract Industry & Style
  let industry = 'Fashion & Apparel';
  let visual_style = 'Cinematic Futuristic Noir with High Dynamic Lighting';
  let tone = 'High-energy, innovative, youth-centric, premium';
  let target_audience = 'Gen-Z and millennial digital natives and trendsetters (18-30)';

  if (promptLower.includes('streetwear') || promptLower.includes('apparel') || promptLower.includes('fashion') || promptLower.includes('clothing')) {
    industry = 'Fashion & Apparel';
    visual_style = promptLower.includes('indian') || promptLower.includes('diwali')
      ? 'Cyberpunk Festive, Neon Noir with Gold & Crimson Banarasi Weave Highlights'
      : 'Avant-Garde Streetwear, Urban High-Contrast Film Grain';
  } else if (promptLower.includes('saas') || promptLower.includes('tech') || promptLower.includes('cloud') || promptLower.includes('software')) {
    industry = 'Tech & SaaS';
    visual_style = 'Sleek Dark Mode, Bioluminescent Cyan & Purple Data Topology';
    tone = 'Authoritative, sophisticated, visionary, high-tech';
    target_audience = 'Engineers, Product Leaders, CTOs, and Modern Tech Professionals';
  } else if (promptLower.includes('beverage') || promptLower.includes('drink') || promptLower.includes('food') || promptLower.includes('snack')) {
    industry = 'Food & Beverage';
    visual_style = 'Dynamic Macro Liquid Physics, Hyper-Real Saturated Splash Motion';
    tone = 'Refreshing, energetic, punchy, bold';
  }

  // Extract Platforms & Aspect Ratios
  const platforms: string[] = [];
  const aspect_ratios: string[] = [];
  const content_types: string[] = [];

  if (promptLower.includes('reel') || promptLower.includes('instagram')) {
    platforms.push('Instagram');
    content_types.push('Instagram Reels');
    aspect_ratios.push('9:16');
  }
  if (promptLower.includes('tiktok')) {
    platforms.push('TikTok');
    content_types.push('TikTok UGC Ads');
    aspect_ratios.push('9:16');
  }
  if (promptLower.includes('shorts') || promptLower.includes('youtube')) {
    platforms.push('YouTube');
    content_types.push('YouTube Shorts');
    if (!aspect_ratios.includes('9:16')) aspect_ratios.push('9:16');
  }

  if (platforms.length === 0) {
    platforms.push('Instagram', 'YouTube', 'TikTok');
    content_types.push('Instagram Reels', 'YouTube Shorts');
    aspect_ratios.push('9:16', '1:1');
  }

  // Extract Title
  let title = `${brandName || 'Cyber-Luxe'} Launch Campaign`;
  if (promptLower.includes('diwali')) {
    title = `${brandName || 'Streetwear Brand'} — Diwali Futuristic Capsule Launch`;
  } else if (promptLower.includes('streetwear')) {
    title = `${brandName || 'Urban Streetwear'} — Cinematic Gen-Z Campaign`;
  } else if (industry === 'Tech & SaaS') {
    title = `${brandName || 'NextGen Tech'} — 3D Architecture Explainer Series`;
  }

  // Extract Objective
  const objective = `Create ${deliverable_quantity} high-impact ${content_types.join(' & ')} to drive viral brand engagement, highlight unique product aesthetics, and maximize conversion across ${platforms.join(', ')}.`;

  const required_skills = ['AI Video Generation', 'Prompt Engineering', 'Cinematic Direction', 'Color Grading'];
  if (promptLower.includes('voice') || promptLower.includes('sound') || promptLower.includes('music')) {
    required_skills.push('Voice Synthesis', 'Soundtrack AI');
  } else {
    required_skills.push('VFX Composition');
  }

  const required_tools = ['Runway Gen-3', 'Flux.1', 'Midjourney v6.1', 'ElevenLabs'];

  return {
    title,
    objective,
    industry,
    target_audience,
    creative_direction: `High-production generative cinematography blending rich cultural or thematic motifs with cutting-edge diffusion physics. Ensure consistent lighting, crisp subject framing, and engaging initial 3-second visual hooks.`,
    visual_style,
    tone,
    content_types,
    platforms,
    aspect_ratios: aspect_ratios.length > 0 ? aspect_ratios : ['9:16'],
    resolution: '4K 60fps Ultra HD',
    duration_seconds: 30,
    deliverable_quantity,
    required_skills,
    required_tools,
    budget_min,
    budget_max,
    currency,
    commercial_usage_type: 'Full Commercial Buyout (Paid Ads + Organic)',
    usage_duration: '12 Months',
    territories: 'Worldwide',
    exclusivity: 'Category Exclusive for 60 Days',
    ownership_requirements: 'Master ProRes / 4K MP4 deliverables + prompt workflow documentation',
    disclosure_requirements: 'AI Transparency badge / disclosure per FTC and regional advertising standards',
    missing_information: [
      'Specific product lookbook reference images or color swatch hex codes',
      'Exact launch date deadline for final cut delivery'
    ],
    clarification_questions: [
      'Do you require custom voiceover dubbing in multiple languages?',
      'Should raw project files (ComfyUI JSON / LoRA weights) be included in final handoff?'
    ],
    generation_mode: 'deterministic_fallback',
  };
}

/**
 * Server-side AI brief generator dispatcher.
 * Attempts configured LLM first; gracefully falls back to deterministic brief builder on error or missing API key.
 */
export async function generateAIBrief(input: AIBriefInput): Promise<AIBriefOutput> {
  const validated = AIBriefInputSchema.parse(input);
  const apiKey = process.env.AI_PROVIDER_API_KEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // Zero-config deterministic fallback
    return generateDeterministicBrief(validated.raw_prompt, validated.preferred_brand_name);
  }

  try {
    // If Gemini key is available
    if (process.env.GEMINI_API_KEY || process.env.AI_PROVIDER_API_KEY) {
      const activeKey = process.env.GEMINI_API_KEY || process.env.AI_PROVIDER_API_KEY;
      const model = process.env.AI_MODEL || 'gemini-1.5-flash';
      
      const systemPrompt = `You are the Lead Creative Director AI for CreatorOS, an AI Content Creator Marketplace.
Convert the user's rough campaign brief request into a structured JSON object conforming strictly to this schema:
{
  "title": string,
  "objective": string,
  "industry": string,
  "target_audience": string,
  "creative_direction": string,
  "visual_style": string,
  "tone": string,
  "content_types": string[],
  "platforms": string[],
  "aspect_ratios": string[],
  "resolution": string,
  "duration_seconds": number,
  "deliverable_quantity": number,
  "required_skills": string[],
  "required_tools": string[],
  "budget_min": number,
  "budget_max": number,
  "currency": string,
  "commercial_usage_type": string,
  "usage_duration": string,
  "territories": string,
  "exclusivity": string,
  "ownership_requirements": string,
  "disclosure_requirements": string,
  "missing_information": string[],
  "clarification_questions": string[]
}
Never hallucinate legal guarantees. If budget or deadline is missing, make reasonable estimates and list questions in missing_information.
Respond ONLY with valid JSON.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nUser Input: ${validated.raw_prompt}` }],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`LLM API responded with ${response.status}`);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        const parsed = JSON.parse(text);
        const result = AIBriefOutputSchema.parse({
          ...parsed,
          generation_mode: 'llm',
        });
        return result;
      }
    }

    return generateDeterministicBrief(validated.raw_prompt, validated.preferred_brand_name);
  } catch (error) {
    console.warn('AI provider call failed or timed out, using deterministic fallback:', error);
    return generateDeterministicBrief(validated.raw_prompt, validated.preferred_brand_name);
  }
}
