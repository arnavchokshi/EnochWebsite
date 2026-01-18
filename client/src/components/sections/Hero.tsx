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
      className="relative min-h-screen flex items-start overflow-hidden pt-20 pb-12 md:pt-32 md:pb-20"
      style={{
        backgroundImage: `url(${HeroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      {/* Dark gradient at bottom for stats section */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 pt-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-left">
            <BlurFade delay={0.1} inView>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {content.subheading}
              </div>
            </BlurFade>

            <BlurFade delay={0.25} inView>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg" style={{ wordSpacing: '-0.05em', letterSpacing: '-0.02em', lineHeight: '0.95' }}>
                <TextAnimate animation="blurInUp" by="line" once>
                  {content.heading.split(' ').slice(0, 2).join(' ')}
                </TextAnimate>
                <br className="block" style={{ lineHeight: '0.3', margin: '0' }} />
                <span className="text-primary italic drop-shadow-lg block" style={{ marginTop: '-0.15em' }}>
                  <TextAnimate animation="blurInUp" by="line" once>
                    {content.heading.split(' ').slice(2).join(' ')}
                  </TextAnimate>
                </span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-xl font-medium leading-relaxed drop-shadow-md">
                {content.tagline}
              </p>
            </BlurFade>

            <BlurFade delay={0.55} inView>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-8">
                <a href={content.ctaLink}>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-primary/20 group"
                  >
                    {content.ctaText}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Call Now</span>
                    <span className="text-lg font-serif font-bold text-white">{contact.phone}</span>
                  </div>
                </a>
              </div>
            </BlurFade>
          </div>

          {/* Image & Globe Side */}
          <div className="flex-1 relative">
            <BlurFade delay={0.6} inView className="relative z-20">
              <div className="relative aspect-[4/5] max-w-[400px] mx-auto overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src={EnochImage}
                  alt="Attorney Enoch P. Hicks"
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent opacity-60"></div>
              </div>
            </BlurFade>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -left-20 w-60 h-60 bg-secondary/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Stats Section */}
        <BlurFade delay={0.7} inView>
          <div className="mt-16 md:mt-32 pt-8 border-t border-white/40 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center px-4 py-2 rounded-lg bg-black/20 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">9+</div>
                <div className="text-sm uppercase tracking-widest text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Years Experience</div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-black/20 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">500+</div>
                <div className="text-sm uppercase tracking-widest text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Cases Handled</div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-black/20 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">3x</div>
                <div className="text-sm uppercase tracking-widest text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Super Lawyers</div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-black/20 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">100%</div>
                <div className="text-sm uppercase tracking-widest text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Client Focused</div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
