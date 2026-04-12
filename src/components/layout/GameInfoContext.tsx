"use client";

import React, { createContext, useContext } from "react";
import { GameMetadata } from "@/lib/markdown";

interface GameInfoContextType {
  gameMeta: GameMetadata | null;
}

const GameInfoContext = createContext<GameInfoContextType | undefined>(
  undefined
);

export function GameInfoProvider({
  children,
  gameMeta,
}: {
  children: React.ReactNode;
  gameMeta: GameMetadata | null;
}) {
  return (
    <GameInfoContext.Provider value={{ gameMeta }}>
      {children}
    </GameInfoContext.Provider>
  );
}

export function useGameInfo() {
  const context = useContext(GameInfoContext);
  if (context === undefined) {
    return { gameMeta: null };
  }
  return context;
}
