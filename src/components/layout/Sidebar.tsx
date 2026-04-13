"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Home as HomeIcon, TagsIcon } from "lucide-react";
import { useSettings } from "@/components/providers/SettingsProvider";
import { typography, strings } from "@/config/site";
import { SidebarTree } from "./SidebarTree";
import { TableOfContents } from "./TableOfContents";
import { KoFiButton } from "./KoFiButton";

const MIN_WIDTH = 280;
const MAX_WIDTH = 480;
const DEFAULT_WIDTH = 300;

const MIN_TOC_HEIGHT = 200;
const MAX_TOC_HEIGHT_RATIO = 0.8;
const DEFAULT_TOC_HEIGHT = 400;

interface SidebarProps {
  tree: Array<{
    title: string;
    slug: string[];
    isFolder?: boolean;
    hasIndex?: boolean;
    children?: Array<{
      title: string;
      slug: string[];
      isFolder?: boolean;
      hasIndex?: boolean;
      children?: any[];
    }>;
  }>;
}

export function SidebarContainer({ tree }: SidebarProps) {
  const { settings } = useSettings();
  const [showSidebar, setShowSidebar] = useState(settings.sidebarVisible);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const savedWidth = localStorage.getItem("sidebar-width");
    if (savedWidth) {
      setWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, parseInt(savedWidth))));
    }
  }, []);

  useEffect(() => {
    if (settings.sidebarVisible) {
      setShowSidebar(true);
    } else {
      const timer = setTimeout(() => setShowSidebar(false), 200);
      return () => clearTimeout(timer);
    }
  }, [settings.sidebarVisible]);

  const handleResize = useCallback((e: PointerEvent) => {
    let newWidth = e.clientX;
    if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
    if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;
    setWidth(newWidth);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    localStorage.setItem("sidebar-width", width.toString());
  }, [width]);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{
        width: showSidebar ? width : 0,
        opacity: showSidebar ? 1 : 0,
      }}
      transition={
        isResizing ? { duration: 0 } : { duration: 0.2, ease: "easeInOut" }
      }
      className="relative shrink-0 z-[40] overflow-hidden"
    >
      {showSidebar && (
        <Sidebar
          tree={tree}
          onResize={handleResize}
          onResizeStart={startResizing}
          onResizeEnd={stopResizing}
        />
      )}
    </motion.div>
  );
}

export function Sidebar({
  tree,
  onResize,
  onResizeStart,
  onResizeEnd,
}: SidebarProps & {
  onResize: (e: PointerEvent) => void;
  onResizeStart: () => void;
  onResizeEnd: () => void;
}) {
  const pathname = usePathname();
  const [isResizing, setIsResizing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [tocHeight, setTocHeight] = useState(DEFAULT_TOC_HEIGHT);
  const [isResizingToc, setIsResizingToc] = useState(false);
  const tocDragStartY = useRef(0);
  const tocDragStartHeight = useRef(DEFAULT_TOC_HEIGHT);

  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedTocHeight = localStorage.getItem("sidebar-toc-height");
    if (savedTocHeight) {
      setTocHeight(
        Math.min(
          MAX_TOC_HEIGHT_RATIO * window.innerHeight,
          Math.max(MIN_TOC_HEIGHT, parseInt(savedTocHeight))
        )
      );
    }
    setIsMounted(true);
  }, []);

  const startResizing = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsResizing(true);
      onResizeStart();

      const onMove = (moveEvent: PointerEvent) => onResize(moveEvent);
      const onUp = () => {
        setIsResizing(false);
        onResizeEnd();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [onResize, onResizeStart, onResizeEnd]
  );

  const startResizingToc = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      tocDragStartY.current = e.clientY;
      tocDragStartHeight.current = tocHeight;
      setIsResizingToc(true);
    },
    [tocHeight]
  );

  const stopResizingToc = useCallback(() => {
    setIsResizingToc(false);
    localStorage.setItem("sidebar-toc-height", tocHeight.toString());
  }, [tocHeight]);

  const resizeToc = useCallback(
    (e: PointerEvent) => {
      if (isResizingToc) {
        const delta = tocDragStartY.current - e.clientY;
        const maxH =
          (sidebarRef.current?.getBoundingClientRect().height ??
            window.innerHeight) * MAX_TOC_HEIGHT_RATIO;
        let newHeight = tocDragStartHeight.current + delta;
        if (newHeight < MIN_TOC_HEIGHT) newHeight = MIN_TOC_HEIGHT;
        if (newHeight > maxH) newHeight = maxH;
        setTocHeight(newHeight);
      }
    },
    [isResizingToc]
  );

  useEffect(() => {
    if (isResizingToc) {
      window.addEventListener("pointermove", resizeToc);
      window.addEventListener("pointerup", stopResizingToc);
      document.body.style.cursor = "row-resize";
      document.body.style.userSelect = "none";
    } else {
      window.removeEventListener("pointermove", resizeToc);
      window.removeEventListener("pointerup", stopResizingToc);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    return () => {
      window.removeEventListener("pointermove", resizeToc);
      window.removeEventListener("pointerup", stopResizingToc);
    };
  }, [isResizingToc, resizeToc, stopResizingToc]);

  return (
    <aside
      ref={sidebarRef}
      className="relative bg-mantle flex flex-col h-screen overflow-hidden border-r border-surface1"
    >
      <div className="flex-1 flex flex-col border-r border-surface1 overflow-hidden">
        <nav className="flex-1 overflow-y-auto scrollbar-hide py-6">
          <div className="px-4 space-y-6">
            <div className="space-y-1">
              <SidebarLink
                href="/"
                icon={<HomeIcon size={16} />}
                label={strings.common.backToHome}
                isActive={pathname === "/"}
              />
              <SidebarLink
                href="/tags"
                icon={<TagsIcon size={16} />}
                label={strings.tags.header}
                isActive={pathname.startsWith("/tags")}
              />
            </div>

            <div>
              <div className={`px-3 mb-2 ${typography.sidebar.header}`}>
                Files
              </div>
              <SidebarTree items={tree} />
            </div>
          </div>
        </nav>

        <div
          onPointerDown={startResizingToc}
          className={`shrink-0 h-3 cursor-row-resize hover:bg-mauve/30 active:bg-mauve transition-colors flex items-center justify-center ${isResizingToc ? "bg-mauve" : ""}`}
        >
          <div className="w-8 h-0.5 rounded-full bg-surface1" />
        </div>

        <div
          style={{ height: isMounted ? tocHeight : DEFAULT_TOC_HEIGHT }}
          className="shrink-0 overflow-y-auto scrollbar-hide py-4"
        >
          <div className="px-4">
            <div className={`px-3 mb-2 ${typography.sidebar.header}`}>
              Contents
            </div>
            <TableOfContents />
          </div>
        </div>

        <div className="shrink-0 flex justify-center py-3">
          <KoFiButton />
        </div>
      </div>

      <div
        onPointerDown={startResizing}
        className={`absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-mauve/30 active:bg-mauve transition-colors z-50 ${isResizing ? "bg-mauve" : ""}`}
      />
    </aside>
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
    </Link>
  );
}
