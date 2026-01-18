import { supabase } from './supabase';

// Database row types
interface BlogRow {
  id: string;
  section_title: string;
  section_description: string;
}

interface PracticeAreasRow {
  id: string;
  section_title: string;
  section_description: string;
}

interface HowItWorksRow {
  id: string;
  section_title: string;
  section_description: string;
}

interface TeamRow {
  id: string;
  section_title: string;
  section_description: string;
}

// Types (kept the same for component compatibility)
export interface HeroContent {
  heading: string;
  subheading: string;
  tagline: string;
  ctaText: string;
  ctaLink: string;
}

export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface PracticeAreasContent {
  sectionTitle: string;
  sectionDescription: string;
  areas: PracticeArea[];
}

export interface Step {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HowItWorksContent {
  sectionTitle: string;
  sectionDescription: string;
  steps: Step[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface TeamContent {
  sectionTitle: string;
  sectionDescription: string;
  members: TeamMember[];
}

export interface ContactContent {
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  serviceAreas: string[];
  social: {
    facebook: string;
    linkedin: string;
    twitter: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  image: string;
  link: string;
}

export interface BlogContent {
  sectionTitle: string;
  sectionDescription: string;
  posts: BlogPost[];
}

export interface QuoteContent {
  author: string;
  quote: string;
}

export interface SiteSettings {
  siteName: string;
  logo: string;
  favicon: string;
  copyright: string;
  metaDescription: string;
}

export interface AllContent {
  hero: HeroContent;
  practiceAreas: PracticeAreasContent;
  howItWorks: HowItWorksContent;
  team: TeamContent;
  contact: ContactContent;
  blog: BlogContent;
  quote: QuoteContent;
  siteSettings: SiteSettings;
}

// Helper function to get single row from a table
async function getSingleRow<T>(table: string): Promise<T | null> {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .limit(1)
    .single();
  
  if (error) {
    console.error(`Error fetching ${table}:`, error);
    return null;
  }
  
  return data as T;
}

// Helper function to transform database row to API format
function transformHeroRow(row: any): HeroContent {
  return {
    heading: row.heading || '',
    subheading: row.subheading || '',
    tagline: row.tagline || '',
    ctaText: row.cta_text || '',
    ctaLink: row.cta_link || '',
  };
}

function transformContactRow(row: any): ContactContent {
  return {
    phone: row.phone || '',
    email: row.email || '',
    address: {
      street: row.address_street || '',
      city: row.address_city || '',
      state: row.address_state || '',
      zip: row.address_zip || '',
    },
    hours: {
      weekdays: row.hours_weekdays || '',
      saturday: row.hours_saturday || '',
      sunday: row.hours_sunday || '',
    },
    serviceAreas: Array.isArray(row.service_areas) ? row.service_areas : [],
    social: {
      facebook: row.social_facebook || '',
      linkedin: row.social_linkedin || '',
      twitter: row.social_twitter || '',
    },
  };
}

function transformQuoteRow(row: any): QuoteContent {
  return {
    author: row.author || '',
    quote: row.quote || '',
  };
}

function transformSiteSettingsRow(row: any): SiteSettings {
  return {
    siteName: row.site_name || '',
    logo: row.logo || '',
    favicon: row.favicon || '',
    copyright: row.copyright || '',
    metaDescription: row.meta_description || '',
  };
}

// API Functions
export async function fetchAllContent(): Promise<AllContent> {
  try {
    // Fetch all single-row tables
    const [heroRow, blogRow, quoteRow, contactRow, practiceAreasRow, howItWorksRow, teamRow, siteSettingsRow] = await Promise.all([
      getSingleRow('hero'),
      getSingleRow<BlogRow>('blog'),
      getSingleRow('quote'),
      getSingleRow('contact'),
      getSingleRow<PracticeAreasRow>('practice_areas'),
      getSingleRow<HowItWorksRow>('how_it_works'),
      getSingleRow<TeamRow>('team'),
      getSingleRow('site_settings'),
    ]);

    // Fetch collections
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('*')
      .order('order_index', { ascending: true });

    const { data: practiceAreaItems } = await supabase
      .from('practice_area_items')
      .select('*')
      .order('order_index', { ascending: true });

    const { data: howItWorksSteps } = await supabase
      .from('how_it_works_steps')
      .select('*')
      .order('order_index', { ascending: true });

    const { data: teamMembers } = await supabase
      .from('team_members')
      .select('*')
      .order('order_index', { ascending: true });

    // Transform to API format
    const hero = heroRow ? transformHeroRow(heroRow) : {
      heading: '',
      subheading: '',
      tagline: '',
      ctaText: '',
      ctaLink: '',
    };

    const blog: BlogContent = {
      sectionTitle: (blogRow as BlogRow | null)?.section_title || '',
      sectionDescription: (blogRow as BlogRow | null)?.section_description || '',
      posts: (blogPosts || []).map((post: any) => ({
        id: post.id,
        title: post.title || '',
        category: post.category || '',
        excerpt: post.excerpt || '',
        date: post.date || '',
        image: post.image || '',
        link: post.link || '',
      })),
    };

    const practiceAreas: PracticeAreasContent = {
      sectionTitle: (practiceAreasRow as PracticeAreasRow | null)?.section_title || '',
      sectionDescription: (practiceAreasRow as PracticeAreasRow | null)?.section_description || '',
      areas: (practiceAreaItems || []).map((item: any) => ({
        id: item.id,
        title: item.title || '',
        description: item.description || '',
        icon: item.icon || '',
        link: item.link || '',
      })),
    };

    const howItWorks: HowItWorksContent = {
      sectionTitle: (howItWorksRow as HowItWorksRow | null)?.section_title || '',
      sectionDescription: (howItWorksRow as HowItWorksRow | null)?.section_description || '',
      steps: (howItWorksSteps || []).map((step: any) => ({
        id: step.id,
        title: step.title || '',
        description: step.description || '',
        icon: step.icon || '',
      })),
    };

    const team: TeamContent = {
      sectionTitle: (teamRow as TeamRow | null)?.section_title || '',
      sectionDescription: (teamRow as TeamRow | null)?.section_description || '',
      members: (teamMembers || []).map((member: any) => ({
        id: member.id,
        name: member.name || '',
        role: member.role || '',
        bio: member.bio || '',
        image: member.image || '',
      })),
    };

    const contact = contactRow ? transformContactRow(contactRow) : {
      phone: '',
      email: '',
      address: { street: '', city: '', state: '', zip: '' },
      hours: { weekdays: '', saturday: '', sunday: '' },
      serviceAreas: [],
      social: { facebook: '', linkedin: '', twitter: '' },
    };

    const quote = quoteRow ? transformQuoteRow(quoteRow) : {
      author: '',
      quote: '',
    };

    const siteSettings = siteSettingsRow ? transformSiteSettingsRow(siteSettingsRow) : {
      siteName: '',
      logo: '',
      favicon: '',
      copyright: '',
      metaDescription: '',
    };

    return {
      hero,
      practiceAreas,
      howItWorks,
      team,
      contact,
      blog,
      quote,
      siteSettings,
    };
  } catch (error) {
    console.error('Error fetching all content:', error);
    throw new Error('Failed to fetch content');
  }
}

export async function fetchSection<T>(section: string): Promise<T> {
  try {
    switch (section) {
      case 'hero': {
        const row = await getSingleRow('hero');
        return (row ? transformHeroRow(row) : null) as T;
      }
      case 'blog': {
        const blogRow = await getSingleRow<BlogRow>('blog');
        const { data: blogPosts } = await supabase
          .from('blog_posts')
          .select('*')
          .order('order_index', { ascending: true });
        
        return {
          sectionTitle: blogRow?.section_title || '',
          sectionDescription: blogRow?.section_description || '',
          posts: (blogPosts || []).map((post: any) => ({
            id: post.id,
            title: post.title || '',
            category: post.category || '',
            excerpt: post.excerpt || '',
            date: post.date || '',
            image: post.image || '',
            link: post.link || '',
          })),
        } as T;
      }
      case 'practiceAreas': {
        const practiceAreasRow = await getSingleRow<PracticeAreasRow>('practice_areas');
        const { data: items } = await supabase
          .from('practice_area_items')
          .select('*')
          .order('order_index', { ascending: true });
        
        return {
          sectionTitle: practiceAreasRow?.section_title || '',
          sectionDescription: practiceAreasRow?.section_description || '',
          areas: (items || []).map((item: any) => ({
            id: item.id,
            title: item.title || '',
            description: item.description || '',
            icon: item.icon || '',
            link: item.link || '',
          })),
        } as T;
      }
      case 'howItWorks': {
        const howItWorksRow = await getSingleRow<HowItWorksRow>('how_it_works');
        const { data: steps } = await supabase
          .from('how_it_works_steps')
          .select('*')
          .order('order_index', { ascending: true });
        
        return {
          sectionTitle: howItWorksRow?.section_title || '',
          sectionDescription: howItWorksRow?.section_description || '',
          steps: (steps || []).map((step: any) => ({
            id: step.id,
            title: step.title || '',
            description: step.description || '',
            icon: step.icon || '',
          })),
        } as T;
      }
      case 'team': {
        const teamRow = await getSingleRow<TeamRow>('team');
        const { data: members } = await supabase
          .from('team_members')
          .select('*')
          .order('order_index', { ascending: true });
        
        return {
          sectionTitle: teamRow?.section_title || '',
          sectionDescription: teamRow?.section_description || '',
          members: (members || []).map((member: any) => ({
            id: member.id,
            name: member.name || '',
            role: member.role || '',
            bio: member.bio || '',
            image: member.image || '',
          })),
        } as T;
      }
      case 'contact': {
        const row = await getSingleRow('contact');
        return (row ? transformContactRow(row) : null) as T;
      }
      case 'quote': {
        const row = await getSingleRow('quote');
        return (row ? transformQuoteRow(row) : null) as T;
      }
      case 'siteSettings': {
        const row = await getSingleRow('site_settings');
        return (row ? transformSiteSettingsRow(row) : null) as T;
      }
      default:
        throw new Error(`Unknown section: ${section}`);
    }
  } catch (error) {
    console.error(`Error fetching ${section}:`, error);
    throw new Error(`Failed to fetch ${section}`);
  }
}

export async function updateSection(section: string, data: unknown, _token?: string): Promise<void> {
  // Token is not needed as Supabase client handles auth automatically via session
  try {
    switch (section) {
      case 'hero': {
        const heroData = data as HeroContent;
        // Get existing row or create
        const existing = await getSingleRow('hero');
        const updateData = {
          heading: heroData.heading,
          subheading: heroData.subheading,
          tagline: heroData.tagline,
          cta_text: heroData.ctaText,
          cta_link: heroData.ctaLink,
          updated_at: new Date().toISOString(),
        };

        if (existing) {
          const { error } = await supabase
            .from('hero')
            .update(updateData)
            .eq('id', (existing as { id: string }).id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('hero').insert(updateData);
          if (error) throw error;
        }
        break;
      }
      case 'blog': {
        const blogData = data as BlogContent;
        // Update blog metadata
        const existing = await getSingleRow('blog');
        const blogMetadata = {
          section_title: blogData.sectionTitle,
          section_description: blogData.sectionDescription,
          updated_at: new Date().toISOString(),
        };

        if (existing) {
          await supabase.from('blog').update(blogMetadata).eq('id', (existing as BlogRow).id);
        } else {
          const { data: newBlog } = await supabase.from('blog').insert(blogMetadata).select().single();
          const blogId = newBlog?.id;
          if (!blogId) throw new Error('Failed to create blog');

          // Insert all posts
          for (let i = 0; i < blogData.posts.length; i++) {
            const post = blogData.posts[i];
            await supabase.from('blog_posts').insert({
              blog_id: blogId,
              title: post.title,
              category: post.category,
              excerpt: post.excerpt,
              date: post.date,
              image: post.image,
              link: post.link,
              order_index: i,
            });
          }
          break;
        }

        // Get blog_id for posts
        const blogRow = await getSingleRow<BlogRow>('blog');
        if (!blogRow) throw new Error('Blog not found');

        // Delete existing posts
        await supabase.from('blog_posts').delete().eq('blog_id', blogRow.id);

        // Insert new posts
        for (let i = 0; i < blogData.posts.length; i++) {
          const post = blogData.posts[i];
          await supabase.from('blog_posts').insert({
            blog_id: blogRow.id,
            title: post.title,
            category: post.category,
            excerpt: post.excerpt,
            date: post.date,
            image: post.image,
            link: post.link,
            order_index: i,
          });
        }
        break;
      }
      case 'practiceAreas': {
        const practiceAreasData = data as PracticeAreasContent;
        const existing = await getSingleRow('practice_areas');
        const metadata = {
          section_title: practiceAreasData.sectionTitle,
          section_description: practiceAreasData.sectionDescription,
          updated_at: new Date().toISOString(),
        };

        let practiceAreaId: string;
        if (existing) {
          practiceAreaId = (existing as any).id;
          await supabase.from('practice_areas').update(metadata).eq('id', practiceAreaId);
        } else {
          const { data: newRow } = await supabase.from('practice_areas').insert(metadata).select().single();
          practiceAreaId = (newRow as any).id;
        }

        // Delete existing items
        await supabase.from('practice_area_items').delete().eq('practice_area_id', practiceAreaId);

        // Insert new items
        for (let i = 0; i < practiceAreasData.areas.length; i++) {
          const area = practiceAreasData.areas[i];
          await supabase.from('practice_area_items').insert({
            practice_area_id: practiceAreaId,
            title: area.title,
            description: area.description,
            icon: area.icon,
            link: area.link,
            order_index: i,
          });
        }
        break;
      }
      case 'howItWorks': {
        const howItWorksData = data as HowItWorksContent;
        const existing = await getSingleRow('how_it_works');
        const metadata = {
          section_title: howItWorksData.sectionTitle,
          section_description: howItWorksData.sectionDescription,
          updated_at: new Date().toISOString(),
        };

        let howItWorksId: string;
        if (existing) {
          howItWorksId = (existing as any).id;
          await supabase.from('how_it_works').update(metadata).eq('id', howItWorksId);
        } else {
          const { data: newRow } = await supabase.from('how_it_works').insert(metadata).select().single();
          howItWorksId = (newRow as any).id;
        }

        // Delete existing steps
        await supabase.from('how_it_works_steps').delete().eq('how_it_works_id', howItWorksId);

        // Insert new steps
        for (let i = 0; i < howItWorksData.steps.length; i++) {
          const step = howItWorksData.steps[i];
          await supabase.from('how_it_works_steps').insert({
            how_it_works_id: howItWorksId,
            title: step.title,
            description: step.description,
            icon: step.icon,
            order_index: i,
          });
        }
        break;
      }
      case 'team': {
        const teamData = data as TeamContent;
        const existing = await getSingleRow('team');
        const metadata = {
          section_title: teamData.sectionTitle,
          section_description: teamData.sectionDescription,
          updated_at: new Date().toISOString(),
        };

        let teamId: string;
        if (existing) {
          teamId = (existing as any).id;
          await supabase.from('team').update(metadata).eq('id', teamId);
        } else {
          const { data: newRow } = await supabase.from('team').insert(metadata).select().single();
          teamId = (newRow as any).id;
        }

        // Delete existing members
        await supabase.from('team_members').delete().eq('team_id', teamId);

        // Insert new members
        for (let i = 0; i < teamData.members.length; i++) {
          const member = teamData.members[i];
          await supabase.from('team_members').insert({
            team_id: teamId,
            name: member.name,
            role: member.role,
            bio: member.bio,
            image: member.image,
            order_index: i,
          });
        }
        break;
      }
      case 'contact': {
        const contactData = data as ContactContent;
        const existing = await getSingleRow('contact');
        const updateData = {
          phone: contactData.phone,
          email: contactData.email,
          address_street: contactData.address.street,
          address_city: contactData.address.city,
          address_state: contactData.address.state,
          address_zip: contactData.address.zip,
          hours_weekdays: contactData.hours.weekdays,
          hours_saturday: contactData.hours.saturday,
          hours_sunday: contactData.hours.sunday,
          service_areas: contactData.serviceAreas,
          social_facebook: contactData.social.facebook,
          social_linkedin: contactData.social.linkedin,
          social_twitter: contactData.social.twitter,
          updated_at: new Date().toISOString(),
        };

        if (existing) {
          const { error } = await supabase.from('contact').update(updateData).eq('id', (existing as any).id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('contact').insert(updateData);
          if (error) throw error;
        }
        break;
      }
      case 'quote': {
        const quoteData = data as QuoteContent;
        const existing = await getSingleRow('quote');
        const updateData = {
          author: quoteData.author,
          quote: quoteData.quote,
          updated_at: new Date().toISOString(),
        };

        if (existing) {
          const { error } = await supabase.from('quote').update(updateData).eq('id', (existing as any).id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('quote').insert(updateData);
          if (error) throw error;
        }
        break;
      }
      case 'siteSettings': {
        const settingsData = data as SiteSettings;
        const existing = await getSingleRow('site_settings');
        const updateData = {
          site_name: settingsData.siteName,
          logo: settingsData.logo,
          favicon: settingsData.favicon,
          copyright: settingsData.copyright,
          meta_description: settingsData.metaDescription,
          updated_at: new Date().toISOString(),
        };

        if (existing) {
          const { error } = await supabase.from('site_settings').update(updateData).eq('id', (existing as any).id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('site_settings').insert(updateData);
          if (error) throw error;
        }
        break;
      }
      default:
        throw new Error(`Unknown section: ${section}`);
    }
  } catch (error) {
    console.error(`Error updating ${section}:`, error);
    throw new Error(`Failed to update ${section}`);
  }
}

// Note: Image upload would need Supabase Storage integration
// For now, this is a placeholder - images should be uploaded via Supabase Storage
export async function uploadImage(_file: File, _token?: string): Promise<{ url: string }> {
  // TODO: Implement Supabase Storage upload
  throw new Error('Image upload not yet implemented with Supabase Storage');
}

// Contact form submission
export async function submitContact(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<void> {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const response = await fetch(`${apiUrl}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to submit contact form' }));
    throw new Error(error.error || 'Failed to submit contact form');
  }

  return response.json();
}
