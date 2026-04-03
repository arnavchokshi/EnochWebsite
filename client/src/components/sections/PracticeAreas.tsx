import { Link } from "react-router-dom";
import { BlurFade } from "@/components/ui/blur-fade";
import { Briefcase, Shield, FileText, Scale, Gavel, Car, Users } from "lucide-react";
import BusinessLawBg from "@/assets/scott-graham-OQMZwNd3ThU-unsplash.jpg";
import PersonalInjuryBg from "@/assets/harlie-raethel-ouyjDk-KdfY-unsplash.jpg";
import EstatePlanningBg from "@/assets/tierra-mallorca-NpTbVOkkom8-unsplash.jpg";
import type { PracticeAreasContent } from "@/lib/api";

interface PracticeAreasProps {
  content: PracticeAreasContent;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  shield: Shield,
  "file-text": FileText,
  scale: Scale,
  gavel: Gavel,
  car: Car,
  users: Users,
};

export function PracticeAreas({ content }: PracticeAreasProps) {
  // Map practice areas to their background images
  const areaImageMap: Record<string, string> = {
    "/practice/business-law": BusinessLawBg,
    "/practice/personal-injury": PersonalInjuryBg,
    "/practice/estate-planning": EstatePlanningBg,
  };

  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden" id="practice-areas">
      <div className="container mx-auto px-6">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              {content.sectionTitle}
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary tracking-tight max-w-2xl mx-auto">
              Strategic representation tailored for high-stakes legal outcomes.
            </h3>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-3 gap-8">
          {content.areas.map((area, index) => {
            const IconComponent = iconMap[area.icon] || Gavel;
            const backgroundImage = areaImageMap[area.link] || BusinessLawBg;
            return (
              <BlurFade key={area.id} delay={0.2 + index * 0.1} inView>
                <Link to={area.link} className="group block h-full">
                  <div className="h-full rounded-3xl overflow-hidden relative bg-slate-50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 group-hover:ring-1 group-hover:ring-slate-200">
                    {/* Image Background with Clean Overlay */}
                    <div 
                      className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/75 group-hover:bg-slate-950/60 transition-colors duration-500 z-0 backdrop-blur-[2px]"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-10 flex flex-col h-full min-h-[320px] md:min-h-[400px]">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 md:mb-8 border border-white/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-tight">
                        {area.title}
                      </h4>
                      
                      <p className="text-white/70 mb-6 md:mb-8 text-sm md:text-base leading-relaxed line-clamp-3 font-light">
                        {area.description}
                      </p>
                      
                      <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                        Learn More
                        <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
