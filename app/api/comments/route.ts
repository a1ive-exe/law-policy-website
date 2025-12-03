import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient, getSupabaseAdminClient } from '@/lib/supabase';
import { requireAuth } from '@/lib/admin-auth';
import { generateUUID } from '@/lib/uuid';

// GET - Fetch comments for a content item
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
      .from('comments')
      .select('*')
      .eq('content_id', contentId)
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[API] Error fetching comments:', error);
      return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }

    return NextResponse.json(data || [], {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[API] Unexpected error in GET /api/comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentId, authorName, authorEmail, comment } = body;

    if (!contentId || !authorName || !authorEmail || !comment) {
      return NextResponse.json(
        { error: 'contentId, authorName, authorEmail, and comment are required' },
        { status: 400 }
      );
    }

    const client = getSupabaseClient();
    if (!client) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const { data, error } = await client
      .from('comments')
      .insert({
        id: generateUUID(),
        content_id: contentId,
        author_name: authorName,
        author_email: authorEmail,
        comment: comment.trim(),
        approved: true, // Auto-approve comments
      })
      .select()
      .single();

    if (error) {
      console.error('[API] Error creating comment:', error);
      return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('[API] Unexpected error in POST /api/comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete a comment (admin only)
export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('id');

    if (!commentId) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }

    const adminClient = getSupabaseAdminClient();
    if (!adminClient) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    const { error } = await adminClient
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      console.error('[API] Error deleting comment:', error);
      return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[API] Unexpected error in DELETE /api/comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

