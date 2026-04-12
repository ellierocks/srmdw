"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Settings {
  hwAccelScroll: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  mounted: boolean;
}

const defaultSettings: Settings = {
  hwAccelScroll: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sr-wiki-settings");
    if (saved) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      } catch {
        // Ignore parsing error, use defaults
      }
    }
    setMounted(true);
  }, []);

  const updateSetting = <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      localStorage.setItem("sr-wiki-settings", JSON.stringify(next));
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, mounted }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    return {
      settings: defaultSettings,
      updateSetting: () => {},
      mounted: false,
    };
  }
  return context;
}
