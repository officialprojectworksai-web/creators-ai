import { NextRequest, NextResponse } from 'next/server';
import { generateAIBrief, AIBriefInputSchema } from '@/lib/ai/brief-generator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = AIBriefInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input parameters', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const generatedBrief = await generateAIBrief(parsed.data);

    return NextResponse.json({
      success: true,
      data: generatedBrief,
    });
  } catch (error: any) {
    console.error('Error generating AI brief:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate brief' },
      { status: 500 }
    );
  }
}
