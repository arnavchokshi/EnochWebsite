import { useEffect, useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Briefcase, Scale, FileText, Users, Phone, Mail, MapPin, Calendar, Shield } from "lucide-react";
import { fetchAllContent, type AllContent } from "@/lib/api";
import { Link } from "react-router-dom";
import BusinessLawBg from "@/assets/scott-graham-OQMZwNd3ThU-unsplash.jpg";

export function BusinessLaw() {
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
      
      {/* Hero Section */}
      <section 
        className="py-20 md:py-32 relative overflow-hidden"
        style={{
          backgroundImage: `url(${BusinessLawBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <BlurFade delay={0.1} inView>
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                <Briefcase className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
                Business Law
              </h1>
              <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
              <p className="text-xl sm:text-2xl md:text-3xl font-serif text-white/90 mb-4 drop-shadow-md">
                Georgia Business Law Attorney – Protecting Your Business & Your Future
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Introduction & Other Practice Areas */}
      <section className="py-8 md:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="md:col-span-2">
                  <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                    Running a business requires careful legal planning. We provide legal solutions tailored to Georgia business owners, entrepreneurs, and corporate executives.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm uppercase tracking-widest font-bold text-primary mb-4">Other Practice Areas</h3>
                  <Link to="/practice/personal-injury" className="block bg-slate-50 p-4 border border-gray-100 hover:border-primary transition-colors">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="font-bold text-secondary">Personal Injury</span>
                    </div>
                  </Link>
                  <Link to="/practice/estate-planning" className="block bg-slate-50 p-4 border border-gray-100 hover:border-primary transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="font-bold text-secondary">Estate Planning</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-secondary mb-8 text-center">
                Our Services
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Business Formation</h3>
                  <p className="text-sm text-gray-600">LLC, corporation, or partnership setup with compliance guidance.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Contracts & Agreements</h3>
                  <p className="text-sm text-gray-600">Drafting, reviewing, and negotiating business contracts.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Mergers & Acquisitions</h3>
                  <p className="text-sm text-gray-600">Strategic planning and due diligence for business transactions.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Corporate Governance</h3>
                  <p className="text-sm text-gray-600">Board policies, compliance, and shareholder management.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Succession Planning</h3>
                  <p className="text-sm text-gray-600">Buy-sell agreements and leadership transition planning.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Fractional General Counsel</h3>
                  <p className="text-sm text-gray-600">On-demand legal support for growing businesses.</p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Why Choose & CTA Combined */}
      <section className="py-8 md:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Personalized Solutions</h3>
                  <p className="text-sm text-gray-600">Tailored strategies for businesses of all sizes</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Extensive Experience</h3>
                  <p className="text-sm text-gray-600">Strong background in corporate law and litigation</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Risk Management</h3>
                  <p className="text-sm text-gray-600">Preventing legal disputes before they arise</p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
                Schedule a Free Consultation
              </h2>
              <p className="text-base md:text-lg text-white/90 mb-8">
                Expert legal protection for your business needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <Link to="/#contact">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white rounded-none h-14 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-primary/20 flex items-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Schedule Consultation
                  </Button>
                </Link>
                <a
                  href={`tel:${content.contact.phone}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Call Now</span>
                    <span className="text-lg font-serif font-bold text-white">{content.contact.phone}</span>
                  </div>
                </a>
              </div>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <Mail className="w-6 h-6 text-primary mx-auto mb-3" />
                  <p className="text-sm uppercase tracking-widest text-white/70 font-bold mb-2">Email</p>
                  <a href={`mailto:${content.contact.email}`} className="text-white hover:text-primary transition-colors">
                    {content.contact.email}
                  </a>
                </div>
                <div>
                  <Phone className="w-6 h-6 text-primary mx-auto mb-3" />
                  <p className="text-sm uppercase tracking-widest text-white/70 font-bold mb-2">Phone</p>
                  <a href={`tel:${content.contact.phone}`} className="text-white hover:text-primary transition-colors">
                    {content.contact.phone}
                  </a>
                </div>
                <div>
                  <MapPin className="w-6 h-6 text-primary mx-auto mb-3" />
                  <p className="text-sm uppercase tracking-widest text-white/70 font-bold mb-2">Address</p>
                  <p className="text-white">
                    {content.contact.address.street}, {content.contact.address.city}, {content.contact.address.state} {content.contact.address.zip}
                  </p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <Contact content={content.contact} />
      <Footer contact={content.contact} settings={content.siteSettings} />
    </div>
  );
}
