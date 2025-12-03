import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { generateUUID } from '@/lib/uuid';

// GET - Fetch reaction counts for a content item
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get('contentId');

    if (!contentId) {
      return NextResponse.json({ error: 'contentId is required' }, { status: 400 });
    }

    const client = getSupabaseClient();
    if (!client) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const { data, error } = await client
      .from('reactions')
      .select('reaction_type')
      .eq('content_id', contentId);

    if (error) {
      console.error('[API] Error fetching reactions:', error);
      return NextResponse.json({ error: 'Failed to fetch reactions' }, { status: 500 });
    }

    // Count reactions by type
    const counts = {
      like: 0,
      heart: 0,
      insightful: 0,
    };

    if (data) {
      data.forEach((reaction: { reaction_type: string }) => {
        if (reaction.reaction_type in counts) {
          counts[reaction.reaction_type as keyof typeof counts]++;
        }
      });
    }

    return NextResponse.json(counts, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[API] Unexpected error in GET /api/reactions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Add a reaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentId, reactionType } = body;

    if (!contentId || !reactionType) {
      return NextResponse.json(
        { error: 'contentId and reactionType are required' },
        { status: 400 }
      );
    }

    if (!['like', 'heart', 'insightful'].includes(reactionType)) {
      return NextResponse.json(
        { error: 'Invalid reaction type' },
        { status: 400 }
      );
    }

    const client = getSupabaseClient();
    if (!client) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    // Get user IP for duplicate prevention
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Try to insert, but handle duplicate gracefully
    const { data, error } = await client
      .from('reactions')
      .insert({
        id: generateUUID(),
        content_id: contentId,
        reaction_type: reactionType,
        user_ip: ip,
      })
      .select()
      .single();

    if (error) {
      // Check if it's a duplicate (unique constraint violation)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'You have already reacted to this content' },
          { status: 409 }
        );
      }
      console.error('[API] Error creating reaction:', error);
      return NextResponse.json({ error: 'Failed to create reaction' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('[API] Unexpected error in POST /api/reactions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

