-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Hero table (single row)
CREATE TABLE IF NOT EXISTS hero (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  heading TEXT NOT NULL DEFAULT '',
  subheading TEXT NOT NULL DEFAULT '',
  tagline TEXT NOT NULL DEFAULT '',
  cta_text TEXT NOT NULL DEFAULT '',
  cta_link TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog table (single row - metadata only)
CREATE TABLE IF NOT EXISTS blog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_title TEXT NOT NULL DEFAULT '',
  section_description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table (multiple rows)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blog_id UUID REFERENCES blog(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL,
  image TEXT NOT NULL DEFAULT '',
  link TEXT NOT NULL DEFAULT '',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Practice Areas table (single row - metadata only)
CREATE TABLE IF NOT EXISTS practice_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_title TEXT NOT NULL DEFAULT '',
  section_description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Practice Area Items table (multiple rows)
CREATE TABLE IF NOT EXISTS practice_area_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  practice_area_id UUID REFERENCES practice_areas(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '',
  link TEXT NOT NULL DEFAULT '',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- How It Works table (single row - metadata only)
CREATE TABLE IF NOT EXISTS how_it_works (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_title TEXT NOT NULL DEFAULT '',
  section_description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- How It Works Steps table (multiple rows)
CREATE TABLE IF NOT EXISTS how_it_works_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  how_it_works_id UUID REFERENCES how_it_works(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team table (single row - metadata only)
CREATE TABLE IF NOT EXISTS team (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_title TEXT NOT NULL DEFAULT '',
  section_description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members table (multiple rows)
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES team(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact table (single row)
CREATE TABLE IF NOT EXISTS contact (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  address_street TEXT NOT NULL DEFAULT '',
  address_city TEXT NOT NULL DEFAULT '',
  address_state TEXT NOT NULL DEFAULT '',
  address_zip TEXT NOT NULL DEFAULT '',
  hours_weekdays TEXT NOT NULL DEFAULT '',
  hours_saturday TEXT NOT NULL DEFAULT '',
  hours_sunday TEXT NOT NULL DEFAULT '',
  service_areas JSONB NOT NULL DEFAULT '[]'::jsonb,
  social_facebook TEXT NOT NULL DEFAULT '',
  social_linkedin TEXT NOT NULL DEFAULT '',
  social_twitter TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quote table (single row)
CREATE TABLE IF NOT EXISTS quote (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author TEXT NOT NULL DEFAULT '',
  quote TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site Settings table (single row)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT NOT NULL DEFAULT '',
  logo TEXT NOT NULL DEFAULT '',
  favicon TEXT NOT NULL DEFAULT '',
  copyright TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_area_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE how_it_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE how_it_works_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (all tables allow SELECT for everyone)
CREATE POLICY "Public read access" ON hero FOR SELECT USING (true);
CREATE POLICY "Public read access" ON blog FOR SELECT USING (true);
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON practice_areas FOR SELECT USING (true);
CREATE POLICY "Public read access" ON practice_area_items FOR SELECT USING (true);
CREATE POLICY "Public read access" ON how_it_works FOR SELECT USING (true);
CREATE POLICY "Public read access" ON how_it_works_steps FOR SELECT USING (true);
CREATE POLICY "Public read access" ON team FOR SELECT USING (true);
CREATE POLICY "Public read access" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read access" ON contact FOR SELECT USING (true);
CREATE POLICY "Public read access" ON quote FOR SELECT USING (true);
CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (true);

-- Create policies for authenticated write access (INSERT/UPDATE/DELETE require authentication)
CREATE POLICY "Authenticated write access" ON hero FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON blog FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON practice_areas FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON practice_area_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON how_it_works FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON how_it_works_steps FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON team FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON contact FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON quote FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
