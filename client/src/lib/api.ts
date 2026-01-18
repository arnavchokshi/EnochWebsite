const API_URL = 'http://localhost:3001/api';

// Types
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

// API Functions
export async function fetchAllContent(): Promise<AllContent> {
  const response = await fetch(`${API_URL}/content`);
  if (!response.ok) throw new Error('Failed to fetch content');
  return response.json();
}

export async function fetchSection<T>(section: string): Promise<T> {
  const response = await fetch(`${API_URL}/content/${section}`);
  if (!response.ok) throw new Error(`Failed to fetch ${section}`);
  return response.json();
}

export async function login(email: string, password: string): Promise<{ token: string; user: { id: string; email: string; name: string; role: string } }> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }
  return response.json();
}

export async function verifyToken(token: string): Promise<boolean> {
  const response = await fetch(`${API_URL}/auth/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.ok;
}

export async function updateSection(section: string, data: unknown, token: string): Promise<void> {
  const response = await fetch(`${API_URL}/admin/content/${section}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Failed to update ${section}`);
}

export async function uploadImage(file: File, token: string): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch(`${API_URL}/admin/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload image');
  return response.json();
}

export async function submitContact(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<void> {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to submit contact form');
}
