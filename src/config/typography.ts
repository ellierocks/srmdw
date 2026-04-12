export const typography = {
  // Main title (e.g., wiki landing pages)
  title: {
    className:
      "text-6xl font-black tracking-tighter mb-4 leading-tight text-balance text-text",
  },

  // Page description/subtext
  description: {
    className:
      "text-xl leading-relaxed max-w-2xl font-bold opacity-80 text-subtext1",
  },

  // Article (MDX content)
  article: {
    baseClass: "prose-lg",
    className: `
      prose prose-invert max-w-none 
      prose-headings:font-black prose-headings:tracking-tight prose-headings:text-text
      prose-p:leading-relaxed prose-p:text-subtext1
      prose-strong:text-mauve prose-a:no-underline prose-a:text-link
      prose-a:hover:underline prose-a:hover:underline-offset-4 prose-a:hover:decoration-2
      prose-blockquote:border-l-4 prose-blockquote:font-bold prose-blockquote:bg-surface0/30 prose-blockquote:py-1
      prose-code:text-peach prose-code:bg-surface0 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-surface0 prose-pre:border prose-pre:border-surface1
      prose-li:text-subtext1
      prose-h2:text-text prose-h3:text-text
    `,
  },

  // Metadata labels (Developer, Released, etc.)
  metadata: {
    label:
      "text-[10px] font-black tracking-widest uppercase opacity-60 text-overlay1",
    value: "text-xs font-bold text-text",
  },

  // Sidebar labels
  sidebar: {
    entry: "text-[13px] font-bold tracking-tight",
    header: "text-[10px] font-black tracking-widest opacity-60 text-overlay1",
    activeVault: {
      label:
        "text-[9px] font-black tracking-widest leading-none mb-1 opacity-60 text-overlay1",
      title: "text-[11px] font-bold truncate tracking-tighter text-text",
    },
  },

  // Breadcrumbs
  breadcrumbs: {
    className:
      "flex items-center gap-1.5 text-[10px] font-black tracking-widest mb-10 opacity-60 text-overlay1 group",
  },

  // Frontpage title
  frontpage: {
    title: "text-8xl font-black tracking-tighter leading-none text-text",
    subtext:
      "text-2xl max-w-3xl mx-auto leading-relaxed text-balance opacity-80 font-bold text-subtext1",
  },

  // Search
  search: {
    input:
      "w-full py-6 bg-transparent placeholder:text-subtext0 outline-none font-bold tracking-tight text-lg text-text",
    empty: "py-12 text-center font-bold tracking-tight text-sm text-subtext1",
    itemTitle: "font-bold text-sm tracking-tight text-text",
    itemSubtitle:
      "text-[10px] font-black opacity-40 tracking-widest uppercase flex items-center gap-1.5 mt-0.5",
  },
};

export type TypographyConfig = typeof typography;
