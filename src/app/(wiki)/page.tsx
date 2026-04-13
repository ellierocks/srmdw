import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ChevronRight, Gamepad2, FileText, Zap, GitBranch } from "lucide-react";
import Link from "next/link";
import { siteConfig, typography, strings } from "@/config/site";

const featureIcons: Record<string, React.ReactNode> = {
  "Local First": <FileText size={24} />,
  "Markdown Native": <FileText size={24} />,
  "Static & Fast": <Zap size={24} />,
  Contribute: <GitBranch size={24} />,
};

export default function Home() {
  const featured = getGameMetadataSafe(siteConfig.featuredGame);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-[70%] flex flex-col justify-center">
          <header className="space-y-6">
            <h1 className={typography.frontpage.title}>{siteConfig.title}</h1>
            <p className="text-2xl max-w-2xl leading-relaxed text-subtext1 font-bold">
              {strings.home.tagline}
            </p>
          </header>
        </div>

        <div className="lg:w-[30%]">
          <div className="flex items-center gap-6 mb-6">
            <h2 className="text-xl font-black text-text tracking-tighter shrink-0">
              {strings.common.featuredVaultHeader}
            </h2>
            <div className="h-px bg-surface1 flex-1"></div>
          </div>

          {featured.title ? (
            <Link href={`/${siteConfig.featuredGame}`} className="group block">
              <div className="relative aspect-[2/3] w-full max-w-[200px] overflow-hidden bg-surface0 border border-surface1 transition-all group-hover:border-mauve group-hover:-translate-y-1">
                {featured.cover ? (
                  <img
                    src={featured.cover}
                    alt={featured.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-subtext1 opacity-40">
                    <Gamepad2 size={32} />
                    <span className="text-[10px] font-black tracking-widest">
                      {strings.common.noCoverFound}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-mantle/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div className="text-mauve text-xs font-black flex items-center gap-1 tracking-tight">
                    Enter <ChevronRight size={10} />
                  </div>
                </div>
              </div>
              <div className="mt-2 space-y-0.5 max-w-[200px]">
                <h3 className="text-sm font-black text-text tracking-tight group-hover:text-mauve transition-colors line-clamp-1">
                  {featured.title}
                </h3>
                <p className="text-[11px] text-subtext1 leading-relaxed opacity-60 line-clamp-2">
                  {featured.description}
                </p>
              </div>
            </Link>
          ) : (
            <div className="text-center py-8 text-subtext1 opacity-60">
              <p className="text-sm font-bold">No featured vault.</p>
              <p className="text-xs mt-2">
                Set <code className="text-mauve">featuredGame</code> in{" "}
                <code className="text-mauve">site.ts</code>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-24 pt-16 border-t border-surface1">
        <h2 className="text-2xl font-black text-text tracking-tight mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {strings.features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-surface0 border border-surface1 hover:border-mauve/50 transition-colors"
            >
              <div className="w-12 h-12 bg-mauve/10 border border-mauve/20 flex items-center justify-center mb-4 text-mauve">
                {featureIcons[feature.title] || <FileText size={24} />}
              </div>
              <h3 className="text-base font-black text-text mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-subtext1 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface GameMetadata {
  title: string;
  description: string;
  cover?: string;
}

function getGameMetadataSafe(id: string): GameMetadata {
  const indexPath = path.join(process.cwd(), "content", id, "index.md");
  let title = id.replace(/-/g, " ");
  let description = "";
  let cover: string | undefined = undefined;

  if (fs.existsSync(indexPath)) {
    const fileContents = fs.readFileSync(indexPath, "utf8");
    const { data } = matter(fileContents);
    title = data.title || title;
    description = data.description || description;
    cover =
      typeof data.cover === "string" && data.cover.trim().length > 0
        ? data.cover
        : undefined;
  }

  return { title, description, cover };
}
