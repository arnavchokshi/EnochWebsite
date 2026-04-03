import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import type { HeroContent, ContactContent } from "@/lib/api";
import EnochImage from "@/assets/Screenshot 2026-01-18 at 1.32.18 AM.png";
import HeroBackground from "@/assets/lance-asper-9fxD3UW_C1I-unsplash.jpg";

interface HeroProps {
  content: HeroContent;
  contact: ContactContent;
}

export function Hero({ content, contact }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12"
    >
      {/* Background Image with modern, clean overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${HeroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="absolute inset-0 bg-secondary/85 z-0 backdrop-blur-[2px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left pt-12 lg:pt-0">
            <BlurFade delay={0.1} inView>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 text-sm font-medium mb-8 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-primary"></span>
                </span>
                {content.subheading}
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                <TextAnimate animation="blurInUp" by="line" once>
                  {content.heading}
                </TextAnimate>
              </h1>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-base sm:text-lg lg:text-xl text-white/70 mb-10 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                {content.tagline}
              </p>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a href={content.ctaLink} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="h-14 w-full sm:w-auto px-8 text-base font-semibold rounded-full shadow-lg bg-primary text-white hover:bg-primary/90 hover:scale-105 transition-transform group"
                  >
                    {content.ctaText}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 px-8 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white w-full sm:w-auto justify-center backdrop-blur-md"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-medium">{contact.phone}</span>
                </a>
              </div>
            </BlurFade>
          </div>

          {/* Image Side */}
          <div className="flex-1 w-full max-w-[280px] sm:max-w-xs lg:max-w-sm relative mx-auto lg:mx-0 lg:ml-auto">
            <BlurFade delay={0.5} inView>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <img
                  src={EnochImage}
                  alt="Attorney Enoch P. Hicks"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent"></div>
              </div>
            </BlurFade>
          </div>
        </div>

        {/* Simplified Stats Section */}
        <BlurFade delay={0.6} inView>
          <div className="mt-16 lg:mt-20 pt-8 lg:pt-10 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">9+</div>
                <div className="text-xs lg:text-sm text-white/70 font-medium uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-xs lg:text-sm text-white/70 font-medium uppercase tracking-wider">Cases Handled</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">3x</div>
                <div className="text-xs lg:text-sm text-white/70 font-medium uppercase tracking-wider">Super Lawyers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-xs lg:text-sm text-white/70 font-medium uppercase tracking-wider">Client Focused</div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
