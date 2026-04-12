import { getContentTree } from "@/lib/markdown";
import { SidebarContainer } from "@/components/layout/Sidebar";
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

      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        <TopBar />
        <SmoothScroll className="flex-1 overflow-y-auto relative">
          {children}
        </SmoothScroll>
      </main>
    </div>
  );
}
