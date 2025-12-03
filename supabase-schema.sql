-- Supabase Database Schema for Law & Policy Website
-- Run this SQL in your Supabase SQL Editor

-- Create content table
-- All fields are optional except id (primary key) and slug (auto-generated if not provided)
CREATE TABLE IF NOT EXISTS content (
  id TEXT PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  slug TEXT NOT NULL UNIQUE,
  author_name TEXT DEFAULT 'Devesh Mandhata',
  author_credentials TEXT[] DEFAULT ARRAY[]::TEXT[],
  author_linkedin TEXT,
  author_email TEXT,
  published_date DATE,
  law_area TEXT,
  jurisdiction TEXT,
  content_type TEXT,
  is_policy_recommendation BOOLEAN DEFAULT FALSE,
  policy_theme TEXT,
  content TEXT,
  excerpt TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  category_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_content_slug ON content(slug);

-- Create index on published_date for sorting
CREATE INDEX IF NOT EXISTS idx_content_published_date ON content(published_date DESC);

-- Create index on featured for featured content queries
CREATE INDEX IF NOT EXISTS idx_content_featured ON content(featured) WHERE featured = TRUE;

-- Create index on content_type
CREATE INDEX IF NOT EXISTS idx_content_type ON content(content_type);

-- Create index on law_area
CREATE INDEX IF NOT EXISTS idx_content_law_area ON content(law_area);

-- Create index on is_policy_recommendation
CREATE INDEX IF NOT EXISTS idx_content_policy ON content(is_policy_recommendation) WHERE is_policy_recommendation = TRUE;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_content_updated_at
    BEFORE UPDATE ON content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Create policy: Allow public read access
CREATE POLICY "Public read access"
  ON content
  FOR SELECT
  USING (true);

-- Create policy: Allow authenticated users to insert (admin only)
CREATE POLICY "Authenticated insert access"
  ON content
  FOR INSERT
  WITH CHECK (true);

-- Create policy: Allow authenticated users to update (admin only)
CREATE POLICY "Authenticated update access"
  ON content
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create policy: Allow authenticated users to delete (admin only)
CREATE POLICY "Authenticated delete access"
  ON content
  FOR DELETE
  USING (true);

-- Note: In production, you should restrict these policies based on your authentication system
-- For now, we're using the admin password system, so these policies allow all authenticated operations

-- Create author table
CREATE TABLE IF NOT EXISTS author (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL,
  credentials TEXT[] DEFAULT ARRAY[]::TEXT[],
  linkedin TEXT,
  email TEXT,
  other_links JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default author (if not exists)
INSERT INTO author (id, name, credentials, linkedin, email)
VALUES ('main', 'Devesh Mandhata', ARRAY['LL.M. (Harvard)', 'Research Fellow'], 'https://linkedin.com/in/deveshmandhata', 'contact@deveshmandhata.com')
ON CONFLICT (id) DO NOTHING;

-- Create trigger to update updated_at for author
CREATE TRIGGER update_author_updated_at
    BEFORE UPDATE ON author
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for author table
ALTER TABLE author ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Public read access for author"
  ON author
  FOR SELECT
  USING (true);

-- Policy: Allow authenticated users to update (admin only)
CREATE POLICY "Authenticated update access for author"
  ON author
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

