"use client";

import { useParams } from "next/navigation";
import { siteConfig, strings } from "@/config/site";
import { User, Building2, Calendar, Monitor, Search } from "lucide-react";
import React from "react";
import { GameMetadata } from "@/lib/markdown";
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

export function TopBar({ allGames }: { allGames: GameMetadata[] }) {
  const params = useParams();
  const gameId = params.game as string | undefined;
  const gameMeta = allGames.find((g) => g.id === gameId);

  return (
    <div className="sticky top-0 z-[30] bg-mantle border-b border-surface1 px-6 py-4 flex items-center justify-between h-[80px]">
      {/* Game Metadata - Left side */}
      <div className="flex items-center gap-10 overflow-hidden">
        {gameMeta && (
          <div className="flex flex-wrap gap-x-10 gap-y-2 items-center">
            <HeaderItem
              icon={<User size={13} />}
              label={strings.metadata.developer}
              value={gameMeta.developer}
            />
            <HeaderItem
              icon={<Building2 size={13} />}
              label={strings.metadata.publisher}
              value={gameMeta.publisher}
            />
            <HeaderItem
              icon={<Calendar size={13} />}
              label={strings.metadata.released}
              value={gameMeta.releaseDate}
            />
            <HeaderItem
              icon={<Monitor size={13} />}
              label={strings.metadata.platforms}
              value={gameMeta.platforms?.join(", ")}
            />
          </div>
        )}
      </div>

      {/* Search & GitHub - Right side */}
      <div className="flex items-center justify-end gap-4 shrink-0">
        <SearchTrigger className="hidden sm:flex items-center gap-3 px-4 h-[42px] bg-surface0 border border-surface1 hover:border-mauve hover:bg-surface1 transition-colors text-subtext1 rounded-sm w-48 md:w-64 lg:w-80 xl:w-96 text-sm font-medium group">
          <Search
            size={16}
            className="opacity-50 group-hover:opacity-100 group-hover:text-mauve transition-all"
          />
          <span className="truncate">Search wiki...</span>
          <span className="ml-auto text-[10px] font-black opacity-50 tracking-widest hidden sm:block">
            ⌘K
          </span>
        </SearchTrigger>

        <a
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Repository"
          className="flex items-center justify-center w-[42px] h-[42px] bg-surface0 border border-surface1 text-subtext1 hover:text-mauve hover:bg-surface1 transition-all group rounded-sm shrink-0"
        >
          <GithubIcon
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
        </a>
      </div>
    </div>
  );
}

function HeaderItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <div className="text-mauve opacity-50 bg-mauve/5 p-1.5 rounded-sm">
        {icon}
      </div>
      <div>
        <div className="text-[9px] font-black text-overlay1 tracking-widest uppercase opacity-40 leading-none mb-1">
          {label}
        </div>
        <div className="text-[12px] font-bold text-text/80 leading-none">
          {value || strings.metadata.unknown}
        </div>
      </div>
    </div>
  );
}
