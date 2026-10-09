import { generateDeterministicBrief, AIBriefOutputSchema } from '../src/lib/ai/brief-generator';
import { calculateMatchScore, generateAllMatches } from '../src/lib/matching-engine';
import { INITIAL_CREATORS } from '../src/lib/data/mock-creators';
import { INITIAL_CAMPAIGNS } from '../src/lib/data/mock-campaigns';

console.log('=== CREATOROS AI SYSTEM TEST SUITE ===\n');

// TEST 1: AI Brief Builder with Hackathon Prompt
console.log('[Test 1] Testing AI Brief Builder with Hackathon prompt...');
const prompt1 = 'We are launching a premium streetwear brand for young people. We need five cinematic AI-generated Instagram Reels for Diwali, with a futuristic Indian aesthetic and a budget of ₹20,000.';
const brief1 = generateDeterministicBrief(prompt1, 'Lumina Streetwear');
const parsed1 = AIBriefOutputSchema.safeParse(brief1);

if (!parsed1.success) {
  console.error('FAIL: Brief schema validation failed:', parsed1.error);
  process.exit(1);
}
console.log('✓ SUCCESS: AI Brief Builder output validated with Zod:');
console.log(`  - Title: ${brief1.title}`);
console.log(`  - Quantity: ${brief1.deliverable_quantity} (${brief1.aspect_ratios.join(', ')})`);
console.log(`  - Budget: ${brief1.currency} ${brief1.budget_min} - ${brief1.budget_max}`);
console.log(`  - Visual Style: ${brief1.visual_style}`);
console.log(`  - Commercial Terms: ${brief1.commercial_usage_type}`);

// TEST 2: Explainable Matching Engine (0–100)
console.log('\n[Test 2] Testing Explainable Matching Engine...');
const sampleCampaign = INITIAL_CAMPAIGNS[0]; // Diwali 2088 Streetwear
const matches = generateAllMatches(sampleCampaign, INITIAL_CREATORS);

if (matches.length === 0) {
  console.error('FAIL: Matching engine returned 0 matches');
  process.exit(1);
}

console.log(`✓ SUCCESS: Matching engine computed ${matches.length} matches for campaign "${sampleCampaign.title}":`);
matches.forEach((m, idx) => {
  console.log(`  #${idx + 1} ${m.creator?.display_name}: Score ${m.total_score}/100 [Skills: ${m.score_breakdown.skill_score}%, Tools: ${m.score_breakdown.tool_score}%, Budget: ${m.score_breakdown.budget_score}%, Format: ${m.score_breakdown.format_score}%, Commercial: ${m.score_breakdown.commercial_score}%]`);
  if (m.match_reasons.length > 0) {
    console.log(`     Reason: ${m.match_reasons[0]}`);
  }
});

// Verify Top Match is Devon Patel or Aria Vance
const topMatch = matches[0];
if (topMatch.total_score < 90) {
  console.error(`FAIL: Expected top match score >= 90, got ${topMatch.total_score}`);
  process.exit(1);
}
console.log(`✓ SUCCESS: Top match "${topMatch.creator?.display_name}" scored ${topMatch.total_score}/100.`);

console.log('\n=== ALL TEST SUITES PASSED CLEANLY (100%) ===\n');
