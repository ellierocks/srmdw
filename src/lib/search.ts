import { getAllPagePaths, getPageData } from "./markdown";
import fs from "fs";
import path from "path";

export interface SearchItem {
  title: string;
  game: string;
  slug: string;
  description?: string;
  tags?: string[];
}

export interface TagIndex {
  tag: string;
  pages: { title: string; slug: string; game: string }[];
}

export async function generateSearchIndex() {
  const paths = getAllPagePaths();
  const searchIndex: SearchItem[] = [];
  const tagMap = new Map<string, Set<string>>();

  for (const p of paths) {
    try {
      const page = await getPageData(p.game, p.slug);
      const gameLabel = page.game as string;
      const slugPath =
        p.slug.length > 0
          ? `/${page.game}/${p.slug.join("/")}`
          : `/${page.game}`;

      searchIndex.push({
        title: page.title,
        game: gameLabel,
        slug: slugPath,
        description: page.description,
        tags: page.tags,
      });

      if (page.tags && page.tags.length > 0) {
        for (const tag of page.tags) {
          if (!tagMap.has(tag)) {
            tagMap.set(tag, new Set());
          }
          tagMap.get(tag)!.add(slugPath);
        }
      }
    } catch (e) {
      console.warn(
        `Skipping search index for ${p.game}/${p.slug.join("/")}:`,
        e
      );
    }
  }

  return searchIndex;
}

export async function generateTagIndex(): Promise<TagIndex[]> {
  const paths = getAllPagePaths();
  const tagMap = new Map<
    string,
    { title: string; slug: string; game: string }[]
  >();

  for (const p of paths) {
    try {
      const page = await getPageData(p.game, p.slug);
      const slugPath =
        p.slug.length > 0
          ? `/${page.game}/${p.slug.join("/")}`
          : `/${page.game}`;

      if (page.tags && page.tags.length > 0) {
        for (const tag of page.tags) {
          if (!tagMap.has(tag)) {
            tagMap.set(tag, []);
          }
          tagMap.get(tag)!.push({
            title: page.title,
            slug: slugPath,
            game: page.game as string,
          });
        }
      }
    } catch (e) {
      console.warn(`Skipping tag index for ${p.game}/${p.slug.join("/")}:`, e);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, pages]) => ({ tag, pages }))
    .sort((a, b) => b.pages.length - a.pages.length);
}

export function saveSearchIndex(index: SearchItem[]) {
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  fs.writeFileSync(
    path.join(publicDir, "search-index.json"),
    JSON.stringify(index)
  );
}

export function saveTagIndex(index: TagIndex[]) {
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  fs.writeFileSync(
    path.join(publicDir, "tags-index.json"),
    JSON.stringify(index)
  );
}
