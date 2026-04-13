import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "border-transparent bg-mauve text-mantle hover:bg-mauve/80":
            variant === "default",
          "border-transparent bg-surface1 text-subtext1":
            variant === "secondary",
          "border-surface1 text-subtext1 hover:bg-surface0":
            variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
