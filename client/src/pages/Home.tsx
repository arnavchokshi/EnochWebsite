import { useEffect, useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BlogMarquee } from "@/components/sections/BlogMarquee";
import { Quote } from "@/components/sections/Quote";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { fetchAllContent, type AllContent } from "@/lib/api";

export function Home() {
  const [content, setContent] = useState<AllContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchAllContent();
        setContent(data);
      } catch (err) {
        setError("Failed to load content. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Handle hash links on page load
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      const navbarHeight = 80; // h-20 = 80px
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-secondary font-serif text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || "Something went wrong"}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar contact={content.contact} settings={content.siteSettings} />
      <Hero content={content.hero} contact={content.contact} />
      <PracticeAreas content={content.practiceAreas} />
      <HowItWorks content={content.howItWorks} />
      <BlogMarquee content={content.blog} />
      <Quote content={content.quote} />
      <Contact content={content.contact} />
      <Footer contact={content.contact} settings={content.siteSettings} />
    </div>
  );
}
