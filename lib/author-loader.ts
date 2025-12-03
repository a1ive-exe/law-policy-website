import { Author } from '@/types';
import { author as defaultAuthor } from '@/data/content';
import { getSupabaseClient } from './supabase';

// Load author information from database or fallback to default
export async function loadAuthor(): Promise<Author> {
  if (typeof window !== 'undefined') {
    // Client-side: fetch from API
    try {
      const response = await fetch('/api/author');
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching author:', error);
    }
    return defaultAuthor;
  }

  // Server-side: fetch from Supabase
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('author')
        .select('*')
        .eq('id', 'main')
        .single();

      if (!error && data) {
        return {
          id: data.id,
          name: data.name || defaultAuthor.name || 'Devesh Mandhata',
          credentials: data.credentials || defaultAuthor.credentials || [],
          linkedin: data.linkedin || defaultAuthor.linkedin,
          email: data.email || defaultAuthor.email,
          otherLinks: data.other_links || defaultAuthor.otherLinks || [],
        };
      }
    } catch (error) {
      console.error('Error loading author from Supabase:', error);
    }
  }

  return defaultAuthor;
}

