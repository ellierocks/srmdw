import { getGameMetadata } from "@/lib/markdown";
import { GameInfoProvider } from "@/components/layout/GameInfoContext";
import { GameInfoCard } from "@/components/ui/GameInfoCard";
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

  const isRootPage = slug.length === 0;
  const gameMeta = isRootPage ? getGameMetadata(game) : null;

  return (
    <GameInfoProvider gameMeta={gameMeta}>
      <div className="w-full mx-auto px-4 sm:px-8 py-8 lg:py-12">
        <div className="flex gap-12">
          <div className="flex-1 min-w-0">
            <div className="relative">{children}</div>
          </div>

          {isRootPage && gameMeta && game !== "docs" && (
            <div className="w-80 shrink-0 hidden xl:block">
              <GameInfoCard metadata={gameMeta} />
            </div>
          )}
        </div>
      </div>
    </GameInfoProvider>
  );
}
