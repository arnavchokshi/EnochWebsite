// Local content API (Supabase-free)
// Persists editable sections in localStorage for admin usage.

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
  content: string;
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

const STORAGE_KEY = "enoch-website-content";

const DEFAULT_CONTENT: AllContent = {
  hero: {
    heading: "Powerful Legal Advocacy",
    subheading: "Trusted Representation Across Georgia",
    tagline:
      "Focused counsel for business law, personal injury, and estate planning with a client-first approach.",
    ctaText: "Schedule Free Consultation",
    ctaLink: "#contact",
  },
  practiceAreas: {
    sectionTitle: "Practice Areas",
    sectionDescription: "Legal services tailored to your needs.",
    areas: [
      {
        id: "business-law",
        title: "Business Law",
        description: "Strategic counsel for contracts, disputes, and ongoing business risk management.",
        icon: "briefcase",
        link: "/practice/business-law",
      },
      {
        id: "personal-injury",
        title: "Personal Injury",
        description: "Aggressive representation to pursue the compensation you deserve after an injury.",
        icon: "shield",
        link: "/practice/personal-injury",
      },
      {
        id: "estate-planning",
        title: "Estate Planning",
        description: "Protect your family and legacy with clear, thoughtful estate planning strategies.",
        icon: "file-text",
        link: "/practice/estate-planning",
      },
    ],
  },
  howItWorks: {
    sectionTitle: "Simple. Strategic. Results-Driven.",
    sectionDescription:
      "A clear legal process built around communication, preparation, and execution.",
    steps: [
      {
        id: "step-1",
        title: "Consultation",
        description: "Share your situation and goals in a confidential initial consultation.",
        icon: "send",
      },
      {
        id: "step-2",
        title: "Case Strategy",
        description: "We analyze the facts and craft a legal strategy specific to your case.",
        icon: "search",
      },
      {
        id: "step-3",
        title: "Representation",
        description: "We advocate for your best outcome through negotiation or litigation.",
        icon: "gavel",
      },
    ],
  },
  team: {
    sectionTitle: "Our Team",
    sectionDescription: "Experienced legal professionals dedicated to your case.",
    members: [
      {
        id: "enoch-hicks",
        name: "Enoch P. Hicks",
        role: "Georgia Lawyer",
        bio: "Attorney focused on practical legal strategy and strong client representation.",
        image: "",
      },
    ],
  },
  contact: {
    phone: "678-977-8297",
    email: "eph@ephfirm.com",
    address: {
      street: "279 Washington Avenue",
      city: "Marietta",
      state: "GA",
      zip: "30060",
    },
    hours: {
      weekdays: "9:00 AM - 5:00 PM",
      saturday: "By Appointment",
      sunday: "Closed",
    },
    serviceAreas: ["Cobb County", "Marietta", "Atlanta Metro", "Statewide Georgia"],
    social: {
      facebook: "",
      linkedin: "",
      twitter: "",
    },
  },
  blog: {
    sectionTitle: "Latest Legal Insights",
    sectionDescription: "Helpful legal guidance, case insights, and practical tips.",
    posts: [
      {
        id: "1",
        title: "Pet Trust Lawyer in Georgia",
        category: "Estate Planning",
        excerpt: "How pet trusts help protect companion animals when life changes unexpectedly.",
        date: "2025-03-04",
        image: "",
        link: "/blog/pet-trust-lawyer-georgia",
        content: "",
      },
      {
        id: "2",
        title: "How to Report and Resolve a Car Accident Claim",
        category: "Personal Injury",
        excerpt: "A practical step-by-step guide for handling auto accident insurance claims.",
        date: "2025-03-04",
        image: "",
        link: "/blog/car-accident-claim",
        content: "",
      },
      {
        id: "3",
        title: "What is a Fractional General Counsel?",
        category: "Business Law",
        excerpt: "How growing businesses can access ongoing legal strategy without full-time overhead.",
        date: "2025-03-04",
        image: "",
        link: "/blog/fractional-general-counsel",
        content: "",
      },
    ],
  },
  quote: {
    author: "Enoch P. Hicks",
    quote:
      "My mission is simple: deliver clear counsel, strategic advocacy, and results my clients can trust.",
  },
  siteSettings: {
    siteName: "Law Office of Enoch P. Hicks",
    logo: "",
    favicon: "",
    copyright: "© 2025 Law Office of Enoch P. Hicks. All rights reserved.",
    metaDescription: "Trusted Georgia legal counsel for business law, personal injury, and estate planning.",
  },
};

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function mergeContent(defaults: AllContent, overrides: Partial<AllContent>): AllContent {
  return {
    ...defaults,
    ...overrides,
    hero: { ...defaults.hero, ...(overrides.hero || {}) },
    practiceAreas: {
      ...defaults.practiceAreas,
      ...(overrides.practiceAreas || {}),
      areas: overrides.practiceAreas?.areas || defaults.practiceAreas.areas,
    },
    howItWorks: {
      ...defaults.howItWorks,
      ...(overrides.howItWorks || {}),
      steps: overrides.howItWorks?.steps || defaults.howItWorks.steps,
    },
    team: {
      ...defaults.team,
      ...(overrides.team || {}),
      members: overrides.team?.members || defaults.team.members,
    },
    contact: {
      ...defaults.contact,
      ...(overrides.contact || {}),
      address: { ...defaults.contact.address, ...(overrides.contact?.address || {}) },
      hours: { ...defaults.contact.hours, ...(overrides.contact?.hours || {}) },
      social: { ...defaults.contact.social, ...(overrides.contact?.social || {}) },
      serviceAreas: overrides.contact?.serviceAreas || defaults.contact.serviceAreas,
    },
    blog: {
      ...defaults.blog,
      ...(overrides.blog || {}),
      posts: overrides.blog?.posts || defaults.blog.posts,
    },
    quote: { ...defaults.quote, ...(overrides.quote || {}) },
    siteSettings: { ...defaults.siteSettings, ...(overrides.siteSettings || {}) },
  };
}

function readContentFromStorage(): AllContent {
  if (!isBrowser()) {
    return deepClone(DEFAULT_CONTENT);
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return deepClone(DEFAULT_CONTENT);
    }
    const parsed = JSON.parse(raw) as Partial<AllContent>;
    return mergeContent(deepClone(DEFAULT_CONTENT), parsed);
  } catch (error) {
    console.error("Failed to read local content cache:", error);
    return deepClone(DEFAULT_CONTENT);
  }
}

function writeContentToStorage(content: AllContent): void {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (error) {
    console.error("Failed to save local content cache:", error);
  }
}

export async function fetchAllContent(): Promise<AllContent> {
  return readContentFromStorage();
}

export async function fetchSection<T>(section: string): Promise<T> {
  const content = readContentFromStorage();
  switch (section) {
    case "hero":
      return content.hero as T;
    case "practiceAreas":
      return content.practiceAreas as T;
    case "howItWorks":
      return content.howItWorks as T;
    case "team":
      return content.team as T;
    case "contact":
      return content.contact as T;
    case "blog":
      return content.blog as T;
    case "quote":
      return content.quote as T;
    case "siteSettings":
      return content.siteSettings as T;
    default:
      throw new Error(`Unknown section: ${section}`);
  }
}

export async function updateSection(section: string, data: unknown, _token?: string): Promise<void> {
  const content = readContentFromStorage();

  switch (section) {
    case "hero":
      content.hero = data as HeroContent;
      break;
    case "practiceAreas":
      content.practiceAreas = data as PracticeAreasContent;
      break;
    case "howItWorks":
      content.howItWorks = data as HowItWorksContent;
      break;
    case "team":
      content.team = data as TeamContent;
      break;
    case "contact":
      content.contact = data as ContactContent;
      break;
    case "blog":
      content.blog = data as BlogContent;
      break;
    case "quote":
      content.quote = data as QuoteContent;
      break;
    case "siteSettings":
      content.siteSettings = data as SiteSettings;
      break;
    default:
      throw new Error(`Unknown section: ${section}`);
  }

  writeContentToStorage(content);
}

export async function uploadImage(_file: File, _token?: string): Promise<{ url: string }> {
  throw new Error("Image upload not yet implemented. Please use image URLs directly.");
}

export async function submitContact(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<void> {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
  const response = await fetch(`${apiUrl}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Failed to submit contact form" }));
    throw new Error(error.error || "Failed to submit contact form");
  }

  await response.json();
}
