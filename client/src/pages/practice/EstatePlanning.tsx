import { useEffect, useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { FileText, Scale, Briefcase, Shield, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { fetchAllContent, type AllContent } from "@/lib/api";
import { Link } from "react-router-dom";
import EstatePlanningBg from "@/assets/tierra-mallorca-NpTbVOkkom8-unsplash.jpg";

export function EstatePlanning() {
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
        className="py-32 relative overflow-hidden"
        style={{
          backgroundImage: `url(${EstatePlanningBg})`,
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
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
                Estate Planning & Probate
              </h1>
              <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
              <p className="text-2xl md:text-3xl font-serif text-white/90 mb-4 drop-shadow-md">
                Georgia Estate Planning Attorney – Protecting Your Assets and Loved Ones
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Introduction & Other Practice Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="md:col-span-2">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Planning for the future protects your loved ones and ensures your assets are distributed according to your wishes. We provide experienced legal guidance for wills, trusts, and probate throughout Georgia.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm uppercase tracking-widest font-bold text-primary mb-4">Other Practice Areas</h3>
                  <Link to="/practice/business-law" className="block bg-slate-50 p-4 border border-gray-100 hover:border-primary transition-colors">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <span className="font-bold text-secondary">Business Law</span>
                    </div>
                  </Link>
                  <Link to="/practice/personal-injury" className="block bg-slate-50 p-4 border border-gray-100 hover:border-primary transition-colors">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="font-bold text-secondary">Personal Injury</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-secondary mb-8 text-center">
                Our Services
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Wills</h3>
                  <p className="text-sm text-gray-600">Distribute assets according to your wishes and prevent disputes.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Trusts</h3>
                  <p className="text-sm text-gray-600">Revocable, irrevocable, and special needs trusts for asset protection.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Powers of Attorney</h3>
                  <p className="text-sm text-gray-600">Financial and healthcare decision-making authority.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Advance Directives</h3>
                  <p className="text-sm text-gray-600">Living wills for end-of-life medical preferences.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Probate Administration</h3>
                  <p className="text-sm text-gray-600">Guidance through the probate process for executors and families.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Estate Litigation</h3>
                  <p className="text-sm text-gray-600">Will contests, guardianship, and conservatorship matters.</p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Combined: Probate + Challenges + FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-secondary mb-6">Probate Administration</h2>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 border border-gray-100">
                      <h3 className="text-sm font-bold text-primary mb-2">Understanding Probate</h3>
                      <p className="text-xs text-gray-600 mb-2">Validating wills, settling debts, and distributing assets.</p>
                      <p className="text-xs text-gray-600"><strong>Testate:</strong> With a will. <strong>Intestate:</strong> Without a will (Georgia law applies).</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-gray-100">
                      <h3 className="text-sm font-bold text-primary mb-2">Executor Duties</h3>
                      <p className="text-xs text-gray-600">File will, notify creditors, pay debts, distribute assets, handle disputes.</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-gray-100">
                      <h3 className="text-sm font-bold text-primary mb-2">Avoiding Probate</h3>
                      <p className="text-xs text-gray-600">Living trusts, joint ownership, and payable-on-death accounts can help.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-secondary mb-6">Common Challenges</h2>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 border border-gray-100">
                      <h3 className="text-sm font-bold text-primary mb-2">Will Contests & Litigation</h3>
                      <p className="text-xs text-gray-600">Resolving disputes over undue influence, fraud, or lack of capacity.</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-gray-100">
                      <h3 className="text-sm font-bold text-primary mb-2">Guardianship & Conservatorship</h3>
                      <p className="text-xs text-gray-600">Court-appointed guardians for medical and financial decisions.</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-gray-100">
                      <h3 className="text-sm font-bold text-primary mb-2">Estate Tax & Asset Protection</h3>
                      <p className="text-xs text-gray-600">Minimize federal estate tax and protect wealth for future generations.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-secondary mb-6 text-center">Frequently Asked Questions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-6 border border-gray-100">
                    <h3 className="text-lg font-serif font-bold text-primary mb-2">When Should I Start Planning?</h3>
                    <p className="text-sm text-gray-700">Start when you marry, have children, or acquire assets. It's never too early.</p>
                  </div>
                  <div className="bg-slate-50 p-6 border border-gray-100">
                    <h3 className="text-lg font-serif font-bold text-primary mb-2">What If Someone Dies Without a Will?</h3>
                    <p className="text-sm text-gray-700">Georgia's intestacy laws determine distribution, typically to spouse and children.</p>
                  </div>
                  <div className="bg-slate-50 p-6 border border-gray-100">
                    <h3 className="text-lg font-serif font-bold text-primary mb-2">How Long Does Probate Take?</h3>
                    <p className="text-sm text-gray-700">Typically 6-12 months, but complex estates may take longer.</p>
                  </div>
                  <div className="bg-slate-50 p-6 border border-gray-100">
                    <h3 className="text-lg font-serif font-bold text-primary mb-2">Can a Will Be Contested?</h3>
                    <p className="text-sm text-gray-700">Yes, if there's fraud, undue influence, or lack of capacity. An experienced attorney can help prevent challenges.</p>
                  </div>
                  <div className="bg-slate-50 p-6 border border-gray-100 md:col-span-2">
                    <h3 className="text-lg font-serif font-bold text-primary mb-2">Do I Need a Lawyer for Probate?</h3>
                    <p className="text-sm text-gray-700">While not required, probate is complex and mistakes can be costly. An attorney ensures requirements are met and helps avoid disputes.</p>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Why Choose & CTA Combined */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Personalized Solutions</h3>
                  <p className="text-sm text-gray-600">Tailored to your unique family and financial situation</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Compassionate Assistance</h3>
                  <p className="text-sm text-gray-600">We guide families through probate with care and efficiency</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Trusted Guidance</h3>
                  <p className="text-sm text-gray-600">Protect your legacy and ensure your loved ones are cared for</p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold mb-4">
                Schedule a Free Consultation
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Don't wait to protect your legacy. Contact us today for a free consultation.
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
              <div className="grid md:grid-cols-3 gap-6 text-center text-sm">
                <div>
                  <Mail className="w-5 h-5 text-primary mx-auto mb-2" />
                  <a href={`mailto:${content.contact.email}`} className="text-white hover:text-primary transition-colors text-xs">
                    {content.contact.email}
                  </a>
                </div>
                <div>
                  <Phone className="w-5 h-5 text-primary mx-auto mb-2" />
                  <a href={`tel:${content.contact.phone}`} className="text-white hover:text-primary transition-colors">
                    {content.contact.phone}
                  </a>
                </div>
                <div>
                  <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-white text-xs">
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
