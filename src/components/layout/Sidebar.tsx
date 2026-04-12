"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home as HomeIcon, ChevronRight } from "lucide-react";
import { SidebarTree } from "./SidebarTree";
import { FlavorSwitcher } from "./FlavorSwitcher";
import { SettingsDialog } from "./SettingsDialog";
import { typography, strings } from "@/config/site";
import { useSidebar } from "./SidebarContext";
import { PlatformIcon } from "@/components/ui/PlatformIcon";

interface GameMetadata {
  id: string;
  title: string;
  description: string;
  cover?: string;
  platforms?: string[];
}

interface SidebarProps {
  allGames: GameMetadata[];
}

const MIN_WIDTH = 220;
const MAX_WIDTH = 480;
const DEFAULT_WIDTH = 260;

export function Sidebar({ allGames }: SidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const { tree, game: contextGame } = useSidebar();

  // game is from params.game
  const gameId = params.game as string | undefined;
  const activeGameId = contextGame || gameId;

  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const sidebarRef = useRef<HTMLElement>(null);

  // Load width from localStorage on mount
  useEffect(() => {
    const savedWidth = localStorage.getItem("sidebar-width");
    if (savedWidth) {
      setWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, parseInt(savedWidth))));
    }
    setIsMounted(true);
  }, []);

  const startResizing = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    localStorage.setItem("sidebar-width", width.toString());
  }, [width]);

  const resize = useCallback(
    (e: PointerEvent) => {
      if (isResizing) {
        let newWidth = e.clientX;
        if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
        if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;
        setWidth(newWidth);
      }
    },
    [isResizing]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("pointermove", resize);
      window.addEventListener("pointerup", stopResizing);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      window.removeEventListener("pointermove", resize);
      window.removeEventListener("pointerup", stopResizing);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    return () => {
      window.removeEventListener("pointermove", resize);
      window.removeEventListener("pointerup", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  return (
    <motion.aside
      ref={sidebarRef}
      style={{ width: isMounted ? width : DEFAULT_WIDTH }}
      className="relative bg-mantle flex flex-col sticky top-0 h-screen shrink-0 overflow-hidden z-[40]"
      initial={false}
    >
      {/* Sidebar Top Spacer - matches layout header height */}
      <div className="h-[80px] border-b border-surface1 shrink-0" />

      {/* Main Sidebar Content - Vertical line only below the header */}
      <div className="flex-1 flex flex-col border-r border-surface1 overflow-hidden">
        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide py-6">
          <div className="px-4 mb-8">
            <div className={`px-3 mb-2 ${typography.sidebar.header}`}>
              {strings.common.navigationHeader}
            </div>
            <div className="space-y-1">
              <SidebarLink
                href="/"
                icon={<HomeIcon size={16} />}
                label={strings.common.backToHome}
                isActive={pathname === "/"}
              />
            </div>
          </div>

          <div className="px-4 mb-8">
            <div className={`px-3 mb-2 ${typography.sidebar.header}`}>
              {strings.common.activeVaultsHeader}
            </div>
            <div className="space-y-1">
              {allGames.map((g) => {
                const isActive = pathname.startsWith(`/${g.id}`);
                const isFullyActive = activeGameId === g.id;

                return (
                  <div key={g.id} className="space-y-1">
                    <SidebarLink
                      href={`/${g.id}`}
                      icon={
                        <PlatformIcon platforms={g.platforms || []} size={16} />
                      }
                      label={g.title}
                      isActive={isActive}
                    />

                    <AnimatePresence>
                      {isFullyActive && tree && tree.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden ml-4 border-l border-surface1/50 my-1"
                        >
                          <SidebarTree items={tree} game={g.id} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 bg-crust/50 border-t border-surface1 space-y-4 shrink-0">
          <div className="flex items-center justify-center gap-2">
            <FlavorSwitcher />
            <SettingsDialog />
          </div>
        </div>
      </div>

      {/* Resize Handle - Start below 80px */}
      <div
        onPointerDown={startResizing}
        className={`absolute right-0 top-[80px] bottom-0 w-1 cursor-col-resize hover:bg-mauve/30 active:bg-mauve transition-colors z-50 ${isResizing ? "bg-mauve" : ""}`}
      />
    </motion.aside>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 transition-all ${typography.sidebar.entry} ${
        isActive
          ? "bg-mauve text-base shadow-lg shadow-mauve/20 border-l-2 border-mauve"
          : "text-subtext1 hover:bg-surface0 hover:text-mauve border-l-2 border-transparent"
      }`}
    >
      <div
        className={`shrink-0 transition-colors flex items-center justify-center w-4 h-4 ${
          isActive ? "text-base" : "text-subtext1 group-hover:text-mauve"
        }`}
      >
        {icon}
      </div>
      <span className="truncate">{label}</span>
      {isActive && <ChevronRight className="ml-auto w-3 h-3 opacity-50" />}
    </Link>
  );
}
