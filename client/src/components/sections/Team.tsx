import { BlurFade } from "@/components/ui/blur-fade";
import type { TeamContent } from "@/lib/api";

interface TeamProps {
  content: TeamContent;
}

export function Team({ content }: TeamProps) {
  return (
    <section className="py-24 md:py-32 bg-white" id="team">
      <div className="container mx-auto px-6">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Our Expertise
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-secondary max-w-2xl mx-auto tracking-tight">
              {content.sectionTitle}
            </h3>
          </div>
        </BlurFade>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-20">
            {content.members.map((member, index) => (
              <BlurFade key={member.id} delay={0.3 + index * 0.1} inView>
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                  <div className="relative group w-full md:w-2/5 max-w-sm mx-auto md:mx-0">
                    <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-slate-50 ring-1 ring-primary/20 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2">
                      <img
                        src={member.image.startsWith("http") || member.image.startsWith("/images") ? member.image : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=0f172a`}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-3 tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-8">
                      {member.role}
                    </p>
                    <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-primary/10 relative">
                      <div className="absolute -top-4 -left-4 text-6xl text-primary/30 font-serif leading-none opacity-50">"</div>
                      <p className="text-slate-600 leading-relaxed text-lg font-light relative z-10">
                        {member.bio}
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
