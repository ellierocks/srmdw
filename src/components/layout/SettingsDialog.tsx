"use client";

import { Settings as SettingsIcon, X, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useSettings } from "@/components/providers/SettingsProvider";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export function SettingsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSetting } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 p-2 rounded-xl bg-surface0 text-subtext1 hover:text-mauve hover:bg-surface1 transition-all border border-surface1"
        title="Settings"
      >
        <SettingsIcon size={18} />
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-crust/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-md bg-base border border-surface1 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between p-6 border-b border-surface1 bg-mantle">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-mauve/10 rounded-lg text-mauve">
                      <SettingsIcon size={20} />
                    </div>
                    <h2 className="text-xl font-black tracking-tighter">
                      Preferences
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-subtext1 hover:text-red hover:bg-red/10 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Setting Item */}
                  <div className="flex items-start justify-between gap-6">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 font-bold text-text">
                        <Zap size={16} className="text-yellow" />
                        Hardware Accelerated Scrolling
                      </div>
                      <p className="text-xs text-subtext1 leading-relaxed opacity-80">
                        Enables buttery smooth momentum scrolling. Disabling this
                        reverts to native browser scroll.
                        <span className="block mt-1 text-red/80 font-bold">
                          Warning: May reduce performance on older devices.
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        updateSetting("hwAccelScroll", !settings.hwAccelScroll)
                      }
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        settings.hwAccelScroll ? "bg-mauve" : "bg-surface1"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-base shadow ring-0 transition duration-200 ease-in-out ${
                          settings.hwAccelScroll
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
