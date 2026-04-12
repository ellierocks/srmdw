"use client";

import { Search as SearchIcon } from "lucide-react";
import { strings } from "@/config/site";

export function QuickSearchTrigger() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
      className="pointer-events-auto flex items-center justify-center w-8 h-8 bg-surface0 text-subtext1 hover:text-mauve hover:bg-surface1 transition-all border border-surface1 group ml-4"
      title={strings.common.quickSearch + " (⌘K)"}
    >
      <SearchIcon size={14} className="opacity-50 group-hover:opacity-100" />
    </button>
  );
}
