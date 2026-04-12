"use client";

import { useTheme } from "next-themes";
import { Palette, Check } from "lucide-react";
import { useEffect, useState } from "react";

const flavors = [
  { id: "latte", name: "Latte", color: "#eff1f5" },
  { id: "frappe", name: "Frappé", color: "#303446" },
  { id: "macchiato", name: "Macchiato", color: "#24273a" },
  { id: "mocha", name: "Mocha", color: "#1e1e2e" },
];

export function FlavorSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 p-2 rounded-xl bg-surface0 text-subtext1 hover:text-mauve hover:bg-surface1 transition-all border border-surface1">
        <Palette size={18} />
      </button>
      <div className="absolute bottom-full left-0 mb-2 w-48 bg-mantle border border-surface1 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-[100]">
        <div className="px-3 py-1.5 text-[10px] font-black text-overlay1 tracking-widest opacity-60 mb-1">
          Select Flavor
        </div>
        {flavors.map((flavor) => (
          <button
            key={flavor.id}
            onClick={() => setTheme(flavor.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors font-bold ${
              theme === flavor.id
                ? "bg-mauve/10 text-mauve"
                : "text-subtext1 hover:bg-surface0 hover:text-mauve"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3.5 h-3.5 rounded-full border border-surface1 shadow-sm"
                style={{ backgroundColor: flavor.color }}
              />
              {flavor.name}
            </div>
            {theme === flavor.id && <Check size={14} className="text-mauve" />}
          </button>
        ))}
      </div>
    </div>
  );
}
