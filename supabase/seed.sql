-- Seed script to populate initial data from JSON files
-- Run this after running the migration script

-- Insert Hero data
INSERT INTO hero (heading, subheading, tagline, cta_text, cta_link) VALUES
  ('Schedule a Consultation', 'Attorney Enoch P. Hicks', 'Simplifying the complexities of the legal system.', 'Get Started', '#contact')
ON CONFLICT DO NOTHING;

-- Insert Blog metadata
INSERT INTO blog (section_title, section_description) VALUES
  ('A Case Like Yours', 'Explore our latest articles and case studies.')
ON CONFLICT DO NOTHING;

-- Insert Blog Posts (assuming blog row exists)
DO $$
DECLARE
  blog_id_val UUID;
BEGIN
  SELECT id INTO blog_id_val FROM blog LIMIT 1;
  
  INSERT INTO blog_posts (blog_id, title, category, excerpt, date, image, link, order_index) VALUES
    (blog_id_val, 'Pet Trust Lawyer in Georgia', 'Estate Planning', 'Learn how to protect your beloved pets with a pet trust in Georgia.', '2025-01-10', '/images/blog/pet-trust.jpg', '/blog/pet-trust-lawyer-georgia', 0),
    (blog_id_val, 'How to Report and Resolve a Car Accident Claim', 'Personal Injury', 'Step-by-step guide to handling your car accident claim effectively.', '2025-01-05', '/images/blog/car-accident.jpg', '/blog/car-accident-claim', 1),
    (blog_id_val, 'What is a Fractional General Counsel?', 'Business Law', 'Discover how fractional general counsel services can benefit your business.', '2024-12-28', '/images/blog/fractional-counsel.jpg', '/blog/fractional-general-counsel', 2)
  ON CONFLICT DO NOTHING;
END $$;

-- Insert Practice Areas metadata
INSERT INTO practice_areas (section_title, section_description) VALUES
  ('Areas of Practice', 'Comprehensive legal services tailored to protect your interests and secure your future.')
ON CONFLICT DO NOTHING;

-- Insert Practice Area Items
DO $$
DECLARE
  practice_area_id_val UUID;
BEGIN
  SELECT id INTO practice_area_id_val FROM practice_areas LIMIT 1;
  
  INSERT INTO practice_area_items (practice_area_id, title, description, icon, link, order_index) VALUES
    (practice_area_id_val, 'Business Law & Litigation', 'Contract review and litigation representation to protect your business interests.', 'briefcase', '/practice/business-law', 0),
    (practice_area_id_val, 'Personal Injury', 'Aggressive representation to secure the compensation you deserve after an injury.', 'shield', '/practice/personal-injury', 1),
    (practice_area_id_val, 'Estate Planning & Probate', 'Wills, trusts, and probate services to protect your assets and loved ones.', 'file-text', '/practice/estate-planning', 2)
  ON CONFLICT DO NOTHING;
END $$;

-- Insert How It Works metadata
INSERT INTO how_it_works (section_title, section_description) VALUES
  ('How It Works', 'Our simple three-step process to get the legal help you need.')
ON CONFLICT DO NOTHING;

-- Insert How It Works Steps
DO $$
DECLARE
  how_it_works_id_val UUID;
BEGIN
  SELECT id INTO how_it_works_id_val FROM how_it_works LIMIT 1;
  
  INSERT INTO how_it_works_steps (how_it_works_id, title, description, icon, order_index) VALUES
    (how_it_works_id_val, 'Send Your Request', 'Reach out to us with details about your case. We''ll review your situation and schedule a free consultation.', 'send', 0),
    (how_it_works_id_val, 'Investigation', 'We will thoroughly investigate your case, gather evidence, and build a strong strategy for your legal matter.', 'search', 1),
    (how_it_works_id_val, 'Case Fight', 'We will fight your case in court, negotiating on your behalf to secure the best possible outcome.', 'gavel', 2)
  ON CONFLICT DO NOTHING;
END $$;

-- Insert Team metadata
INSERT INTO team (section_title, section_description) VALUES
  ('Our Expert Team', 'Meet the dedicated legal professionals ready to serve you.')
ON CONFLICT DO NOTHING;

-- Insert Team Members
DO $$
DECLARE
  team_id_val UUID;
BEGIN
  SELECT id INTO team_id_val FROM team LIMIT 1;
  
  INSERT INTO team_members (team_id, name, role, bio, image, order_index) VALUES
    (team_id_val, 'Enoch P. Hicks', 'Attorney at Law', 'Attorney Enoch P. Hicks is a lawyer based in Marietta, Georgia. He serves the business, estate planning, and personal injury law needs of clients throughout Cobb County.', '/images/team/enoch.jpg', 0)
  ON CONFLICT DO NOTHING;
END $$;

-- Insert Contact data
INSERT INTO contact (
  phone, email, 
  address_street, address_city, address_state, address_zip,
  hours_weekdays, hours_saturday, hours_sunday,
  service_areas, social_facebook, social_linkedin, social_twitter
) VALUES (
  '(678) 977-8297',
  'eph@ephfirm.com',
  '279 Washington Avenue',
  'Marietta',
  'GA',
  '30060',
  '9:00 am to 5:00 pm',
  'By Appointment Only',
  'By Appointment Only',
  '["Marietta", "Smyrna", "Mableton", "Acworth", "Kennesaw", "Powder Springs"]'::jsonb,
  'https://facebook.com/ephfirm',
  'https://linkedin.com/in/ephfirm',
  'https://twitter.com/ephfirm'
)
ON CONFLICT DO NOTHING;

-- Insert Quote data
INSERT INTO quote (author, quote) VALUES
  ('Enoch P. Hicks', 'I strive to simplify the complexities of the legal process, so my clients feel empowered and informed every step of the way.')
ON CONFLICT DO NOTHING;

-- Insert Site Settings
INSERT INTO site_settings (site_name, logo, favicon, copyright, meta_description) VALUES
  ('Law Office of Enoch P. Hicks', '/images/logo.png', '/images/favicon.ico', 'Copyright 2025 The Law Office of Enoch P. Hicks', 'Law Office of Enoch P. Hicks - Serving Marietta, Georgia and Cobb County with Business Law, Personal Injury, and Estate Planning services.')
ON CONFLICT DO NOTHING;
