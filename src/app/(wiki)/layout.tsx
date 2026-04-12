import { getContentTree } from "@/lib/markdown";
import { SidebarContainer } from "@/components/layout/Sidebar";
import { SidebarShowButton } from "@/components/layout/SidebarShowButton";
import Search from "@/components/search/Search";
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
  const tree = getContentTree();

  return (
    <div className="flex h-screen bg-base text-text overflow-hidden">
      <SidebarContainer tree={tree} />

      <div className="absolute top-0 left-0 right-0 h-[80px] flex items-center justify-between px-6 z-[50] pointer-events-none">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black text-mauve tracking-tighter group pointer-events-auto shrink-0"
        >
          <Timer
            size={24}
            className="group-hover:rotate-12 transition-transform"
          />
          <span>{siteConfig.name}</span>
        </Link>
      </div>

      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        <Search />
        <TopBar />
        <SmoothScroll className="flex-1 overflow-y-auto relative">
          {children}
        </SmoothScroll>
      </main>

      <SidebarShowButton />
    </div>
  );
}
