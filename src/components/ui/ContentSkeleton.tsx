"use client";

export function ContentSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-6">
      <div className="space-y-4 border-b border-surface1 pb-10">
        <div className="h-10 w-2/3 bg-surface0" />
        <div className="h-5 w-1/2 bg-surface0" />
      </div>
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-full bg-surface0" />
            <div className="h-4 w-5/6 bg-surface0" />
            <div className="h-4 w-4/6 bg-surface0" />
          </div>
        ))}
      </div>
      <div className="space-y-2 pt-4">
        <div className="h-4 w-full bg-surface0" />
        <div className="h-4 w-3/4 bg-surface0" />
      </div>
    </div>
  );
}
