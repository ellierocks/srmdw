import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface PageData {
  slug: string[];
  game?: string;
  title: string;
  description?: string;
  content: string;
  frontmatter: Record<string, any>;
}

export interface GameMetadata {
  id: string;
  title: string;
  description: string;
  cover?: string;
  developer?: string;
  publisher?: string;
  releaseDate?: string;
  platforms?: string[];
}

export function getAllGameIds() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs
    .readdirSync(contentDirectory)
    .filter((file) =>
      fs.statSync(path.join(contentDirectory, file)).isDirectory()
    );
}

export function getGameMetadata(id: string): GameMetadata {
  const indexPath = path.join(contentDirectory, id, "index.md");
  let title = id.replace(/-/g, " ");
  let description = "";
  let cover: string | undefined = undefined;
  let developer: string | undefined = undefined;
  let publisher: string | undefined = undefined;
  let releaseDate: string | undefined = undefined;
  let platforms: string[] | undefined = undefined;

  if (fs.existsSync(indexPath)) {
    const fileContents = fs.readFileSync(indexPath, "utf8");
    const { data } = matter(fileContents);
    title = data.title || title;
    description = data.description || description;
    cover =
      typeof data.cover === "string" && data.cover.trim().length > 0
        ? data.cover
        : undefined;
    developer = data.developer;
    publisher = data.publisher;
    releaseDate = data.releaseDate;
    platforms = data.platforms;
  }

  return {
    id,
    title,
    description,
    cover,
    developer,
    publisher,
    releaseDate,
    platforms,
  };
}

export async function getPageData(
  game: string,
  slug: string[]
): Promise<PageData> {
  const fullSlug = slug.length === 0 ? ["index"] : slug;

  // Try file.md then file/index.md
  let filePath = path.join(contentDirectory, game, ...fullSlug) + ".md";
  if (!fs.existsSync(filePath)) {
    filePath = path.join(contentDirectory, game, ...fullSlug, "index.md");
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`Page not found: ${filePath}`);
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Simple wiki link processing [[link]] or [[link|text]]
  const processedContent = content.replace(
    /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
    (match, link, text) => {
      const label = text || link;
      // If it starts with / assume absolute from root
      const href = link.startsWith("/") ? link : `/${game}/${link}`;
      return `[${label}](${href})`;
    }
  );

  return {
    slug,
    game,
    title: data.title || slug[slug.length - 1] || game,
    description: data.description || "",
    content: processedContent,
    frontmatter: data,
  };
}

export interface TreeItem {
  title: string;
  slug: string[];
  isFolder?: boolean;
  hasIndex?: boolean;
  children?: TreeItem[];
}

export function getGameTree(game: string): TreeItem[] {
  const gameDir = path.join(contentDirectory, game);
  if (!fs.existsSync(gameDir) || !fs.statSync(gameDir).isDirectory()) return [];

  const buildTree = (dir: string): TreeItem[] => {
    const files = fs.readdirSync(dir);
    const items: TreeItem[] = [];

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stats = fs.statSync(fullPath);
      const relativePath = path.relative(gameDir, fullPath);
      const slug = relativePath.replace(/\.md$/, "").split(path.sep);

      if (stats.isDirectory()) {
        const children = buildTree(fullPath);
        const hasIndex = fs.existsSync(path.join(fullPath, "index.md"));

        // Only add folder if it has children or an index.md
        if (children.length > 0 || hasIndex) {
          items.push({
            title: file.replace(/-/g, " "),
            slug,
            isFolder: true,
            hasIndex,
            children,
          });
        }
      } else if (file.endsWith(".md") && file !== "index.md") {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        items.push({
          title: data.title || file.replace(/\.md$/, "").replace(/-/g, " "),
          slug,
        });
      }
    });

    return items.sort((a, b) => {
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;
      return a.title.localeCompare(b.title);
    });
  };

  return buildTree(gameDir);
}

export function getAllPagePaths(): { game: string; slug: string[] }[] {
  const games = getAllGameIds();
  const paths: { game: string; slug: string[] }[] = [];

  games.forEach((game) => {
    const gameDir = path.join(contentDirectory, game);

    const walk = (dir: string) => {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
          walk(fullPath);
        } else if (file.endsWith(".md")) {
          const relativePath = path.relative(gameDir, fullPath);
          const slug = relativePath.replace(/\.md$/, "").split(path.sep);

          // If it's index.md, the slug is just the folder path
          if (slug[slug.length - 1] === "index") {
            slug.pop();
          }

          paths.push({ game, slug });
        }
      });
    };

    walk(gameDir);
  });

  return paths;
}
