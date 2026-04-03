import { useEffect, useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Car, Phone, Mail, MapPin, Calendar, AlertTriangle, Users, Heart, Briefcase } from "lucide-react";
import { fetchAllContent, type AllContent } from "@/lib/api";
import { Link } from "react-router-dom";
import PersonalInjuryBg from "@/assets/harlie-raethel-ouyjDk-KdfY-unsplash.jpg";

export function PersonalInjury() {
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
        className="legal-section py-20 md:py-32 relative overflow-hidden"
        style={{
          backgroundImage: `url(${PersonalInjuryBg})`,
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
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
                Personal Injury
              </h1>
              <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
              <p className="text-xl sm:text-2xl md:text-3xl font-serif text-white/90 mb-4 drop-shadow-md">
                Georgia Personal Injury Lawyer – Fighting for the Compensation You Deserve
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Introduction & Other Practice Areas */}
      <section className="legal-section py-8 md:py-12 lg:py-16 bg-[#f6f2ea]">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-2">
                  <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                    If you've been injured due to someone else's actions, you deserve compensation. We fight insurance companies to recover what you're owed.
                  </p>
                  <div className="bg-primary/10 border-2 border-primary p-4 rounded-lg">
                    <p className="text-lg font-serif font-bold text-primary">
                      No Fees Unless You Win
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm uppercase tracking-widest font-bold text-primary mb-4">Other Practice Areas</h3>
                  <Link to="/practice/business-law" className="block bg-slate-50 p-4 border border-gray-100 hover:border-primary transition-colors">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <span className="font-bold text-secondary">Business Law</span>
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
      <section className="legal-section py-8 md:py-12 lg:py-16 bg-[#ece8df]">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-secondary mb-8 text-center">
                Types of Cases We Handle
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Car className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Car Accidents</h3>
                  <p className="text-sm text-gray-600">Compensation for injuries from distracted, drunk, or negligent drivers.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Car className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Truck Accidents</h3>
                  <p className="text-sm text-gray-600">Complex claims involving commercial vehicles and federal regulations.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Car className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Motorcycle Accidents</h3>
                  <p className="text-sm text-gray-600">Protecting the rights of injured motorcyclists.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Pedestrian Accidents</h3>
                  <p className="text-sm text-gray-600">Compensation for injuries from reckless or distracted drivers.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Wrongful Death</h3>
                  <p className="text-sm text-gray-600">Justice and financial support for families who lost loved ones.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Slip & Fall</h3>
                  <p className="text-sm text-gray-600">Premises liability claims for unsafe property conditions.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-secondary mb-2">Medical Malpractice</h3>
                  <p className="text-sm text-gray-600">Surgical errors, misdiagnoses, and birth injuries.</p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Combined: Negligence + Compensation + Steps */}
      <section className="legal-section py-8 md:py-12 lg:py-16 bg-[#f6f2ea]">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-secondary mb-6">Proving Negligence</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 border border-gray-100">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <span className="text-lg font-bold text-primary">1</span>
                      </div>
                      <h3 className="text-sm font-bold text-secondary mb-1">Duty of Care</h3>
                      <p className="text-xs text-gray-600">Legal duty to act responsibly</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-gray-100">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <span className="text-lg font-bold text-primary">2</span>
                      </div>
                      <h3 className="text-sm font-bold text-secondary mb-1">Breach of Duty</h3>
                      <p className="text-xs text-gray-600">Violation through negligence</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-gray-100">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <span className="text-lg font-bold text-primary">3</span>
                      </div>
                      <h3 className="text-sm font-bold text-secondary mb-1">Causation</h3>
                      <p className="text-xs text-gray-600">Direct cause of injuries</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-gray-100">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <span className="text-lg font-bold text-primary">4</span>
                      </div>
                      <h3 className="text-sm font-bold text-secondary mb-1">Damages</h3>
                      <p className="text-xs text-gray-600">Physical or financial harm</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-secondary mb-6">Compensation Types</h2>
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-4 border border-gray-100">
                      <h3 className="text-sm font-bold text-secondary mb-1">Medical Expenses</h3>
                      <p className="text-xs text-gray-600">Hospital bills, therapy, medications</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-gray-100">
                      <h3 className="text-sm font-bold text-secondary mb-1">Lost Wages</h3>
                      <p className="text-xs text-gray-600">Time off work and future earnings</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-gray-100">
                      <h3 className="text-sm font-bold text-secondary mb-1">Pain & Suffering</h3>
                      <p className="text-xs text-gray-600">Physical pain and emotional distress</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-gray-100">
                      <h3 className="text-sm font-bold text-secondary mb-1">Property Damage</h3>
                      <p className="text-xs text-gray-600">Vehicle and property reimbursement</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-secondary mb-6">Steps After an Accident</h2>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="bg-slate-50 p-4 border border-gray-100 text-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg font-bold text-primary">1</span>
                    </div>
                    <p className="text-xs font-bold text-secondary">Seek Medical Care</p>
                  </div>
                  <div className="bg-slate-50 p-4 border border-gray-100 text-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg font-bold text-primary">2</span>
                    </div>
                    <p className="text-xs font-bold text-secondary">Report Incident</p>
                  </div>
                  <div className="bg-slate-50 p-4 border border-gray-100 text-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg font-bold text-primary">3</span>
                    </div>
                    <p className="text-xs font-bold text-secondary">Gather Evidence</p>
                  </div>
                  <div className="bg-slate-50 p-4 border border-gray-100 text-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg font-bold text-primary">4</span>
                    </div>
                    <p className="text-xs font-bold text-secondary">Avoid Insurance</p>
                  </div>
                  <div className="bg-slate-50 p-4 border border-gray-100 text-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg font-bold text-primary">5</span>
                    </div>
                    <p className="text-xs font-bold text-secondary">Contact Lawyer</p>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="legal-section py-8 md:py-12 lg:py-16 bg-[#ece8df]">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-secondary mb-8 text-center">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 border border-gray-100">
                  <h3 className="text-lg font-serif font-bold text-primary mb-2">How Long Do I Have to File?</h3>
                  <p className="text-sm text-gray-700">Two years from the date of injury in Georgia, with some exceptions.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100">
                  <h3 className="text-lg font-serif font-bold text-primary mb-2">What If I Was Partially at Fault?</h3>
                  <p className="text-sm text-gray-700">You can still recover if less than 50% at fault, but compensation is reduced.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100">
                  <h3 className="text-lg font-serif font-bold text-primary mb-2">How Much is My Case Worth?</h3>
                  <p className="text-sm text-gray-700">Depends on injuries, medical expenses, lost wages, and impact on your life.</p>
                </div>
                <div className="bg-white p-6 border border-gray-100">
                  <h3 className="text-lg font-serif font-bold text-primary mb-2">How Much Does It Cost?</h3>
                  <p className="text-sm text-gray-700">No fees unless we win. We work on a contingency fee basis.</p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* CTA Section */}
      <section className="legal-section py-8 md:py-12 lg:py-16 bg-gradient-to-br from-[#0b1c30] via-[#0f2237] to-[#132c47] text-white">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
                Schedule Your Free Consultation
              </h2>
              <p className="text-base md:text-lg text-white/90 mb-6">
                Don't wait to take legal action. We fight for justice and the compensation you deserve.
              </p>
              <div className="bg-primary/20 border-2 border-primary/50 p-4 rounded-lg mb-8">
                <p className="text-xl font-serif font-bold text-white">
                  No Fees Unless You Win
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <Link to="/#contact">
                  <Button
                    size="lg"
                    className="btn-lux rounded-none h-14 px-10 text-sm font-bold uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-2"
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
