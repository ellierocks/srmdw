"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { Search as SearchIcon, FileText, ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { typography, strings } from "@/config/site";
import { motion } from "framer-motion";

interface SearchResult {
  title: string;
  game: string;
  slug: string;
}

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDropdown({ isOpen, onClose }: SearchDropdownProps) {
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState<SearchResult[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data) => setPages(data));
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    if (!search) return [];
    const searchLower = search.toLowerCase();
    return pages
      .filter((page) =>
        `${page.title} ${page.game} ${page.slug}`
          .toLowerCase()
          .includes(searchLower)
      )
      .slice(0, 8);
  }, [search, pages]);

  const handleSelect = (slug: string) => {
    router.push(slug);
    setSearch("");
    onClose();
  };

  const handleClear = () => {
    setSearch("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 z-[50]">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="bg-mantle border border-surface1 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center px-4 bg-surface0/50">
          <SearchIcon
            size={16}
            className="text-mauve mr-3 opacity-70 shrink-0"
          />
          <input
            ref={inputRef}
            type="text"
            placeholder={strings.common.searchPlaceholder}
            className={`${typography.search.input} flex-1 bg-transparent outline-none py-4`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleClear}
            className="p-1.5 text-subtext1 hover:text-text hover:bg-surface1 transition-colors shrink-0"
          >
            <X size={14} />
          </button>
        </div>

        <div className="max-h-[320px] overflow-y-auto border-t border-surface1">
          {!search && (
            <div className={`${typography.search.empty} px-4 py-6`}>
              Type to search pages...
            </div>
          )}

          {search && filteredItems.length === 0 && (
            <div className={`${typography.search.empty} px-4 py-6`}>
              {strings.common.noResults(search)}
            </div>
          )}

          {filteredItems.map((item) => (
            <button
              key={item.slug}
              onClick={() => handleSelect(item.slug)}
              className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-surface0 transition-colors"
            >
              <div className="w-8 h-8 bg-surface1 flex items-center justify-center shrink-0">
                <FileText size={14} className="opacity-60" />
              </div>
              <div className="flex-1 min-w-0">
                <div className={typography.search.itemTitle}>{item.title}</div>
                <div className={typography.search.itemSubtitle}>
                  {item.game.replace(/-/g, " ")}
                  <ChevronRight size={10} className="opacity-50 inline mx-1" />
                  <span className="truncate">{item.slug}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function useSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    const openSearch = () => setOpen(true);
    window.addEventListener("open-search", openSearch);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-search", openSearch);
    };
  }, [open]);

  return { open, setOpen, close: () => setOpen(false) };
}
