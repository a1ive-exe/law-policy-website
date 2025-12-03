-- Supabase Schema for Comments and Reactions
-- Run this SQL in your Supabase SQL Editor

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  content_id TEXT NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  comment TEXT NOT NULL,
  approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on content_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_comments_content_id ON comments(content_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Create reactions table
CREATE TABLE IF NOT EXISTS reactions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  content_id TEXT NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'heart', 'insightful')),
  user_ip TEXT, -- Store IP to prevent duplicate reactions (optional)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(content_id, user_ip, reaction_type) -- Prevent duplicate reactions from same IP
);

-- Create index on content_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_reactions_content_id ON reactions(content_id);
CREATE INDEX IF NOT EXISTS idx_reactions_type ON reactions(reaction_type);

-- Create function to update updated_at timestamp for comments
CREATE OR REPLACE FUNCTION update_comments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at for comments
CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_comments_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for comments (public read, authenticated write)
CREATE POLICY "Anyone can read approved comments"
  ON comments FOR SELECT
  USING (approved = TRUE);

CREATE POLICY "Anyone can insert comments"
  ON comments FOR INSERT
  WITH CHECK (true);

-- RLS Policies for reactions (public read and write)
CREATE POLICY "Anyone can read reactions"
  ON reactions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert reactions"
  ON reactions FOR INSERT
  WITH CHECK (true);

