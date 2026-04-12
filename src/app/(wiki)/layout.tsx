import { getAllGameIds, getGameMetadata } from "@/lib/markdown";
import { Sidebar } from "@/components/layout/Sidebar";
import Search from "@/components/search/Search";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import { siteConfig } from "@/config/site";
import { Timer } from "lucide-react";
import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export default async function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gameIds = getAllGameIds();
  const allGames = gameIds.map((id) => getGameMetadata(id));

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-base text-text overflow-hidden">
        {/* Global Sidebar Container */}
        <div className="relative flex shrink-0">
          <Sidebar allGames={allGames} />

          {/* Persistent Header - Static over the Sidebar's top spacer */}
          <div className="absolute top-0 left-0 right-0 h-[80px] flex items-center justify-between px-6 z-[50] pointer-events-none">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-black text-mauve tracking-tighter group pointer-events-auto shrink-0"
            >
              <Timer
                size={24}
                className="group-hover:rotate-12 transition-transform"
              />
              <span>
                {siteConfig.name}
              </span>
            </Link>
          </div>
        </div>

        <main className="flex-1 flex flex-col h-full relative overflow-hidden">
          <Search />
          <TopBar allGames={allGames} />
          {/* This div is the ONLY scrollable area for content */}
          <SmoothScroll className="flex-1 overflow-y-auto relative">
            {children}
          </SmoothScroll>
        </main>
      </div>
    </SidebarProvider>
  );
}
