"use client";

import { Monitor, Gamepad2, Smartphone, Cpu, Gamepad } from "lucide-react";
import React from "react";

interface PlatformIconProps {
  platforms: string[];
  size?: number;
  className?: string;
}

export function PlatformIcon({
  platforms = [],
  size = 16,
  className = "",
}: PlatformIconProps) {
  const mainPlatform = platforms[0]?.toLowerCase() || "";

  // PC platforms
  if (
    mainPlatform.includes("pc") ||
    mainPlatform.includes("windows") ||
    mainPlatform.includes("linux") ||
    mainPlatform.includes("mac")
  ) {
    return <Monitor size={size} className={className} />;
  }

  // Mobile platforms
  if (
    mainPlatform.includes("mobile") ||
    mainPlatform.includes("android") ||
    mainPlatform.includes("ios") ||
    mainPlatform.includes("phone")
  ) {
    return <Smartphone size={size} className={className} />;
  }

  // Nintendo
  if (
    mainPlatform.includes("nintendo") ||
    mainPlatform.includes("wii") ||
    mainPlatform.includes("switch") ||
    mainPlatform.includes("gamecube") ||
    mainPlatform.includes("nes") ||
    mainPlatform.includes("snes") ||
    mainPlatform.includes("n64")
  ) {
    return <Gamepad size={size} className={className} />;
  }

  // PlayStation & Xbox
  if (
    mainPlatform.includes("playstation") ||
    mainPlatform.includes("xbox") ||
    mainPlatform.includes("ps1") ||
    mainPlatform.includes("ps2") ||
    mainPlatform.includes("ps3") ||
    mainPlatform.includes("ps4") ||
    mainPlatform.includes("ps5")
  ) {
    return <Gamepad2 size={size} className={className} />;
  }

  // Default
  return <Cpu size={size} className={className} />;
}
