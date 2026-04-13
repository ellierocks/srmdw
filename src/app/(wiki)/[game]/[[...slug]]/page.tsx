import { getPageData, getAllPagePaths, getPrevNextPages } from "@/lib/markdown";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig, typography } from "@/config/site";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/components/mdx/MDXComponents";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { StaggeredEntry } from "@/components/ui/StaggeredEntry";
import { remarkCallout } from "@/lib/remark-callout";
import { PageActions } from "@/components/ui/PageActions";
import { PageNavigation } from "@/components/ui/PageNavigation";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "lucide-react";
import { ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{
    game: string;
    slug?: string[];
  }>;
}

export async function generateStaticParams() {
  const paths = getAllPagePaths();
  return paths.map((p) => {
    return {
      game: p.game,
      slug: p.slug,
    };
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { game, slug = [] } = await params;
  try {
    const page = await getPageData(game, slug);
    return {
      title: `${page.title} - ${siteConfig.name}`,
      description: page.description,
    };
  } catch {
    return { title: "Page Not Found" };
  }
}

export default async function WikiPage({ params }: PageProps) {
  const { game, slug = [] } = await params;

  try {
    const page = await getPageData(game, slug);
    const { prev, next } = getPrevNextPages(game, slug);
    const breadcrumb = `/${game}${slug.length > 0 ? `/${slug.join("/")}` : ""}`;

    return (
      <div className="w-full">
        <StaggeredEntry>
          <header className="mb-14 border-b border-surface1 pb-10">
            <div className="flex items-start justify-between gap-4 mb-4">
              <nav className="flex items-center gap-1 text-sm text-subtext1">
                <Link href="/" className="hover:text-mauve transition-colors">
                  Home
                </Link>
                <ChevronRight size={14} className="opacity-50" />
                <Link
                  href={`/${game}`}
                  className="hover:text-mauve transition-colors"
                >
                  {game}
                </Link>
                {slug.length > 0 && (
                  <>
                    <ChevronRight size={14} className="opacity-50" />
                    <span className="text-text">
                      {breadcrumb.split("/").pop()}
                    </span>
                  </>
                )}
              </nav>

              {page.tags && page.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap shrink-0">
                  <Tag
                    size={14}
                    className="text-subtext1 opacity-60 shrink-0"
                  />
                  {page.tags.map((tag) => (
                    <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                      <Badge variant="secondary">{tag}</Badge>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <h1 className={typography.title.className}>{page.title}</h1>
            {page.description && (
              <p className={typography.description.className}>
                {page.description}
              </p>
            )}
          </header>

          <article
            className={`${typography.article.baseClass} ${typography.article.className}`}
          >
            <MDXRemote
              source={page.content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkCallout],
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      {
                        theme: "catppuccin-mocha",
                      },
                    ],
                  ],
                },
              }}
            />
          </article>

          <PageActions game={game} slug={slug} title={page.title} />
          <PageNavigation prev={prev} next={next} />
        </StaggeredEntry>

        <div className="mt-24" />
      </div>
    );
  } catch {
    notFound();
  }
}
