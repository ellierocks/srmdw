"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TreeItem {
  title: string;
  slug: string[];
  isFolder?: boolean;
  children?: TreeItem[];
}

interface SidebarContextType {
  tree: TreeItem[] | null;
  game: string | null;
  setTree: (tree: TreeItem[] | null) => void;
  setGame: (game: string | null) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [tree, setTree] = useState<TreeItem[] | null>(null);
  const [game, setGame] = useState<string | null>(null);

  return (
    <SidebarContext.Provider value={{ tree, game, setTree, setGame }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function SidebarUpdater({
  tree,
  game,
}: {
  tree: TreeItem[] | null;
  game?: string | null;
}) {
  const { setTree, setGame } = useSidebar();

  React.useEffect(() => {
    setTree(tree);
    if (game !== undefined) setGame(game);
  }, [tree, game, setTree, setGame]);

  return null;
}
