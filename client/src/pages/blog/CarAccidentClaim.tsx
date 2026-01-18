import { useEffect, useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { fetchAllContent, type AllContent } from "@/lib/api";
import { Link } from "react-router-dom";
import scottGraham from "@/assets/scott-graham-OQMZwNd3ThU-unsplash.jpg";

export function CarAccidentClaim() {
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
        className="py-24 relative overflow-hidden"
        style={{
          backgroundImage: `url(${scottGraham})`,
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
                <span className="text-white font-medium">Personal Injury</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
                How to Report and Resolve a Car Accident Claim
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.2} inView>
            <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
              <div className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed mb-8">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Being involved in a car accident can be overwhelming, but knowing how to report and resolve your auto insurance claim can help you recover compensation for vehicle damage, medical expenses, and lost wages. Insurance companies often try to minimize payouts, so understanding the claims process is crucial.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  At The Law Office of Enoch P. Hicks, we help accident victims navigate the complexities of auto insurance claims and ensure they receive fair compensation. Here's a step-by-step guide to reporting and resolving your claim effectively.
                </p>
              </div>

              {/* Step 1 */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Step 1 – Initial Contact with the Insurance Company</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  After an accident, notify your insurance company as soon as possible. Many insurers require prompt reporting, and delaying your claim could lead to coverage denial.
                </p>
                
                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">What to Provide During the Initial Report</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When contacting your insurer, be prepared to share:
                </p>
                <ul className="list-none text-gray-700 leading-relaxed space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Your policy number</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Date, time, and location of the accident</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Names and contact details of all parties involved</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Police report number (if applicable)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>A brief statement about the accident <strong>(Stick to the facts and avoid admitting fault.)</strong></span>
                  </li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-blue-600">💡 Tip:</strong> Keep your communication brief. Insurance adjusters may try to get you to admit partial fault for the accident to reduce their liability.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Step 2 – Gathering Evidence to Support Your Claim</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Strong evidence is key to proving fault and maximizing your settlement. The more documentation you have, the harder it is for the insurance company to deny or undervalue your claim.
                </p>
                
                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">Essential Evidence to Collect</h3>
                <ul className="list-none text-gray-700 leading-relaxed space-y-4 mb-6">
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Accident Scene Photos</strong> – Capture vehicle damage, road conditions, skid marks, and any visible injuries.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Police Report</strong> – If law enforcement responded, obtain a copy of the official crash report.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Witness Statements</strong> – Collect names and contact information of anyone who saw the accident.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Medical Records</strong> – Keep track of emergency room visits, doctor's appointments, prescriptions, and physical therapy.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Vehicle Repair Estimates</strong> – Obtain quotes from certified auto repair shops to assess damage costs.</span>
                  </li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-blue-600">💡 Tip:</strong> If you are injured, follow all medical treatments and doctor recommendations. Gaps in treatment can be used against you during negotiations.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Step 3 – Evaluating the Insurance Claim</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Once your insurance adjuster receives your claim, they will:
                </p>
                <ul className="list-none text-gray-700 leading-relaxed space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Review accident details and evidence</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Assess property damage and repair estimates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Examine medical reports for injury-related claims</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Determine who was at fault</span>
                  </li>
                </ul>
                
                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">Understanding the Adjuster's Role</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Insurance adjusters work for the insurance company, not for you. Their goal is to minimize the payout by questioning the extent of damages or suggesting shared fault.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-blue-600">💡 Tip:</strong> Be cautious if the adjuster requests a recorded statement. You are not legally required to provide one, and anything you say can be used to weaken your claim.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Step 4 – Presenting the Demand for Compensation</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Once you have gathered all necessary documentation, you (or your attorney) will submit a demand letter to the insurance company outlining:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-3 mb-6 ml-4">
                  <li><strong>Liability</strong> (why the other driver was at fault)</li>
                  <li><strong>Medical Expenses</strong> (past, present, and future medical treatment costs)</li>
                  <li><strong>Lost Wages</strong> (if the injury affected your ability to work)</li>
                  <li><strong>Pain and Suffering</strong> (emotional and physical distress)</li>
                  <li><strong>Property Damage</strong> (vehicle repairs or replacement)</li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-blue-600">💡 Tip:</strong> Your demand should be higher than what you're willing to accept because insurers will likely counteroffer with a lower settlement.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Step 5 – Negotiating the Settlement</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Once the insurance company reviews your demand package, they will either:
                </p>
                <ul className="list-none text-gray-700 leading-relaxed space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Accept the demand and pay in full (rare).</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Deny the claim (often citing lack of evidence or disputed liability).</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Make a lower counteroffer (most common).</span>
                  </li>
                </ul>
                
                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">What to Expect During Negotiations</h3>
                <ul className="list-none text-gray-700 leading-relaxed space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span><strong>The first offer is usually low</strong> – Insurance companies hope you'll accept a quick payout.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span><strong>You can reject the offer and counter</strong> – Provide evidence supporting why you deserve a higher amount.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Don't rush into a settlement</strong> – Once you sign, you waive your right to pursue further compensation.</span>
                  </li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-blue-600">💡 Tip:</strong> If the insurance company refuses to make a fair offer, hiring a personal injury attorney can increase your chances of securing a higher settlement.
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Step 6 – Handling Insurance Company Tactics</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Insurance companies often use delay and denial tactics to pressure claimants into accepting lower settlements. Here's how to respond to common strategies:
                </p>
                
                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">Common Tactics and How to Respond</h3>
                <div className="space-y-6 mb-6">
                  <div className="border-l-4 border-red-500 pl-4">
                    <p className="text-gray-700 leading-relaxed mb-2">
                      <XCircle className="w-5 h-5 text-red-600 inline mr-2" />
                      <strong>Claim Denial Due to "Insufficient Evidence"</strong>
                    </p>
                    <p className="text-gray-700 leading-relaxed ml-7">
                      <CheckCircle className="w-5 h-5 text-green-600 inline mr-2" />
                      Provide additional documentation, including medical reports, expert statements, and accident reconstruction analysis.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <p className="text-gray-700 leading-relaxed mb-2">
                      <XCircle className="w-5 h-5 text-red-600 inline mr-2" />
                      <strong>Blaming You for the Accident</strong>
                    </p>
                    <p className="text-gray-700 leading-relaxed ml-7">
                      <CheckCircle className="w-5 h-5 text-green-600 inline mr-2" />
                      Georgia follows a modified comparative negligence rule – You can still recover damages even if you are partially at fault.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <p className="text-gray-700 leading-relaxed mb-2">
                      <XCircle className="w-5 h-5 text-red-600 inline mr-2" />
                      <strong>Delaying Payments or Processing</strong>
                    </p>
                    <p className="text-gray-700 leading-relaxed ml-7">
                      <CheckCircle className="w-5 h-5 text-green-600 inline mr-2" />
                      Stay persistent. If the insurer is unreasonably delaying, your attorney can escalate the claim.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <p className="text-gray-700 leading-relaxed mb-2">
                      <XCircle className="w-5 h-5 text-red-600 inline mr-2" />
                      <strong>Pressuring You to Settle Quickly</strong>
                    </p>
                    <p className="text-gray-700 leading-relaxed ml-7">
                      <CheckCircle className="w-5 h-5 text-green-600 inline mr-2" />
                      Early lowball offers often do not cover future medical expenses. Wait until you understand the full impact of your injuries.
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-blue-600">💡 Tip:</strong> If the insurance company refuses to negotiate fairly, you may need to file a personal injury lawsuit to recover the compensation you deserve.
                  </p>
                </div>
              </div>

              {/* Step 7 */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Step 7 – Reaching a Fair Settlement</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  A successful settlement should cover:
                </p>
                <ul className="list-none text-gray-700 leading-relaxed space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>All current and future medical expenses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Full repair or replacement of your vehicle</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Lost wages and reduced earning potential</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Compensation for pain, suffering, and emotional distress</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Once both parties agree on a final amount, you will:
                </p>
                <ul className="list-none text-gray-700 leading-relaxed space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Sign a settlement agreement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Receive a lump sum or structured payments</span>
                  </li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-yellow-600">Tip:</strong> Review the settlement terms carefully before signing. Once finalized, you cannot reopen the claim to seek additional compensation.
                  </p>
                </div>
              </div>

              {/* Get Professional Help */}
              <div className="mt-12 pt-8 border-t border-gray-200 bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-lg">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Get Professional Help for Your Auto Insurance Claim</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Navigating an auto insurance claim can be frustrating, especially when dealing with lowball offers and unfair denials. If you're struggling to get the compensation you deserve, Attorney Enoch P. Hicks can help.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <p className="text-gray-700 mb-2"><strong>Office Address:</strong> 279 Washington Avenue, Marietta, GA 30060</p>
                  <p className="text-gray-700 mb-2"><strong>Call Today:</strong> 678-977-8297</p>
                  <p className="text-gray-700 mb-4"><strong>Email:</strong> eph@ephfirm.com</p>
                  <p className="text-primary font-semibold text-lg">No Attorneys' Fees Unless You Win – Schedule Your Free Consultation Today!</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
                <Link to="/blog/pet-trust-lawyer-georgia">
                  <Button variant="outline" className="inline-flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous: Pet Trust Lawyer in Georgia
                  </Button>
                </Link>
                <Link to="/blog/fractional-general-counsel">
                  <Button className="inline-flex items-center">
                    Next: What is a Fractional General Counsel?
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
