import { BlurFade } from "@/components/ui/blur-fade";
import type { TeamContent } from "@/lib/api";

interface TeamProps {
  content: TeamContent;
}

export function Team({ content }: TeamProps) {
  return (
    <section className="py-32 bg-white" id="team">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-24">
            <h2 className="text-sm uppercase tracking-[0.4em] font-bold text-primary mb-4">
              Our Expertise
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-secondary max-w-2xl mx-auto">
              {content.sectionTitle}
            </h3>
          </div>
        </BlurFade>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-1 gap-16">
            {content.members.map((member, index) => (
              <BlurFade key={member.id} delay={0.3 + index * 0.1} inView>
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                  <div className="relative group w-full md:w-1/3">
                    <div className="absolute -inset-4 border-2 border-primary/20 -z-10 group-hover:inset-0 transition-all duration-500"></div>
                    <div className="aspect-[4/5] overflow-hidden bg-gray-100 border-[12px] border-white shadow-xl">
                      <img
                        src={member.image.startsWith("http") || member.image.startsWith("/images") ? member.image : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=c9a227`}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-block h-px w-12 bg-primary mb-6"></div>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-2">
                      {member.name}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.3em] font-bold text-primary mb-8">
                      {member.role}
                    </p>
                    <div className="bg-slate-50 p-8 md:p-10 border-l-4 border-primary shadow-sm">
                      <p className="text-gray-600 leading-relaxed font-medium italic text-lg">
                        "{member.bio}"
                      </p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
