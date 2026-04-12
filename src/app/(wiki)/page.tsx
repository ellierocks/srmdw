import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllGameIds } from "@/lib/markdown";
import { ChevronRight, Gamepad2, Folder, FileText } from "lucide-react";
import Link from "next/link";
import { siteConfig, typography, strings } from "@/config/site";

export default function Home() {
  const gameIds = getAllGameIds();
  const games = gameIds
    .filter((id) => id !== "docs")
    .map((id) => ({ id, metadata: getGameMetadataSafe(id) }));

  const articleCount = countMarkdownFiles();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="text-center mb-16 space-y-4">
        <h1 className={typography.frontpage.title}>{siteConfig.name}</h1>
        <p className={typography.frontpage.subtext}>{strings.home.tagline}</p>
      </header>

      <div className="flex items-center justify-center gap-8 mb-16">
        <StatCard
          icon={<Folder className="text-mauve" size={20} />}
          label="Vaults"
          value={games.length}
        />
        <div className="w-px h-12 bg-surface1" />
        <StatCard
          icon={<FileText className="text-blue" size={20} />}
          label="Articles"
          value={articleCount}
        />
      </div>

      <section>
        <div className="flex items-center gap-6 mb-8">
          <h2 className="text-2xl font-black text-text tracking-tighter shrink-0">
            {strings.common.vaultsHeader}
          </h2>
          <div className="h-px bg-surface1 flex-1"></div>
        </div>

        {games.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Link key={game.id} href={`/${game.id}`} className="group block">
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-surface0 border border-surface1 transition-all group-hover:border-mauve group-hover:-translate-y-1">
                  {game.metadata.cover ? (
                    <img
                      src={game.metadata.cover}
                      alt={game.metadata.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-subtext1 opacity-40">
                      <Gamepad2 size={48} />
                      <span className="text-[10px] font-black tracking-widest">
                        {strings.common.noCoverFound}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-mantle/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="text-mauve text-xs font-black flex items-center gap-1.5 tracking-tight">
                      Enter <ChevronRight size={12} />
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="text-base font-black text-text tracking-tight group-hover:text-mauve transition-colors">
                    {game.metadata.title}
                  </h3>
                  <p className="text-xs text-subtext1 leading-relaxed opacity-60 line-clamp-2">
                    {game.metadata.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-subtext1 opacity-60">
            <p className="text-base font-bold">No game vaults yet.</p>
            <p className="text-xs mt-2">
              Add folders to <code className="text-mauve">/content</code> to get
              started.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 bg-surface0/50 border border-surface1">
      <div className="shrink-0">{icon}</div>
      <div className="flex flex-col">
        <span className="text-2xl font-black text-text tracking-tight">
          {value}
        </span>
        <span className="text-[10px] font-bold text-subtext1 opacity-60 tracking-wide uppercase">
          {label}
        </span>
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

function countMarkdownFiles(): number {
  const contentDir = path.join(process.cwd(), "content");
  if (!fs.existsSync(contentDir)) return 0;

  let count = 0;
  const walk = (dir: string) => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      if (file === "docs") return;
      const fullPath = path.join(dir, file);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith(".md")) {
        count++;
      }
    });
  };
  walk(contentDir);
  return count;
}
