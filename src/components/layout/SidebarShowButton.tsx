"use client";

import { PanelLeft } from "lucide-react";
import { useSettings } from "@/components/providers/SettingsProvider";

export function SidebarShowButton() {
  const { settings, updateSetting } = useSettings();

  if (settings.sidebarVisible) {
    return null;
  }

  return (
    <button
      onClick={() => updateSetting("sidebarVisible", true)}
      className="fixed bottom-6 left-6 z-[60] flex items-center justify-center w-10 h-10 bg-surface0 border border-surface1 text-subtext1 hover:text-mauve hover:bg-surface1 transition-all shadow-lg"
      title="Show sidebar"
    >
      <PanelLeft size={18} />
    </button>
  );
}
