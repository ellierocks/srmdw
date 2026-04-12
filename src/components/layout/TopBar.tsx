"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { siteConfig, strings } from "@/config/site";
import {
  Search as SearchIcon,
  FileText,
  ChevronRight,
  X,
  PanelLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { typography } from "@/config/site";
import { motion } from "framer-motion";
import { useSettings } from "@/components/providers/SettingsProvider";
import { SettingsDialog } from "./SettingsDialog";

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

interface SearchResult {
  title: string;
  game: string;
  slug: string;
}

export function TopBar() {
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState<SearchResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings, updateSetting } = useSettings();

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data) => setPages(data));
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredItems = useMemo(() => {
    if (!search.trim()) return [];
    const searchLower = search.toLowerCase();
    return pages
      .filter((page) =>
        `${page.title} ${page.game} ${page.slug}`
          .toLowerCase()
          .includes(searchLower)
      )
      .slice(0, 6);
  }, [search, pages]);

  const handleSelect = (slug: string) => {
    router.push(slug);
    setSearch("");
    setIsFocused(false);
  };

  const showResults = isFocused && search.trim().length > 0;

  return (
    <div className="sticky top-0 z-[30] bg-mantle border-b border-surface1 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() =>
            updateSetting("sidebarVisible", !settings.sidebarVisible)
          }
          className="flex items-center justify-center w-[42px] h-[42px] bg-surface0 border border-surface1 text-subtext1 hover:text-mauve hover:bg-surface1 transition-all shrink-0"
          title={settings.sidebarVisible ? "Hide sidebar" : "Show sidebar"}
        >
          <PanelLeft size={18} />
        </button>

        <div ref={containerRef} className="relative flex-1 max-w-3xl mx-auto">
          <div
            className={`flex items-center gap-3 px-5 h-[48px] bg-surface0 border transition-colors ${
              isFocused
                ? "border-mauve bg-surface1"
                : "border-surface1 hover:border-mauve"
            }`}
          >
            <SearchIcon
              size={18}
              className={`opacity-50 shrink-0 ${isFocused ? "text-mauve opacity-100" : ""}`}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder={strings.common.searchPlaceholder}
              className="flex-1 bg-transparent outline-none text-subtext1 text-sm font-medium placeholder:text-subtext1 placeholder:opacity-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsFocused(true)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="p-1 text-subtext1 hover:text-text transition-colors"
              >
                <X size={16} />
              </button>
            )}
            <span className="text-[10px] font-black opacity-50 tracking-widest shrink-0">
              ⌘K
            </span>
          </div>

          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-mantle border border-surface1 shadow-2xl overflow-hidden"
            >
              <div className="max-h-[300px] overflow-y-auto">
                {filteredItems.length === 0 ? (
                  <div
                    className={`px-4 py-6 text-center ${typography.search.empty}`}
                  >
                    {strings.common.noResults(search)}
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <button
                      key={item.slug}
                      onClick={() => handleSelect(item.slug)}
                      className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-surface0 transition-colors border-t border-surface1 first:border-t-0"
                    >
                      <div className="w-8 h-8 bg-surface1 flex items-center justify-center shrink-0">
                        <FileText size={14} className="opacity-60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={typography.search.itemTitle}>
                          {item.title}
                        </div>
                        <div className={typography.search.itemSubtitle}>
                          {item.game.replace(/-/g, " ")}
                          <ChevronRight
                            size={10}
                            className="opacity-50 inline mx-1"
                          />
                          <span className="truncate">{item.slug}</span>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <SettingsDialog />

          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            className="flex items-center justify-center w-[42px] h-[42px] bg-surface0 border border-surface1 text-subtext1 hover:text-mauve hover:bg-surface1 transition-all"
          >
            <GithubIcon size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
