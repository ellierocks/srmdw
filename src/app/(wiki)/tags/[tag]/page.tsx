import fs from "fs";
import path from "path";
import Link from "next/link";
import { strings } from "@/config/site";
import { ChevronRight } from "lucide-react";

interface TagEntry {
  tag: string;
  pages: { title: string; slug: string; game: string }[];
}

async function getTagIndex(): Promise<TagEntry[]> {
  try {
    const indexPath = path.join(process.cwd(), "public", "tags-index.json");
    if (!fs.existsSync(indexPath)) return [];
    const data = fs.readFileSync(indexPath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

interface PageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const tagIndex = await getTagIndex();
  const tagEntry = tagIndex.find((t) => t.tag === decodedTag);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-12">
        <div className="flex items-center gap-2 text-sm text-subtext1 mb-4">
          <Link href="/tags" className="hover:text-mauve transition-colors">
            {strings.tags.header}
          </Link>
          <ChevronRight size={14} className="opacity-50" />
          <span>{decodedTag}</span>
        </div>
        <h1 className="text-3xl font-black text-text tracking-tight">
          {decodedTag}
        </h1>
        {tagEntry && (
          <p className="mt-2 text-sm text-subtext1">
            {strings.tags.pagesCount(tagEntry.pages.length)}
          </p>
        )}
      </header>

      {!tagEntry || tagEntry.pages.length === 0 ? (
        <div className="text-center py-16 text-subtext1 opacity-60">
          <p className="text-base font-bold">{strings.tags.noPages}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tagEntry.pages.map((page) => (
            <Link
              key={page.slug}
              href={page.slug}
              className="group flex items-center gap-4 p-4 bg-surface0 border border-surface1 hover:border-mauve transition-colors"
            >
              <div className="flex-1">
                <div className="font-bold text-text group-hover:text-mauve transition-colors">
                  {page.title}
                </div>
                <div className="text-xs text-subtext1 opacity-60 mt-1">
                  {page.game.replace(/-/g, " ")}
                </div>
              </div>
              <ChevronRight
                size={16}
                className="text-subtext1 opacity-40 group-hover:opacity-100 group-hover:text-mauve transition-all"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
