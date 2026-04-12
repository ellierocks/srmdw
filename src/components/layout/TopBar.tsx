"use client";

import { siteConfig } from "@/config/site";
import { Search } from "lucide-react";
import { SearchTrigger } from "@/components/search/SearchTrigger";

const GithubIcon = ({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export function TopBar() {
  return (
    <div className="sticky top-0 z-[30] bg-mantle border-b border-surface1 px-6 py-4 flex items-center justify-center h-[80px]">
      <SearchTrigger className="flex items-center gap-3 px-5 h-[48px] bg-surface0 border border-surface1 hover:border-mauve hover:bg-surface1 transition-colors text-subtext1 w-full max-w-3xl text-sm font-medium group">
        <Search
          size={18}
          className="opacity-50 group-hover:opacity-100 group-hover:text-mauve transition-all shrink-0"
        />
        <span className="truncate">Search wiki...</span>
        <span className="ml-auto text-[10px] font-black opacity-50 tracking-widest shrink-0">
          ⌘K
        </span>
      </SearchTrigger>

      <a
        href={siteConfig.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub Repository"
        className="absolute right-6 flex items-center justify-center w-[42px] h-[42px] bg-surface0 border border-surface1 text-subtext1 hover:text-mauve hover:bg-surface1 transition-all"
      >
        <GithubIcon size={20} />
      </a>
    </div>
  );
}
