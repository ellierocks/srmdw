import { siteConfig, strings } from "@/config/site";
import { Pencil, AlertCircle } from "lucide-react";

interface PageActionsProps {
  game: string;
  slug: string[];
  title: string;
}

export function PageActions({ game, slug, title }: PageActionsProps) {
  const filePath =
    slug.length > 0
      ? `content/${game}/${slug.join("/")}.md`
      : `content/${game}/index.md`;

  const editUrl = `https://github.com/${siteConfig.githubRepo}/edit/${siteConfig.githubBranch}/${filePath}`;
  const issueUrl = `https://github.com/${siteConfig.githubRepo}/issues/new?title=${encodeURIComponent(`[${title}]`)}&body=${encodeURIComponent(`Page: ${title}\n\n---\n\n**Describe the issue:**\n\n**Suggested improvement:**\n`)}`;

  return (
    <div className="flex items-center gap-3 pt-8 mt-8 border-t border-surface1">
      <a
        href={editUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-subtext1 bg-surface0 border border-surface1 hover:border-mauve hover:text-mauve transition-colors"
      >
        <Pencil size={14} />
        {strings.pageActions.suggestEdit}
      </a>
      <a
        href={issueUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-subtext1 bg-surface0 border border-surface1 hover:border-mauve hover:text-mauve transition-colors"
      >
        <AlertCircle size={14} />
        {strings.pageActions.raiseIssue}
      </a>
    </div>
  );
}
