"use client";

interface SearchTriggerProps {
  className?: string;
  children?: React.ReactNode;
}

export function SearchTrigger({ className, children }: SearchTriggerProps) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
      className={className}
    >
      {children}
    </button>
  );
}
