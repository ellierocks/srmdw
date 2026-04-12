import Image from "next/image";
import { GameMetadata } from "@/lib/markdown";

interface GameInfoCardProps {
  metadata: GameMetadata;
}

export function GameInfoCard({ metadata }: GameInfoCardProps) {
  return (
    <div className="border border-surface1 bg-surface0 overflow-hidden">
      {metadata.cover && (
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={metadata.cover}
            alt={metadata.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-black text-text tracking-tight mb-4">
          {metadata.title}
        </h2>
        <div className="space-y-3 text-xs">
          {metadata.developer && (
            <InfoField label="Developer" value={metadata.developer} />
          )}
          {metadata.publisher && (
            <InfoField label="Publisher" value={metadata.publisher} />
          )}
          {metadata.releaseDate && (
            <InfoField
              label="Released"
              value={formatDate(metadata.releaseDate)}
            />
          )}
          {metadata.platforms && metadata.platforms.length > 0 && (
            <InfoField
              label="Platforms"
              value={metadata.platforms.join(", ")}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] font-black text-overlay1 tracking-widest uppercase opacity-60">
        {label}
      </div>
      <div className="font-bold text-text leading-relaxed">{value}</div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}
