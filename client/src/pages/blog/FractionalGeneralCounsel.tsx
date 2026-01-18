import { useEffect, useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, CheckCircle } from "lucide-react";
import { fetchAllContent, type AllContent } from "@/lib/api";
import { Link } from "react-router-dom";
import lanceAsper from "@/assets/lance-asper-9fxD3UW_C1I-unsplash.jpg";

export function FractionalGeneralCounsel() {
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
          backgroundImage: `url(${lanceAsper})`,
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
                <span className="text-white font-medium">Business Law</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
                What is a Fractional General Counsel?
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
              {(() => {
                // Find the blog post that matches this route
                const currentPath = window.location.pathname;
                const currentPost = content.blog.posts.find(
                  (post) => post.link === currentPath || post.link === `${currentPath}/` || 
                           currentPath === post.link || currentPath === `${post.link}/` ||
                           post.link === "/blog/fractional-general-counsel" || post.link === "/blog/fractional-general-counsel/"
                );
                
                // If database content exists, use it; otherwise show default content
                if (currentPost?.content) {
                  return (
                    <>
                      <div 
                        className="text-sm md:text-base lg:text-lg text-gray-800 font-serif leading-relaxed mb-8 prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: currentPost.content }}
                      />
                      {/* Navigation */}
                      <div className="mt-8 md:mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
                        <Link to="/blog/car-accident-claim">
                          <Button variant="outline" className="inline-flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Previous: How to Report and Resolve a Car Accident Claim
                          </Button>
                        </Link>
                        <Link to="/">
                          <Button className="inline-flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                          </Button>
                        </Link>
                      </div>
                    </>
                  );
                }
                
                // Default hardcoded content (backwards compatibility)
                return (
                  <>
                    <div className="text-sm md:text-base lg:text-lg text-gray-800 font-serif leading-relaxed mb-8">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  Businesses today face a wide range of legal challenges, from contract negotiations to compliance issues. However, not every company can afford a full-time in-house attorney. This is where a Fractional General Counsel comes in—a cost-effective solution that provides ongoing legal support without the high price tag of a full-time hire.
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-8">
                  At The Law Office of Enoch P. Hicks, we offer Fractional General Counsel services to businesses in Georgia, ensuring they receive top-tier legal guidance on a flexible, as-needed basis.
                </p>
              </div>

              {/* What is a Fractional General Counsel */}
              <div className="mt-8 md:mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-6">What is a Fractional General Counsel?</h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  A Fractional General Counsel (Fractional GC) is an experienced business attorney who works with companies on a part-time or as-needed basis. Instead of hiring a full-time, salaried in-house lawyer, businesses can retain legal expertise only when they need it—saving on overhead costs while still receiving high-quality legal advice.
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  A Fractional GC is ideal for:
                </p>
                <ul className="list-none text-sm md:text-base text-gray-700 leading-relaxed space-y-2 md:space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Small and mid-sized businesses that need regular legal guidance but can't justify a full-time hire.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Companies experiencing growth or restructuring, requiring increased legal oversight.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Startups that need legal protection but must remain budget-conscious</span>
                  </li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 md:p-4 mb-6">
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    <strong className="text-blue-600">Key Difference:</strong> A Fractional GC is more than an outside law firm—they become a trusted part of your leadership team, providing ongoing strategic legal counsel tailored to your business needs.
                  </p>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="mt-8 md:mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-6">Benefits of Hiring a Fractional General Counsel</h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  A Fractional GC provides significant advantages over hiring a full-time legal team or relying solely on outside law firms.
                </p>
                
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-gray-900 mb-4">Cost Savings Without Sacrificing Quality</h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  Hiring a full-time General Counsel can cost over $200,000 per year (salary, benefits, office space). In contrast, a Fractional GC provides high-level legal expertise at a fraction of the cost—only when you need it.
                </p>

                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-gray-900 mb-4">Flexible Legal Support</h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  Every business has unique legal needs. With Fractional General Counsel services, you can scale up or down based on your workload. Whether you need monthly oversight or project-based legal advice, a Fractional GC adapts to your requirements.
                </p>

                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-gray-900 mb-4">Strategic Risk Management</h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  Proactive legal guidance helps businesses prevent legal disputes before they arise. A Fractional GC ensures your contracts, policies, and compliance efforts are legally sound—reducing legal risks and protecting your company's reputation.
                </p>

                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-gray-900 mb-6">A Trusted Business Partner</h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  Unlike traditional law firms that provide one-off services, a Fractional GC builds a long-term relationship with your business. They understand your company's industry, goals, and challenges, allowing for tailored, business-focused legal strategies.
                </p>
              </div>

              {/* Common Legal Services */}
              <div className="mt-8 md:mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-6">Common Legal Services Provided by a Fractional General Counsel</h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  At The Law Office of Enoch P. Hicks, our Fractional General Counsel services cover a broad range of business legal needs.
                </p>

                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-gray-900 mb-4">Contract Drafting & Negotiation</h3>
                <ul className="list-none text-sm md:text-base text-gray-700 leading-relaxed space-y-2 md:space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Ensure contracts are legally enforceable and protect your interests.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Handle vendor agreements, partnership contracts, and employment agreements.</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">Business Compliance & Regulatory Guidance</h3>
                <ul className="list-none text-sm md:text-base text-gray-700 leading-relaxed space-y-2 md:space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Keep your company compliant with state and federal laws.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Avoid costly regulatory violations and legal pitfalls.</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">Employment Law & HR Policies</h3>
                <ul className="list-none text-sm md:text-base text-gray-700 leading-relaxed space-y-2 md:space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Draft and review employment contracts and workplace policies.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Ensure compliance with labor laws and HR best practices.</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">Corporate Governance & Business Structure</h3>
                <ul className="list-none text-sm md:text-base text-gray-700 leading-relaxed space-y-2 md:space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Assist with LLC formations, corporate bylaws, and shareholder agreements.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Advise on board responsibilities and governance policies.</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">Mergers, Acquisitions & Business Transactions</h3>
                <ul className="list-none text-sm md:text-base text-gray-700 leading-relaxed space-y-2 md:space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Provide legal oversight for buying, selling, or restructuring a business.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Conduct due diligence and negotiate transaction contracts.</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">Intellectual Property & Trade Secrets Protection</h3>
                <ul className="list-none text-sm md:text-base text-gray-700 leading-relaxed space-y-2 md:space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Safeguard your trademarks, copyrights, patents, and proprietary business information.</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">Litigation Risk Assessment & Dispute Resolution</h3>
                <ul className="list-none text-sm md:text-base text-gray-700 leading-relaxed space-y-2 md:space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Identify potential legal risks before they escalate into lawsuits.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Develop dispute resolution strategies to avoid costly litigation.</span>
                  </li>
                </ul>
              </div>

              {/* Is it Right for Your Business */}
              <div className="mt-8 md:mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-6">Is a Fractional General Counsel Right for Your Business?</h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  If your company needs consistent legal support but not a full-time in-house attorney, a Fractional GC may be the perfect solution.
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  A Fractional General Counsel is ideal for businesses that:
                </p>
                <ul className="list-none text-sm md:text-base text-gray-700 leading-relaxed space-y-2 md:space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Need ongoing legal oversight but want to avoid high costs.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Regularly deal with contracts, regulatory compliance, and business transactions.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Are scaling up or navigating complex legal matters.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Want to proactively manage risk rather than wait for legal issues to arise.</span>
                  </li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 md:p-4 mb-6">
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    <strong className="text-blue-600">💡</strong> Not sure if your business needs a Fractional GC? A free consultation can help determine whether this service is right for you.
                  </p>
                </div>
              </div>

              {/* FAQs Section */}
              <div className="mt-8 md:mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-6">FAQs About Fractional General Counsel Services</h2>
                <div className="space-y-6 mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">How is a Fractional General Counsel different from hiring a law firm?</h3>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I customize my Fractional General Counsel services?</h3>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">How much does a Fractional General Counsel cost?</h3>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">What industries benefit from a Fractional General Counsel?</h3>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I get started with Fractional General Counsel services?</h3>
                  </div>
                </div>
              </div>

              {/* Schedule Consultation */}
              <div className="mt-8 md:mt-12 pt-8 border-t border-gray-200 bg-gradient-to-r from-primary/5 to-secondary/5 p-6 md:p-8 rounded-lg">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4">Schedule Your Consultation Today</h2>
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-gray-800 mb-6">Gain Reliable Legal Support Without the High Costs</h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  A Fractional General Counsel provides businesses with affordable, strategic legal guidance—without the financial burden of hiring a full-time attorney.
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  At The Law Office of Enoch P. Hicks, we help businesses in Georgia navigate legal complexities with tailored, cost-effective solutions.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <p className="text-gray-700 mb-2"><strong>Office Address:</strong> 279 Washington Avenue, Marietta, GA 30060</p>
                  <p className="text-gray-700 mb-2"><strong>Call Today:</strong> 678-977-8297</p>
                  <p className="text-gray-700 mb-4"><strong>Email:</strong> eph@ephfirm.com</p>
                  <p className="text-primary font-semibold text-lg">Protect Your Business—Schedule Your Free Consultation Today!</p>
                </div>
              </div>

                      {/* Navigation */}
                      <div className="mt-8 md:mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
                        <Link to="/blog/car-accident-claim">
                          <Button variant="outline" className="inline-flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Previous: How to Report and Resolve a Car Accident Claim
                          </Button>
                        </Link>
                        <Link to="/">
                          <Button className="inline-flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                          </Button>
                        </Link>
                      </div>
                    </>
                  );
                })()}
            </div>
          </BlurFade>
        </div>
      </section>

      <Contact content={content.contact} />
      <Footer contact={content.contact} settings={content.siteSettings} />
    </div>
  );
}
