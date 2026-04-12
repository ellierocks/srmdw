"use client";

import { ReactLenis } from "lenis/react";
import { useSettings } from "@/components/providers/SettingsProvider";

export function SmoothScroll({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { settings, mounted } = useSettings();

  // On server render or before mount, or if HW accel is disabled, just render normal scroll container
  if (!mounted || !settings.hwAccelScroll) {
    return <div className={className}>{children}</div>;
  }

  return (
    <ReactLenis
      root={false}
      className={className}
      options={{ syncTouch: true }}
    >
      {children}
    </ReactLenis>
  );
}
