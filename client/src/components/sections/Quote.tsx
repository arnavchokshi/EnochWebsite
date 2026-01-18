import { BlurFade } from "@/components/ui/blur-fade";
import { Globe } from "@/components/ui/globe";
import { Quote as QuoteIcon } from "lucide-react";
import type { QuoteContent } from "@/lib/api";

interface QuoteProps {
  content: QuoteContent;
}

export function Quote({ content }: QuoteProps) {
  return (
    <section className="py-32 bg-secondary relative overflow-hidden">
      {/* Globe decorative element */}
      <div className="absolute top-20 -right-20 w-96 h-96 opacity-30 pointer-events-none z-0">
        <Globe className="w-full h-full" />
      </div>
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <BlurFade delay={0.1} inView>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-10">
              <QuoteIcon className="w-8 h-8 text-primary" />
            </div>
            
            <blockquote className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-12 italic">
              "{content.quote}"
            </blockquote>
            
            <div className="flex flex-col items-center gap-4">
              <cite className="text-xl text-primary font-bold uppercase tracking-[0.3em] not-italic">
                {content.author}
              </cite>
              <div className="w-24 h-1 bg-primary/30" />
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
