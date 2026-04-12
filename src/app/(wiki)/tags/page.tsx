import fs from "fs";
import path from "path";
import Link from "next/link";
import { strings } from "@/config/site";
import { Tag, Hash } from "lucide-react";

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

export default async function TagsPage() {
  const tagIndex = await getTagIndex();
  const maxPages = Math.max(...tagIndex.map((t) => t.pages.length), 1);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-mauve/10 border border-mauve/20">
            <Tag size={28} className="text-mauve" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-text tracking-tight">
              {strings.tags.header}
            </h1>
            <p className="mt-1 text-sm text-subtext1">
              {tagIndex.length} tags across{" "}
              {tagIndex.reduce((acc, t) => acc + t.pages.length, 0)} pages
            </p>
          </div>
        </div>
      </header>

      {tagIndex.length === 0 ? (
        <div className="text-center py-16 text-subtext1 opacity-60">
          <p className="text-base font-bold">No tags yet.</p>
          <p className="text-xs mt-2">
            Add <code className="text-mauve">tags: [...]</code> to your page
            frontmatter to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tagIndex.map((entry) => {
            const barWidth = Math.round((entry.pages.length / maxPages) * 100);
            return (
              <Link
                key={entry.tag}
                href={`/tags/${encodeURIComponent(entry.tag)}`}
                className="group block p-5 bg-surface0 border border-surface1 hover:border-mauve transition-all hover:shadow-lg hover:shadow-mauve/5"
              >
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3 w-48 shrink-0">
                    <div className="p-2 bg-surface1 border border-surface1 group-hover:bg-mauve/10 group-hover:border-mauve/30 transition-colors">
                      <Hash
                        size={18}
                        className="text-subtext1 group-hover:text-mauve transition-colors"
                      />
                    </div>
                    <span className="font-bold text-text text-lg group-hover:text-mauve transition-colors">
                      {entry.tag}
                    </span>
                  </div>

                  <div className="flex-1 h-2 bg-surface1 overflow-hidden">
                    <div
                      className="h-full bg-mauve/60 group-hover:bg-mauve transition-all"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-2xl font-black text-text group-hover:text-mauve transition-colors">
                      {entry.pages.length}
                    </span>
                    <span className="text-xs text-subtext1 uppercase tracking-wider">
                      {entry.pages.length === 1 ? "page" : "pages"}
                    </span>
                  </div>
                </div>

                {entry.pages.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.pages.slice(0, 3).map((page) => (
                      <span
                        key={page.slug}
                        className="px-2 py-1 text-xs bg-surface1 border border-surface1 text-subtext1"
                      >
                        {page.title}
                      </span>
                    ))}
                    {entry.pages.length > 3 && (
                      <span className="px-2 py-1 text-xs text-subtext1 opacity-60">
                        +{entry.pages.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
