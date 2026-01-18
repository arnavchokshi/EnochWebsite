import { useRef, useState, useEffect } from "react";
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll through steps
  useEffect(() => {
    if (isAutoPlaying) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % content.steps.length);
      }, 5000);
    } else {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoPlaying, content.steps.length]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      const next = (prev + 1) % content.steps.length;
      // Restart auto-play after a delay
      setTimeout(() => setIsAutoPlaying(true), 8000);
      return next;
    });
  };

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      const prevIndex = (prev - 1 + content.steps.length) % content.steps.length;
      // Restart auto-play after a delay
      setTimeout(() => setIsAutoPlaying(true), 8000);
      return prevIndex;
    });
  };

  return (
    <section className="py-16 md:py-32 bg-slate-50 relative overflow-hidden" id="how-it-works">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-[600px]">
          {/* Title Section - Left Side */}
          <BlurFade delay={0.1} inView className="flex-1 lg:max-w-md">
            <div className="mb-4">
              <h2 className="text-sm uppercase tracking-[0.4em] font-bold text-primary mb-4">
                Our Process
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-secondary mb-6">
                {content.sectionTitle}
              </h3>
              <p className="mt-6 text-base md:text-lg text-gray-500 mb-8">
                {content.sectionDescription}
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={handlePrevious}
                className="w-12 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center group"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform" />
              </button>
              
              {/* Indicator dots */}
              <div className="flex gap-2">
                {content.steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(index);
                      // Restart auto-play after a delay
                      setTimeout(() => setIsAutoPlaying(true), 8000);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-8 bg-primary' 
                        : 'w-2 bg-gray-300 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center group"
                aria-label="Next step"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-[2px] transition-transform" />
              </button>
            </div>

            {/* Current Step Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-secondary mb-4">
                {content.steps[currentIndex].title}
              </h4>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {content.steps[currentIndex].description}
              </p>
            </div>
          </BlurFade>

          {/* Cards Section - Right Side */}
          <div className="flex-1 flex justify-center items-center min-h-[600px] relative">
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={true}
              width={400}
              height={500}
              easing="power1"
              onCardClick={(index: number) => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
                setTimeout(() => setIsAutoPlaying(true), 8000);
              }}
            >
              {content.steps.map((step, index) => {
                const IconComponent = iconMap[step.icon] || Send;
                return (
                  <Card
                    key={step.id}
                    className="bg-white p-10 text-center flex flex-col items-center border border-gray-100 shadow-xl relative cursor-pointer"
                    style={{ width: '100%', height: '100%' }}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-white rounded-none flex items-center justify-center font-serif font-bold text-xl shadow-lg z-10">
                      {index + 1}
                    </div>
                    <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-primary/10 transition-colors">
                      <IconComponent className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="text-xl font-serif font-bold text-secondary mb-4">
                      {step.title}
                    </h4>
                    <p className="text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
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
