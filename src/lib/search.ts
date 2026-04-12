import { getAllPagePaths, getPageData } from "./markdown";
import fs from "fs";
import path from "path";

export interface SearchItem {
  title: string;
  game: string;
  slug: string;
  description?: string;
}

export async function generateSearchIndex() {
  const paths = getAllPagePaths();
  const searchIndex: SearchItem[] = [];

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
      });
    } catch (e) {
      console.warn(
        `Skipping search index for ${p.game}/${p.slug.join("/")}:`,
        e
      );
    }
  }

  return searchIndex;
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
