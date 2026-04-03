import { BlurFade } from "@/components/ui/blur-fade";
import { Globe } from "@/components/ui/globe";
import { Quote as QuoteIcon } from "lucide-react";
import type { QuoteContent } from "@/lib/api";

interface QuoteProps {
  content: QuoteContent;
}

export function Quote({ content }: QuoteProps) {
  return (
    <section className="py-16 md:py-32 bg-[#0f2237] relative overflow-hidden">
      {/* Globe decorative element */}
      <div className="absolute top-[120px] -right-20 w-96 h-96 opacity-20 pointer-events-none z-0 float-soft">
        <Globe className="w-full h-full" />
      </div>
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>
      <div className="absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <BlurFade delay={0.1} inView>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-md mb-10 border border-white/10">
              <QuoteIcon className="w-8 h-8 text-primary" />
            </div>
            
            <blockquote className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-12 tracking-tight">
              "{content.quote}"
            </blockquote>
            
            <div className="flex flex-col items-center gap-4">
              <cite className="text-lg text-primary font-medium not-italic">
                {content.author}
              </cite>
              <div className="w-12 h-1 bg-primary/50 rounded-full" />
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
