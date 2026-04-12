"use client";

import { ThemeProvider } from "next-themes";
import { siteConfig } from "@/config/site";
import { SettingsProvider } from "@/components/providers/SettingsProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme={siteConfig.defaultTheme}
      enableSystem={false}
    >
      <SettingsProvider>{children}</SettingsProvider>
    </ThemeProvider>
  );
}
