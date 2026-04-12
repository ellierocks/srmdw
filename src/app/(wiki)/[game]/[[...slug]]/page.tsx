import { getPageData, getAllPagePaths } from "@/lib/markdown";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteConfig, typography } from "@/config/site";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/components/mdx/MDXComponents";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { StaggeredEntry } from "@/components/ui/StaggeredEntry";
import { remarkCallout } from "@/lib/remark-callout";

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

    return (
      <div className="w-full">
        <StaggeredEntry>
          <header className="mb-14 border-b border-surface1 pb-10">
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
        </StaggeredEntry>

        <div className="mt-24" />
      </div>
    );
  } catch {
    notFound();
  }
}
