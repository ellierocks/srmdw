import { getAllGameIds, getGameMetadata } from "@/lib/markdown";
import {
  Database,
  HardDrive,
  FileCode,
  BookOpen,
  ChevronRight,
  Gamepad2,
} from "lucide-react";
import Link from "next/link";
import { siteConfig, typography, strings } from "@/config/site";
import { StaggeredEntry } from "@/components/ui/StaggeredEntry";
import { SidebarUpdater } from "@/components/layout/SidebarContext";

export default function Home() {
  const gameIds = getAllGameIds();
  const games = gameIds
    .filter((id) => id !== "docs")
    .map((id) => getGameMetadata(id));

  const featureIcons = [
    <HardDrive key="hd" className="text-blue" size={24} />,
    <FileCode key="fc" className="text-green" size={24} />,
    <Database key="db" className="text-peach" size={24} />,
    <BookOpen key="bo" className="text-mauve" size={24} />,
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 lg:py-24">
      <SidebarUpdater tree={null} game={null} />
      <StaggeredEntry className="w-full space-y-24 lg:space-y-32">
        <header className="text-center space-y-6">
          <h1 className={typography.frontpage.title}>
            {siteConfig.name}
          </h1>
          <p className={typography.frontpage.subtext}>{strings.home.tagline}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <p className="text-sm font-bold text-subtext1 opacity-80">
              New here? Check out the{" "}
              <span className="text-mauve">Documentation</span> in the sidebar
              to the left.
            </p>
          </div>
        </header>

        <section className="pt-8 lg:pt-16">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-4xl font-black text-text tracking-tighter shrink-0">
              {strings.common.vaultsHeader}
            </h2>
            <div className="h-px bg-surface1 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {games.map((game) => (
              <Link
                key={game.id}
                href={`/${game.id}`}
                className="group flex flex-col space-y-4"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface0 border border-surface1 transition-all group-hover:border-mauve group-hover:shadow-2xl group-hover:shadow-mauve/20 group-hover:-translate-y-1">
                  {game.cover ? (
                    <img
                      src={game.cover}
                      alt={game.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-subtext1 opacity-40">
                      <Gamepad2 size={64} />
                      <span className="text-xs font-black tracking-widest">
                        No Cover Found
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-mantle/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="text-mauve text-sm font-black flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 tracking-tighter">
                      Enter Game <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
                <div className="space-y-1 px-1">
                  <h3 className="text-xl font-black text-text tracking-tight group-hover:text-mauve transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-subtext1 leading-relaxed opacity-60 line-clamp-2 font-bold">
                    {game.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
          {strings.features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              icon={featureIcons[i]}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </StaggeredEntry>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 bg-mantle/50 border border-surface1 hover:border-mauve transition-all space-y-4">
      <div className="w-12 h-12 bg-surface0 flex items-center justify-center border border-surface1 group-hover:border-mauve transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-black tracking-tighter text-text">{title}</h3>
      <p className="text-subtext1 text-sm leading-relaxed opacity-70 font-bold">
        {description}
      </p>
    </div>
  );
}
