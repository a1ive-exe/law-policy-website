// lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ContentItem } from '@/types';
import { generateUUID } from './uuid';

let publicClient: SupabaseClient | null = null;
let adminClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (publicClient) return publicClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  publicClient = createClient(url, anon, { auth: { persistSession: false } });
  return publicClient;
}

// Server-only client that BYPASSES RLS
export function getSupabaseAdminClient(): SupabaseClient | null {
  if (typeof window !== 'undefined') return null; // never in browser
  if (adminClient) return adminClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) return null;
  adminClient = createClient(url, service, { auth: { persistSession: false } });
  return adminClient;
}

interface ContentRow {
  id: string;
  title: string | null;
  subtitle: string | null;
  slug: string;
  author_name: string | null;
  author_credentials: string[] | null;
  author_linkedin: string | null;
  author_email: string | null;
  published_date: string | null;
  law_area: string | null;
  jurisdiction: string | null;
  content_type: string | null;
  is_policy_recommendation: boolean | null;
  policy_theme: string | null;
  content: string | null;
  excerpt: string | null;
  tags: string[] | null;
  featured: boolean | null;
  category_path: string | null;
}

export function rowToContentItem(row: any): ContentItem {
  return {
    id: row.id,
    title: row.title || undefined,
    subtitle: row.subtitle || undefined,
    slug: row.slug,
    author: row.author_name ? {
      name: row.author_name,
      credentials: row.author_credentials ?? [],
      linkedin: row.author_linkedin ?? undefined,
      email: row.author_email ?? undefined,
    } : undefined,
    publishedDate: row.published_date || undefined,
    lawArea: row.law_area ?? undefined,
    jurisdiction: row.jurisdiction ?? undefined,
    contentType: row.content_type ?? undefined,
    isPolicyRecommendation: !!row.is_policy_recommendation,
    policyTheme: row.policy_theme ?? undefined,
    content: row.content ?? undefined,
    excerpt: row.excerpt ?? undefined,
    tags: row.tags ?? [],
    featured: !!row.featured,
    categoryPath: row.category_path ?? undefined,
  };
}

export function contentItemToRow(item: Partial<ContentItem>, id?: string): Partial<ContentRow> {
  return {
    id: id || item.id || generateUUID(),
    title: item.title ?? null,
    subtitle: item.subtitle ?? null,
    slug: item.slug || `content-${Date.now()}`, // Auto-generate if missing (required by DB)
    author_name: item.author?.name || 'Devesh Mandhata',
    author_credentials: item.author?.credentials || [],
    author_linkedin: item.author?.linkedin ?? null,
    author_email: item.author?.email ?? null,
    published_date: item.publishedDate ?? null,
    law_area: item.lawArea ?? null,
    jurisdiction: item.jurisdiction ?? null,
    content_type: item.contentType ?? null,
    is_policy_recommendation: item.isPolicyRecommendation ?? false,
    policy_theme: item.policyTheme ?? null,
    content: item.content ?? null,
    excerpt: item.excerpt ?? null,
    tags: item.tags || [],
    featured: item.featured ?? false,
    category_path: item.categoryPath ?? null,
  };
}
