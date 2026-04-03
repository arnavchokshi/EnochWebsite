import { useState, useRef, useEffect } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Send, Search, Gavel, ChevronLeft, ChevronRight } from "lucide-react";
import type { HowItWorksContent } from "@/lib/api";
// @ts-ignore - CardSwap is a JSX component without TypeScript definitions
import CardSwap, { Card } from "@/components/CardSwap";

interface HowItWorksProps {
  content: HowItWorksContent;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  send: Send,
  search: Search,
  gavel: Gavel,
};

export function HowItWorks({ content }: HowItWorksProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(400);
  const cardSwapRef = useRef<{ next: () => void; prev: () => void; goto: (idx: number) => void }>(null);

  useEffect(() => {
    const handleResize = () => {
      // Calculate width based on screen size, with some padding (48px for px-6)
      const maxWidth = window.innerWidth - 48;
      setCardWidth(Math.min(400, maxWidth));
    };

    // Initial call
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSteps = content.steps.length;

  const handleNext = () => {
    if (totalSteps === 0) return;
    cardSwapRef.current?.next();
  };

  const handlePrevious = () => {
    if (totalSteps === 0) return;
    cardSwapRef.current?.prev();
  };

  const handleDotClick = (index: number) => {
    cardSwapRef.current?.goto(index);
  };

  return (
    <section className="py-16 md:py-32 bg-[#fdfbf7] relative overflow-hidden" id="how-it-works">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 lg:min-h-[600px]">
          {/* Title Section - Left Side */}
          <BlurFade delay={0.1} inView className="flex-1 lg:max-w-md w-full">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                Our Process
              </h2>
              <h3 className="text-4xl sm:text-5xl font-bold text-secondary mb-6 tracking-tight leading-[1.1]">
                {content.sectionTitle}
              </h3>
              <p className="mt-6 text-lg text-slate-600 mb-8 font-light leading-relaxed">
                {content.sectionDescription}
              </p>
            </div>

            {/* Navigation Controls - Desktop Only */}
            <div className="hidden lg:flex items-center gap-6 mt-12">
              <button
                onClick={handlePrevious}
                className="w-12 h-12 rounded-full border border-primary/30 bg-white text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center group shadow-sm"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              
              {/* Indicator dots */}
              <div className="flex gap-3">
                {content.steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-8 bg-primary' 
                        : 'w-2 bg-primary/20 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-primary/30 bg-white text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center group shadow-sm"
                aria-label="Next step"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <p className="hidden lg:block mt-6 text-sm text-slate-400 font-medium">
              Use the arrows or dots to move through each step.
            </p>
          </BlurFade>

          {/* Mobile Cards Section - Compact Vertical List */}
          <div className="lg:hidden w-full flex flex-col gap-4 mt-2">
            {content.steps.map((step, index) => {
              return (
                <BlurFade key={step.id} delay={0.2 + index * 0.1} inView>
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/20 relative">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-secondary mb-2 tracking-tight">
                          {step.title}
                        </h4>
                        <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-light">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              );
            })}
          </div>

          {/* Cards Section - Right Side (Desktop Only) */}
          <div className="hidden lg:flex flex-1 justify-center items-center min-h-[500px] md:min-h-[600px] relative w-full overflow-visible">
            <CardSwap
              ref={cardSwapRef}
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={true}
              width={cardWidth}
              height={500}
              easing="power1"
              onIndexChange={(index: number) => setCurrentIndex(index)}
              onCardClick={(index: number) => {
                handleDotClick(index);
              }}
            >
              {content.steps.map((step, index) => {
                const IconComponent = iconMap[step.icon] || Send;
                const supportText = [
                  "We listen first, align on goals, and identify priority legal risks.",
                  "We map options, timelines, and expected outcomes before action starts.",
                  "We execute with consistent updates and a focused path to resolution.",
                ][index] || "You receive clear communication and practical next steps.";

                return (
                  <Card
                    key={step.id}
                    className="bg-white p-10 text-left flex flex-col rounded-3xl border border-slate-100 shadow-xl relative cursor-pointer group hover:border-primary/30 transition-colors"
                    style={{ width: '100%', height: '100%' }}
                    onClick={() => handleDotClick(index)}
                  >
                    <div className="absolute -top-5 -left-5 w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg z-10 ring-4 ring-white">
                      {index + 1}
                    </div>
                    
                    <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-500 self-start text-primary">
                      <IconComponent className="w-7 h-7 transition-transform" />
                    </div>
                    
                    <h4 className="text-2xl font-bold text-secondary mb-4 tracking-tight">
                      {step.title}
                    </h4>
                    
                    <p className="text-slate-600 leading-relaxed mb-6 text-base font-light">
                      {step.description}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-slate-100">
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {supportText}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}
