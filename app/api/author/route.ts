// app/api/author/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient, getSupabaseAdminClient } from '@/lib/supabase';
import { requireAuth } from '@/lib/admin-auth';
import { Author } from '@/types';

// GET - Public read (ANON)
export async function GET() {
  try {
    const client = getSupabaseClient();
    if (client) {
      const { data, error } = await client.from('author').select('*').eq('id', 'main').single();
      if (!error && data) return NextResponse.json({
        id: data.id,
        name: data.name,
        credentials: data.credentials || [],
        linkedin: data.linkedin || undefined,
        email: data.email || undefined,
        otherLinks: data.other_links || [],
      });
    }
    return NextResponse.json({ name: 'Devesh Mandhata', credentials: [] });
  } catch {
    return NextResponse.json({ name: 'Devesh Mandhata', credentials: [] });
  }
}

// PUT - Admin update (SERVICE ROLE)
export async function PUT(request: NextRequest) {
  try {
    await requireAuth();
    const admin = getSupabaseAdminClient();
    if (!admin) return NextResponse.json({ error: 'Server not configured' }, { status: 500 });

    const body = (await request.json()) as Author;

    const { error } = await admin
      .from('author')
      .upsert({
        id: 'main',
        name: body.name,
        credentials: body.credentials || [],
        linkedin: body.linkedin || null,
        email: body.email || null,
        other_links: body.otherLinks || [],
      });

    if (error) {
      console.error('Error updating author:', error);
      return NextResponse.json({ error: 'Failed to update author' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error updating author:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
