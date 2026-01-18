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
    <section className="py-32 bg-white relative overflow-hidden" id="practice-areas">
      {/* Subtle background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 skew-x-[-12deg] translate-x-1/2 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-24">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-primary"></div>
              <h2 className="text-2xl md:text-3xl uppercase tracking-[0.4em] font-bold text-primary">
                {content.sectionTitle}
              </h2>
              <div className="h-[1px] w-12 bg-primary"></div>
            </div>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-3 gap-12">
          {content.areas.map((area, index) => {
            const IconComponent = iconMap[area.icon] || Gavel;
            const backgroundImage = areaImageMap[area.link] || BusinessLawBg; // Default to BusinessLaw if not found
            return (
              <BlurFade key={area.id} delay={0.2 + index * 0.1} inView>
                <Link to={area.link} className="group">
                  <div 
                    className="p-10 text-center flex flex-col items-center h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
                    style={{
                      backgroundImage: `url(${backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-white/85 group-hover:bg-white/75 transition-all duration-500 z-0"></div>
                    
                    {/* Content wrapper with relative positioning */}
                    <div className="relative z-10 w-full flex flex-col items-center h-full">
                      <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors duration-500 border-2 border-gray-200 group-hover:border-primary/30 shadow-lg">
                        <IconComponent className="w-10 h-10 text-primary transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      
                      <h4 className="text-2xl font-serif font-bold text-secondary mb-4">
                        {area.title}
                      </h4>
                      
                      <p className="text-gray-600 mb-8 leading-relaxed line-clamp-3">
                        {area.description}
                      </p>
                      
                      <div className="mt-auto text-[11px] uppercase tracking-[0.25em] font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                        Learn More
                        <span className="text-lg leading-none">→</span>
                      </div>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary transition-all duration-500 group-hover:w-full"></div>
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
