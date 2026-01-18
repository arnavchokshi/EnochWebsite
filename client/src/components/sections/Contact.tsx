import { useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";
import { submitContact } from "@/lib/api";
import type { ContactContent } from "@/lib/api";

interface ContactProps {
  content: ContactContent;
}

export function Contact({ content }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContact(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const subjects = [
    "General Inquiry",
    "Business Law",
    "Personal Injury",
    "Estate Planning",
    "Other",
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white" id="contact">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-24">
            <h2 className="text-sm uppercase tracking-[0.4em] font-bold text-primary mb-4">
              Get In Touch
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-secondary max-w-3xl mx-auto leading-tight">
              Schedule Your Free Consultation
            </h3>
            <p className="mt-6 text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
              Our team is ready to provide the guidance and representation you deserve.
            </p>
          </div>
        </BlurFade>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 max-w-6xl mx-auto">
          {/* Contact Info */}
          <BlurFade delay={0.2} inView>
            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-none bg-slate-50 border border-gray-100 flex items-center justify-center flex-shrink-0 group hover:bg-primary/10 transition-colors">
                  <Phone className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Phone</h4>
                  <a
                    href={`tel:${content.phone}`}
                    className="text-xl md:text-2xl font-serif font-bold text-secondary hover:text-primary transition-colors"
                  >
                    {content.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-none bg-slate-50 border border-gray-100 flex items-center justify-center flex-shrink-0 group hover:bg-primary/10 transition-colors">
                  <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Email</h4>
                  <a
                    href={`mailto:${content.email}`}
                    className="text-xl md:text-2xl font-serif font-bold text-secondary hover:text-primary transition-colors break-all"
                  >
                    {content.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-none bg-slate-50 border border-gray-100 flex items-center justify-center flex-shrink-0 group hover:bg-primary/10 transition-colors">
                  <MapPin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Location</h4>
                  <p className="text-lg md:text-xl font-serif font-bold text-secondary">
                    {content.address.street}
                    <br />
                    {content.address.city}, {content.address.state} {content.address.zip}
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-6">Service Areas</h4>
                <div className="flex flex-wrap gap-3">
                  {content.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="px-4 py-2 bg-slate-50 text-[10px] uppercase tracking-widest font-bold text-secondary border border-gray-100"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>

          {/* Contact Form */}
          <BlurFade delay={0.3} inView>
            <div className="p-10 bg-white border border-gray-100 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-secondary mb-4">
                    Message Received
                  </h3>
                  <p className="text-gray-500 mb-8">
                    Thank you for reaching out. We will contact you shortly to schedule your consultation.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-primary text-primary rounded-none hover:bg-primary hover:text-white uppercase tracking-widest text-[10px] font-bold px-8"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</Label>
                      <Input
                        id="name"
                        className="rounded-none border-0 border-b-2 border-gray-100 focus-visible:ring-0 focus-visible:border-primary px-0 transition-colors bg-transparent"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        className="rounded-none border-0 border-b-2 border-gray-100 focus-visible:ring-0 focus-visible:border-primary px-0 transition-colors bg-transparent"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        className="rounded-none border-0 border-b-2 border-gray-100 focus-visible:ring-0 focus-visible:border-primary px-0 transition-colors bg-transparent"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="(555) 000-0000"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="subject" className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Practice Area</Label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full h-10 rounded-none border-0 border-b-2 border-gray-100 focus:outline-none focus:border-primary bg-transparent text-sm transition-colors"
                      >
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Your Message</Label>
                    <Textarea
                      id="message"
                      className="rounded-none border-0 border-b-2 border-gray-100 focus-visible:ring-0 focus-visible:border-primary px-0 transition-colors bg-transparent min-h-[120px] resize-none"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      placeholder="Briefly describe your legal needs..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-none h-14 uppercase tracking-[0.2em] font-bold text-xs transition-all duration-300 shadow-xl shadow-primary/20"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Request Free Consultation"}
                  </Button>
                </form>
              )}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
