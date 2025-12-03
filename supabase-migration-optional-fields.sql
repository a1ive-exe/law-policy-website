-- Migration SQL: Make all fields optional (except id and slug)
-- Run this in your Supabase SQL Editor if you already have the content table

-- Make title optional
ALTER TABLE content ALTER COLUMN title DROP NOT NULL;

-- Make author_name optional (keep default)
ALTER TABLE content ALTER COLUMN author_name DROP NOT NULL;

-- Make published_date optional
ALTER TABLE content ALTER COLUMN published_date DROP NOT NULL;

-- Make content optional
ALTER TABLE content ALTER COLUMN content DROP NOT NULL;

-- Make excerpt optional
ALTER TABLE content ALTER COLUMN excerpt DROP NOT NULL;

-- Note: slug must remain NOT NULL as it's used for routing
-- We auto-generate slugs if not provided, so this is safe


