import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavPage {
  title: string;
  slug: string[];
  href: string;
}

interface PageNavigationProps {
  prev: NavPage | null;
  next: NavPage | null;
}

export function PageNavigation({ prev, next }: PageNavigationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      className={cn(
        "flex gap-4 pt-8 mt-8 border-t border-surface1",
        !prev && "justify-end",
        !next && "justify-start",
        prev && next && "justify-between"
      )}
    >
      {prev && (
        <Link
          href={prev.href}
          className="group flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg border border-surface1 bg-surface0 hover:border-mauve hover:bg-surface0/80 transition-all"
        >
          <ChevronLeft
            size={18}
            className="shrink-0 text-subtext1 group-hover:text-mauve transition-colors"
          />
          <div className="flex flex-col items-start">
            <span className="text-xs text-subtext1">Previous</span>
            <span className="text-text group-hover:text-mauve transition-colors">
              {prev.title}
            </span>
          </div>
        </Link>
      )}
      {next && (
        <Link
          href={next.href}
          className="group flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg border border-surface1 bg-surface0 hover:border-mauve hover:bg-surface0/80 transition-all"
        >
          <div className="flex flex-col items-end">
            <span className="text-xs text-subtext1">Next</span>
            <span className="text-text group-hover:text-mauve transition-colors">
              {next.title}
            </span>
          </div>
          <ChevronRight
            size={18}
            className="shrink-0 text-subtext1 group-hover:text-mauve transition-colors"
          />
        </Link>
      )}
    </nav>
  );
}
