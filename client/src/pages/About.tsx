import { useEffect, useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, GraduationCap, Award, Scale, MapPin, Calendar, Briefcase, Target, Users } from "lucide-react";
import { fetchAllContent, type AllContent } from "@/lib/api";
import { Link } from "react-router-dom";
import EnochHeadshot from "@/assets/ChatGPT Image Jan 18, 2026, 01_33_42 AM.png";

export function About() {
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

  const address = `${content.contact.address.street}, ${content.contact.address.city}, ${content.contact.address.state} ${content.contact.address.zip}`;
  // Google Maps embed URL - using standard embed format
  const mapsQuery = encodeURIComponent(`${content.contact.address.street}, ${content.contact.address.city}, ${content.contact.address.state} ${content.contact.address.zip}`);

  return (
    <div className="min-h-screen bg-background">
      <Navbar contact={content.contact} settings={content.siteSettings} />
      
      {/* Hero Section with Headshot */}
      <section className="py-8 md:py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
              {/* Left: Headshot */}
              <div className="relative">
                <div className="relative bg-slate-900 aspect-[3/4] max-w-md mx-auto overflow-hidden">
                  <img 
                    src={EnochHeadshot}
                    alt="Enoch P. Hicks"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="mt-6 bg-white p-6 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-serif font-bold text-secondary mb-1">Enoch P. Hicks</h2>
                  <p className="text-primary font-semibold">Georgia Lawyer</p>
                  <p className="text-sm text-gray-500 mt-2">Attorney Biography</p>
                </div>
              </div>

              {/* Right: Intro Content */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">
                    Enoch P. Hicks
                  </h1>
                  <p className="text-lg md:text-xl text-secondary/80 mb-6">Georgia Lawyer</p>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-secondary mb-4">
                    A Personalized Approach to Legal Representation
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    When seeking legal counsel, you need an attorney who not only possesses deep legal knowledge but also values client relationships. As the founder of The Law Office of Enoch P. Hicks, I provide personalized legal strategies dedicated to serving individuals and businesses.
                  </p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="text-center p-6 bg-white border-primary/20 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary mb-2">9+</div>
                <div className="text-sm text-gray-600 font-semibold">Years Experience</div>
                <div className="text-xs text-gray-500 mt-1">Since 2016</div>
              </Card>
              <Card className="text-center p-6 bg-white border-primary/20 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-gray-600 font-semibold">Superior Courts</div>
                <div className="text-xs text-gray-500 mt-1">All of Georgia</div>
              </Card>
              <Card className="text-center p-6 bg-white border-primary/20 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-gray-600 font-semibold">States Admitted</div>
                <div className="text-xs text-gray-500 mt-1">Pro hac vice</div>
              </Card>
              <Card className="text-center p-6 bg-white border-primary/20 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-gray-600 font-semibold">Rising Star</div>
                <div className="text-xs text-gray-500 mt-1">2023-2025</div>
              </Card>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Experience & Education - Two Column */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Left: Experience */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-1 bg-primary"></div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-secondary">
                    Career Experience
                  </h2>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-8">
                  Licensed since 2016, with extensive experience in various legal capacities:
                </p>
                <div className="space-y-6">
                  <Card className="p-4 md:p-6 border-primary/20 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <Briefcase className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-serif font-bold text-secondary mb-1">
                          Assistant Solicitor
                        </h3>
                        <p className="text-sm text-gray-600">
                          Courtroom advocacy and prosecution
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 md:p-6 border-primary/20 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <Scale className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-serif font-bold text-secondary mb-1">
                          Assistant Attorney General
                        </h3>
                        <p className="text-sm text-gray-600">
                          Representing state government across Georgia
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 md:p-6 border-primary/20 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <Target className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-serif font-bold text-secondary mb-1">
                          Senior Associate
                        </h3>
                        <p className="text-sm text-gray-600">
                          High-stakes commercial litigation nationwide
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Right: Education & Bar Admissions */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-1 bg-primary"></div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-secondary">
                    Education & Admissions
                  </h2>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-serif font-bold text-secondary">
                      Academic Excellence
                    </h3>
                  </div>
                  <div className="space-y-3 pl-9">
                    <div>
                      <p className="font-bold text-secondary mb-1">Juris Doctor</p>
                      <p className="text-sm text-gray-600">University of South Carolina</p>
                    </div>
                    <div>
                      <p className="font-bold text-secondary mb-1">BBA, Risk Management & Insurance</p>
                      <p className="text-sm text-gray-600">University of Georgia</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Scale className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-serif font-bold text-secondary">
                      Bar Admissions
                    </h3>
                  </div>
                  <div className="space-y-2 pl-9">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold text-secondary">Georgia Bar</span> (all trial and appellate courts)
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-bold text-secondary">U.S. District Courts</span> – Northern, Middle, and Southern Districts of Georgia
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-bold text-secondary">Pro hac vice</span> in multiple federal and state courts nationwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Awards & Approach - Combined Section */}
      <section className="py-8 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Left: Awards */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-1 bg-primary"></div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-secondary">
                    Awards & Recognitions
                  </h2>
                </div>
                <div className="space-y-4">
                  <Card className="p-4 md:p-5 bg-white border-primary/20">
                    <div className="flex gap-4 items-start">
                      <Award className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-serif font-bold text-secondary mb-1">
                          Super Lawyers, Rising Star
                        </h3>
                        <p className="text-sm text-gray-600">2023 – 2025</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 md:p-5 bg-white border-primary/20">
                    <div className="flex gap-4 items-start">
                      <Award className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-serif font-bold text-secondary mb-1">
                          Public Interest Law Society Scholarship
                        </h3>
                        <p className="text-sm text-gray-600">2015</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 md:p-5 bg-white border-primary/20">
                    <div className="flex gap-4 items-start">
                      <Award className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-serif font-bold text-secondary mb-1">
                          Eagle Scout
                        </h3>
                        <p className="text-sm text-gray-600">2007</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Right: Client-Centered Approach */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-1 bg-primary"></div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-secondary">
                    Client-Centered Approach
                  </h2>
                </div>
                <div className="space-y-6 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-serif font-bold text-secondary">
                        Personalized Representation
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      Every client receives one-on-one attention with clear communication at every stage.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-serif font-bold text-secondary">
                        Results-Driven Strategy
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      Tailored legal strategies focused on efficiency and achieving the best outcomes.
                    </p>
                  </div>
                </div>
                <Card className="bg-primary/5 border-l-4 border-primary p-6">
                  <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-3">
                    "I strive to simplify the complexities of the legal process, so my clients feel empowered and informed every step of the way."
                  </blockquote>
                  <p className="text-secondary font-bold text-sm">– Enoch P. Hicks</p>
                </Card>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Free Consultation & Map Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Left: CTA Box */}
              <Card className="bg-primary p-8 text-white border-0 shadow-xl">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                  Contact Attorney Enoch P. Hicks Today for a Consultation
                </h2>
                <p className="text-white/90 mb-6 leading-relaxed">
                  When legal challenges arise, you deserve an attorney who is committed to your success. Whether you need assistance with a business dispute, personal injury claim, or estate planning, The Law Office of Enoch P. Hicks is here to help.
                </p>
                <div className="flex flex-col gap-4">
                  <Link to="/#contact">
                    <Button
                      size="lg"
                      className="bg-white hover:bg-white/90 text-primary rounded-none h-12 px-8 text-sm font-bold uppercase tracking-widest transition-all duration-300 w-full"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Consultation
                    </Button>
                  </Link>
                  <a
                    href={`tel:${content.contact.phone}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Call Now</span>
                      <span className="text-lg font-serif font-bold">{content.contact.phone}</span>
                    </div>
                  </a>
                </div>
              </Card>

              {/* Right: Google Maps */}
              <BlurFade delay={0.2} inView>
                <div className="bg-white border border-gray-100 shadow-lg overflow-hidden h-full flex flex-col">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <h4 className="text-lg font-serif font-bold text-secondary">
                        Visit Our Office
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 ml-8">
                      {address}
                    </p>
                  </div>
                  <div className="relative flex-1" style={{ paddingBottom: '75%', height: 0, overflow: 'hidden' }}>
                    <iframe
                      src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Law Office Location"
                    ></iframe>
                  </div>
                </div>
              </BlurFade>
            </div>
          </BlurFade>
        </div>
      </section>

      <Footer contact={content.contact} settings={content.siteSettings} />
    </div>
  );
}
