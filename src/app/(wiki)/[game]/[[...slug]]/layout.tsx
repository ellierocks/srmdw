import { getGameMetadata } from "@/lib/markdown";
import { GameInfoProvider } from "@/components/layout/GameInfoContext";
import { GameInfoCard } from "@/components/ui/GameInfoCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import fs from "fs";
import path from "path";

export default async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ game: string; slug?: string[] }>;
}) {
  const { game, slug = [] } = await params;

  const gamePath = path.join(process.cwd(), "content", game);
  const isGameFolder =
    fs.existsSync(gamePath) && fs.statSync(gamePath).isDirectory();

  if (!isGameFolder) {
    return <div className="p-8 text-center text-subtext1">Game not found</div>;
  }

  const fullPath = [game, ...slug];
  const isRootPage = slug.length === 0;
  const gameMeta = isRootPage ? getGameMetadata(game) : null;

  return (
    <GameInfoProvider gameMeta={gameMeta}>
      <div className="w-full mx-auto px-4 sm:px-8 py-8 lg:py-12">
        <div className="flex gap-12">
          <div className="flex-1 min-w-0">
            <nav className="flex items-center gap-1.5 text-[10px] font-black text-overlay1 tracking-widest mb-10 opacity-60 group">
              <Link href="/" className="hover:text-mauve transition-colors">
                Home
              </Link>
              {fullPath.map((part, index) => {
                const href = "/" + fullPath.slice(0, index + 1).join("/");
                const isLast = index === fullPath.length - 1;

                const folderPath = path.join(
                  process.cwd(),
                  "content",
                  ...fullPath.slice(0, index + 1),
                  "index.md"
                );
                const hasIndex = fs.existsSync(folderPath);

                return (
                  <div key={index} className="flex items-center gap-1.5">
                    <ChevronRight size={10} className="text-overlay0" />
                    {isLast || !hasIndex ? (
                      <span
                        className={
                          isLast ? "text-mauve font-black" : "text-overlay1"
                        }
                      >
                        {part.replace(/-/g, " ")}
                      </span>
                    ) : (
                      <Link
                        href={href}
                        className="hover:text-mauve transition-colors"
                      >
                        {part.replace(/-/g, " ")}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="relative">{children}</div>
          </div>

          {isRootPage && gameMeta && (
            <div className="w-80 shrink-0 hidden xl:block">
              <GameInfoCard metadata={gameMeta} />
            </div>
          )}
        </div>
      </div>
    </GameInfoProvider>
  );
}
