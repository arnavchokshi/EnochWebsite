import { useEffect, useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { fetchAllContent, type AllContent } from "@/lib/api";
import { Link } from "react-router-dom";
import tierraMallorca from "@/assets/tierra-mallorca-NpTbVOkkom8-unsplash.jpg";

export function PetTrustLawyerGeorgia() {
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
        className="py-16 md:py-24 relative overflow-hidden"
        style={{
          backgroundImage: `url(${tierraMallorca})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <BlurFade delay={0.1} inView>
            <Link 
              to="/" 
              className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            <div className="max-w-4xl mx-auto">
              <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full mb-6">
                <span className="text-white font-medium">Estate Planning</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
                Pet Trust Lawyer in Georgia
              </h1>
              <div className="flex items-center text-white/80 mb-8">
                <Calendar className="w-5 h-5 mr-2" />
                <span>March 4, 2025</span>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-8 md:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.2} inView>
            <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
              <div className="text-sm md:text-base lg:text-lg text-gray-800 font-serif leading-relaxed mb-8">
                <p className="font-bold mb-4">Protecting Your Beloved Companion's Future.</p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  As a pet owner, you want to ensure that your beloved companion animals receive proper care, even if you are no longer around to provide for them. A pet trust is a legally enforceable arrangement that allows you to set aside funds and instructions for the continued care of your pet. Unlike informal agreements, a pet trust provides a legally binding agreement to follow your specific wishes, giving you peace of mind that your furry, feathered, or scaled family members will be well-cared for after you're gone.
                </p>
              </div>

              <div className="mt-8 md:mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-6">What is a Pet Trust?</h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  A pet trust is a specialized legal document that sets aside money and provides specific instructions for the care of your pet(s) after you pass away or become incapacitated. In Georgia, pet trusts are recognized and enforceable under state law, making them a reliable way to ensure your pet's future.
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  Unlike simply leaving money to a friend or family member with verbal instructions, a pet trust creates a legal obligation. The trustee you designate is required to use the funds specifically for your pet's care, and the trust can continue for the lifetime of your pet or pets.
                </p>
              </div>

              <div className="mt-8 md:mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-6">Why Create a Pet Trust?</h2>
                <ul className="list-disc list-inside text-sm md:text-base text-gray-700 leading-relaxed space-y-2 md:space-y-4 mb-6">
                  <li><strong>Legal Protection:</strong> Creates a legally binding obligation to care for your pet according to your specific wishes.</li>
                  <li><strong>Financial Security:</strong> Ensures funds are set aside and used exclusively for your pet's care, including food, veterinary care, grooming, and other needs.</li>
                  <li><strong>Peace of Mind:</strong> Know that your pet will be cared for by someone you trust, following your instructions.</li>
                  <li><strong>Detailed Instructions:</strong> You can specify dietary requirements, medical preferences, preferred veterinarians, and other important care details.</li>
                  <li><strong>Protection During Incapacity:</strong> A pet trust can also take effect if you become incapacitated, not just after death.</li>
                </ul>
              </div>

              <div className="mt-8 md:mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-6">How We Can Help</h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  At The Law Office of Enoch P. Hicks, we understand that pets are family. Our experienced estate planning attorneys can help you create a comprehensive pet trust that protects your companion's future. We'll work with you to:
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-gray-700 leading-relaxed space-y-2 md:space-y-4 mb-6">
                  <li>Designate a trusted caregiver for your pet</li>
                  <li>Set aside appropriate funds for your pet's lifetime needs</li>
                  <li>Provide detailed care instructions</li>
                  <li>Ensure the trust complies with Georgia law</li>
                  <li>Integrate the pet trust with your overall estate plan</li>
                </ul>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-8">
                  Don't leave your pet's future to chance. Contact us today for a free consultation to discuss how a pet trust can protect your beloved companion.
                </p>
              </div>

              {/* Navigation */}
              <div className="mt-8 md:mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
                <Link to="/">
                  <Button variant="outline" className="inline-flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Link to="/blog/car-accident-claim">
                  <Button className="inline-flex items-center">
                    Next: How to Report and Resolve a Car Accident Claim
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </Link>
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
