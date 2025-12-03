/**
 * Migration Script: Migrate content from JSON file to Supabase
 * 
 * Usage:
 * 1. Set up your .env.local with Supabase credentials
 * 2. Run: npx tsx scripts/migrate-to-supabase.ts
 * 
 * This script will:
 * - Read content from data/content.json (if exists)
 * - Upload all content to Supabase
 * - Skip duplicates (based on slug)
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { getSupabaseClient, contentItemToRow } from '../lib/supabase';
import { ContentItem } from '../types';

async function migrateContent() {
  console.log('🚀 Starting migration to Supabase...\n');

  // Check if Supabase is configured
  const client = getSupabaseClient();
  if (!client) {
    console.error('❌ Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
    process.exit(1);
  }

  // Check if content.json exists
  const contentFile = join(process.cwd(), 'data', 'content.json');
  if (!existsSync(contentFile)) {
    console.log('ℹ️  No content.json file found. Nothing to migrate.');
    console.log('   You can start adding content through the admin panel.');
    process.exit(0);
  }

  // Read existing content
  console.log('📖 Reading content from data/content.json...');
  const fileContent = readFileSync(contentFile, 'utf-8');
  const content: ContentItem[] = JSON.parse(fileContent);

  if (content.length === 0) {
    console.log('ℹ️  No content found in content.json. Nothing to migrate.');
    process.exit(0);
  }

  console.log(`📦 Found ${content.length} content items to migrate\n`);

  // Get existing content from Supabase to avoid duplicates
  console.log('🔍 Checking existing content in Supabase...');
  const { data: existingData } = await client
    .from('content')
    .select('slug');

  const existingSlugs = new Set(existingData?.map(item => item.slug) || []);
  console.log(`   Found ${existingSlugs.size} existing items in Supabase\n`);

  // Migrate content
  let migrated = 0;
  let skipped = 0;
  let errors = 0;

  for (const item of content) {
    try {
      // Skip if already exists
      if (existingSlugs.has(item.slug)) {
        console.log(`⏭️  Skipping "${item.title}" (already exists)`);
        skipped++;
        continue;
      }

      // Convert to database format
      const row = contentItemToRow(item, item.id);

      // Insert into Supabase
      const { error } = await client
        .from('content')
        .insert([row]);

      if (error) {
        console.error(`❌ Error migrating "${item.title}":`, error.message);
        errors++;
      } else {
        console.log(`✅ Migrated "${item.title}"`);
        migrated++;
      }
    } catch (error: any) {
      console.error(`❌ Error migrating "${item.title}":`, error.message);
      errors++;
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`   ✅ Migrated: ${migrated}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log('\n✨ Migration complete!');
}

// Run migration
migrateContent().catch(console.error);


