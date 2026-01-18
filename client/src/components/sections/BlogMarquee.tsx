import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { Badge } from "@/components/ui/badge";
import type { BlogContent } from "@/lib/api";
import tierraMallorca from "@/assets/tierra-mallorca-NpTbVOkkom8-unsplash.jpg";
import scottGraham from "@/assets/scott-graham-OQMZwNd3ThU-unsplash.jpg";
import lanceAsper from "@/assets/lance-asper-9fxD3UW_C1I-unsplash.jpg";
import harlieRaethel from "@/assets/harlie-raethel-ouyjDk-KdfY-unsplash.jpg";

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
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <BlurFade delay={0.1} inView>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {content.sectionTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
              className="mx-4 group"
            >
              <div className="w-80 bg-card rounded-xl border border-border overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <div className="h-48 relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  {postImageMap[post.id] ? (
                    <img
                      src={postImageMap[post.id]}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl opacity-30">⚖️</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {post.category}
                  </Badge>
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </Marquee>
      </BlurFade>
    </section>
  );
}
