"use client";

import { useEffect, useState, useMemo } from "react";
import { Command } from "cmdk";
import { Search as SearchIcon, FileText, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { typography, strings } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  title: string;
  game: string;
  slug: string;
}

export default function Search() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState<SearchResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    const openSearch = () => setOpen(true);
    window.addEventListener("open-search", openSearch);

    // Fetch index
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data) => setPages(data));

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-search", openSearch);
    };
  }, []);

  const filteredItems = useMemo(() => {
    if (!search) return [];
    const searchLower = search.toLowerCase();
    return pages
      .filter((page) =>
        `${page.title} ${page.game} ${page.slug}`
          .toLowerCase()
          .includes(searchLower)
      )
      .slice(0, 10);
  }, [search, pages]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-base/60 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl"
          >
            <Command
              className="w-full bg-mantle border border-surface1 shadow-2xl overflow-hidden flex flex-col rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center px-6 bg-surface0/50">
                <SearchIcon size={18} className="text-mauve mr-4 opacity-70" />
                <Command.Input
                  autoFocus
                  placeholder={strings.common.searchPlaceholder}
                  className={typography.search.input}
                  value={search}
                  onValueChange={setSearch}
                />
              </div>

              <Command.List className="max-h-[50vh] overflow-y-auto p-3 scrollbar-hide border-t border-surface1">
                <Command.Empty className={typography.search.empty}>
                  {strings.common.noResults(search)}
                </Command.Empty>

                {filteredItems.map((item) => (
                  <Command.Item
                    key={item.slug}
                    onSelect={() => {
                      router.push(item.slug);
                      setOpen(false);
                    }}
                    className="flex items-center gap-4 px-4 py-3 cursor-pointer aria-selected:bg-mauve/10 aria-selected:text-mauve group transition-all rounded-md"
                  >
                    <div className="w-8 h-8 rounded bg-surface0 flex items-center justify-center shrink-0 border border-surface1 group-aria-selected:border-mauve/30 transition-colors">
                      <FileText
                        size={16}
                        className="opacity-60 group-aria-selected:opacity-100"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className={typography.search.itemTitle}>
                        {item.title}
                      </div>
                      <div className={typography.search.itemSubtitle}>
                        {item.game.replace(/-/g, " ")}
                        <ChevronRight size={10} className="opacity-50" />
                        <span className="truncate">{item.slug}</span>
                      </div>
                    </div>
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
