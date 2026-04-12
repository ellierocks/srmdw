import React from "react";
import {
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Notebook,
} from "lucide-react";
import { clsx } from "clsx";

type CalloutType = "info" | "warning" | "danger" | "success" | "note";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutStyles: Record<
  CalloutType,
  { container: string; icon: React.ReactNode; defaultTitle: string }
> = {
  info: {
    container: "border-blue bg-blue/10 text-blue",
    icon: <Info size={18} />,
    defaultTitle: "INFO",
  },
  warning: {
    container: "border-yellow bg-yellow/10 text-yellow",
    icon: <AlertTriangle size={18} />,
    defaultTitle: "WARNING",
  },
  danger: {
    container: "border-red bg-red/10 text-red",
    icon: <AlertCircle size={18} />,
    defaultTitle: "DANGER",
  },
  success: {
    container: "border-green bg-green/10 text-green",
    icon: <CheckCircle size={18} />,
    defaultTitle: "SUCCESS",
  },
  note: {
    container: "border-lavender bg-lavender/10 text-lavender",
    icon: <Notebook size={18} />,
    defaultTitle: "NOTE",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const style = calloutStyles[type] || calloutStyles.info;

  return (
    <div className={clsx("p-4 my-6 border-l-4 rounded-r-lg", style.container)}>
      <div className="flex items-center gap-2 mb-2 font-black text-[10px] tracking-widest opacity-80 uppercase">
        {style.icon}
        {title || style.defaultTitle}
      </div>
      <div className="text-sm font-medium leading-relaxed prose-p:my-0">
        {children}
      </div>
    </div>
  );
}
