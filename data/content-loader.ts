import { ContentItem } from '@/types';
import { sampleContent as defaultContent } from './content';
import { getSupabaseClient, rowToContentItem } from '@/lib/supabase';

// Helper to extract error information from Supabase errors
function extractErrorInfo(error: any): Record<string, any> {
  return {
    message: error?.message || String(error),
    code: error?.code || null,
    details: error?.details || null,
    hint: error?.hint || null,
  };
}

// Try to load from Supabase, fallback to default content
export async function loadContent(): Promise<ContentItem[]> {
  // Check if we're in a server environment and have Supabase configured
  if (typeof window === 'undefined') {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      // Supabase not configured - silently use default content
      return defaultContent;
    }

    const client = getSupabaseClient();
    if (!client) {
      // Client creation failed - silently use default content
      return defaultContent;
    }

    try {
      const { data, error } = await client
        .from('content')
        .select('*')
        .order('published_date', { ascending: false });

      if (error) {
        // Log error details for debugging (only in development)
        // Use console.warn instead of console.error to avoid Next.js overlay noise
        if (process.env.NODE_ENV === 'development') {
          const errorDetails = extractErrorInfo(error);
          console.warn('[Supabase] Error loading content, using fallback:', errorDetails);
        }
        // Silently fall back to default content
        return defaultContent;
      }

      if (data && data.length > 0) {
        return data.map(rowToContentItem);
      }
    } catch (error) {
      // Catch any unexpected errors (network, parsing, etc.)
      // Only log in development to avoid production noise
      if (process.env.NODE_ENV === 'development') {
        const errorInfo = error instanceof Error 
          ? { message: error.message, name: error.name }
          : { error: String(error) };
        console.warn('[Supabase] Unexpected error, using fallback:', errorInfo);
      }
      return defaultContent;
    }
  }

  // Fallback to default content
  return defaultContent;
}

// For client-side usage (synchronous, returns default content)
export function loadContentSync(): ContentItem[] {
  return defaultContent;
}
