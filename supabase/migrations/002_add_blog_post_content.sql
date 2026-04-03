-- Add content column to blog_posts table for full blog post content
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content TEXT NOT NULL DEFAULT '';

-- Add a comment to explain the column
COMMENT ON COLUMN blog_posts.content IS 'Full HTML/rich text content of the blog post displayed on the detailed page';
