"use client";

import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { typography } from "@/config/site";

interface TreeItem {
  title: string;
  slug: string[];
  isFolder?: boolean;
  hasIndex?: boolean;
  children?: TreeItem[];
}

interface SidebarTreeProps {
  items: TreeItem[];
  game: string;
  depth?: number;
}

export function SidebarTree({ items, game, depth = 0 }: SidebarTreeProps) {
  const pathname = usePathname();

  return (
    <div
      className={`space-y-0.5 ${
        depth > 0 ? "ml-[11px] mt-0.5 border-l border-surface1/50 pl-2" : "pl-2"
      }`}
    >
      {items.map((item) => (
        <TreeElement
          key={item.slug.join("-")}
          item={item}
          game={game}
          depth={depth}
          pathname={pathname}
        />
      ))}
    </div>
  );
}

function TreeElement({
  item,
  game,
  depth,
  pathname,
}: {
  item: TreeItem;
  game: string;
  depth: number;
  pathname: string;
}) {
  const href =
    item.slug.length > 0 ? `/${game}/${item.slug.join("/")}` : `/${game}`;
  const isChildActive = pathname.startsWith(href + "/") || pathname === href;
  const [isOpen, setIsOpen] = useState(isChildActive);
  const isActive = pathname === href;

  if (item.isFolder) {
    return (
      <div className="select-none">
        <div
          className={`group flex items-center transition-all rounded-sm overflow-hidden ${
            isActive ? "bg-mauve/10" : "hover:bg-surface0"
          }`}
        >
          {/* Chevron button: Only toggles open/close */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className={`flex items-center justify-center w-8 h-8 shrink-0 transition-colors ${
              isOpen
                ? "text-mauve"
                : "text-subtext1 group-hover:text-mauve opacity-40 group-hover:opacity-100"
            }`}
          >
            <ChevronRight
              size={14}
              className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
            />
          </button>

          {/* Label: Link to folder index if it exists, otherwise just a label */}
          {item.hasIndex ? (
            <Link
              href={href}
              className={`flex-1 py-1.5 pr-2 truncate text-left transition-colors ${typography.sidebar.entry} ${
                isActive
                  ? "text-mauve font-black"
                  : "text-subtext1 group-hover:text-mauve"
              }`}
            >
              {item.title}
            </Link>
          ) : (
            <span
              className={`flex-1 py-1.5 pr-2 truncate text-left opacity-60 italic cursor-default ${typography.sidebar.entry}`}
            >
              {item.title}
            </span>
          )}
        </div>

        {isOpen && item.children && (
          <SidebarTree items={item.children} game={game} depth={depth + 1} />
        )}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 transition-all group border-l-2 rounded-sm ${
        isActive
          ? "bg-mauve text-base font-bold border-mauve shadow-lg shadow-mauve/10"
          : "text-subtext1 hover:bg-surface0 hover:text-mauve border-transparent"
      }`}
    >
      <FileText
        size={14}
        className={`shrink-0 transition-colors ${
          isActive
            ? "text-base"
            : "text-subtext1 group-hover:text-mauve opacity-40"
        }`}
      />
      <span className={`truncate ${typography.sidebar.entry}`}>
        {item.title}
      </span>
    </Link>
  );
}
