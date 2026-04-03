import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { Badge } from "@/components/ui/badge";
import type { BlogContent } from "@/lib/api";
import tierraMallorca from "@/assets/tierra-mallorca-NpTbVOkkom8-unsplash.jpg";
import scottGraham from "@/assets/scott-graham-OQMZwNd3ThU-unsplash.jpg";
import lanceAsper from "@/assets/lance-asper-9fxD3UW_C1I-unsplash.jpg";

interface BlogMarqueeProps {
  content: BlogContent;
}

// Map blog post IDs to images
const postImageMap: Record<string, string> = {
  "1": tierraMallorca, // Pet Trust Lawyer - Estate Planning
  "2": scottGraham, // Car Accident Claim - Personal Injury
  "3": lanceAsper, // Fractional General Counsel - Business Law
};

export function BlogMarquee({ content }: BlogMarqueeProps) {
  return (
    <section className="py-16 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <BlurFade delay={0.1} inView>
          <div className="text-center">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Latest Insights
            </h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-6 tracking-tight">
              {content.sectionTitle}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              {content.sectionDescription}
            </p>
          </div>
        </BlurFade>
      </div>

      <BlurFade delay={0.3} inView>
        <Marquee pauseOnHover className="py-4">
          {content.posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              className="mx-4 group block"
            >
              <div className="w-[340px] bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-slate-200">
                <div className="h-48 relative overflow-hidden bg-slate-100">
                  {postImageMap[post.id] ? (
                    <img
                      src={postImageMap[post.id]}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl opacity-20">⚖️</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="p-8">
                  <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none font-medium px-3 py-1">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-secondary mb-3 line-clamp-2 group-hover:text-primary transition-colors tracking-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-400">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <span className="text-slate-400 group-hover:text-slate-950 transition-colors group-hover:translate-x-1 transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </Marquee>
      </BlurFade>
    </section>
  );
}
