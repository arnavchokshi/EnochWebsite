import { useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
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
    <section className="py-16 md:py-32 bg-[#fdfbf7]" id="contact">
      <div className="container mx-auto px-6">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Get In Touch
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary max-w-3xl mx-auto tracking-tight">
              Schedule Your Free Consultation
            </h3>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Our team is ready to provide the guidance and representation you deserve.
            </p>
          </div>
        </BlurFade>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto">
          {/* Contact Info */}
          <BlurFade delay={0.2} inView>
            <div className="space-y-12">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <Phone className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone</h4>
                  <a
                    href={`tel:${content.phone}`}
                    className="text-2xl font-bold text-secondary hover:text-primary transition-colors"
                  >
                    {content.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <Mail className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</h4>
                  <a
                    href={`mailto:${content.email}`}
                    className="text-xl md:text-2xl font-bold text-secondary hover:text-primary transition-colors break-all"
                  >
                    {content.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Location</h4>
                  <p className="text-lg md:text-xl font-bold text-secondary leading-snug">
                    {content.address.street}
                    <br />
                    {content.address.city}, {content.address.state} {content.address.zip}
                  </p>
                </div>
              </div>

              <div className="pt-10 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Service Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {content.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="px-4 py-2 bg-white text-sm font-medium text-secondary rounded-full border border-primary/20"
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
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-primary/10 shadow-2xl shadow-primary/5">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-secondary mb-4 tracking-tight">
                    Message Received
                  </h3>
                  <p className="text-slate-600 mb-10 font-light text-lg">
                    Thank you for reaching out. We will contact you shortly to schedule your consultation.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="h-14 px-8 rounded-full border-primary text-primary hover:bg-primary/5 font-semibold"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</Label>
                      <Input
                        id="name"
                        className="h-12 rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary focus-visible:bg-white transition-colors"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        className="h-12 rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary focus-visible:bg-white transition-colors"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        className="h-12 rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary focus-visible:bg-white transition-colors"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="(555) 000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium text-slate-700">Practice Area</Label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:bg-white transition-colors"
                      >
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-slate-700">Your Message</Label>
                    <Textarea
                      id="message"
                      className="min-h-[160px] rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary focus-visible:bg-white transition-colors resize-none p-4"
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
                    className="w-full h-14 rounded-xl bg-primary text-white hover:bg-primary/90 font-semibold text-base transition-all mt-4 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5"
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
