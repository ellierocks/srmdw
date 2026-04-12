"use client";

import { useEffect, useState, useRef } from "react";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TOCProps {
  cover?: string;
}

export function TableOfContents({ cover }: TOCProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const headingElementsRef = useRef<{
    [key: string]: IntersectionObserverEntry;
  }>({});

  useEffect(() => {
    // We wait for the content to be rendered
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    );
    const items = elements.map((el) => {
      const id =
        el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
      if (!el.id) el.id = id; // Ensure ID exists for linking
      return {
        id,
        text: el.textContent || "",
        level: parseInt(el.tagName[1]),
      };
    });
    setHeadings(items);

    // Default to the first heading immediately
    if (items.length > 0 && !activeId) {
      setActiveId(items[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Update our map of intersecting headings
        headingElementsRef.current = entries.reduce((map, headingElement) => {
          map[headingElement.target.id] = headingElement;
          return map;
        }, headingElementsRef.current);

        // Filter out all currently intersecting headings
        const visibleHeadings: IntersectionObserverEntry[] = [];
        Object.keys(headingElementsRef.current).forEach((key) => {
          const headingElement = headingElementsRef.current[key];
          if (headingElement.isIntersecting) {
            visibleHeadings.push(headingElement);
          }
        });

        const getIndexFromId = (id: string) =>
          items.findIndex((heading) => heading.id === id);

        // Determine which of the intersecting headings is highest on the page
        if (visibleHeadings.length === 1) {
          setActiveId(visibleHeadings[0].target.id);
        } else if (visibleHeadings.length > 1) {
          const sortedVisibleHeadings = visibleHeadings.sort(
            (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
          );
          setActiveId(sortedVisibleHeadings[0].target.id);
        }
      },
      // Require headings to reach at least the bottom 40% of the screen, and track them
      // as they scroll all the way up and past the top (using a large top positive margin to ensure
      // long sections don't 'disappear' when their heading is above the viewport)
      { rootMargin: "1000px 0px -40% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="w-64 hidden xl:flex flex-col sticky top-24 self-start pl-8 pr-4 max-h-[calc(100vh-8rem)]">
      <div className="overflow-y-auto scrollbar-hide flex-1">
        {headings.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-overlay1 tracking-widest opacity-60">
              <List size={14} />
              On this page
            </div>
            <nav className="space-y-1">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block text-xs transition-all border-l-2 py-1.5 px-3 hover:text-mauve hover:border-mauve/50 ${
                    activeId === heading.id
                      ? "text-mauve border-mauve font-bold bg-mauve/5"
                      : "text-subtext1 border-transparent"
                  } ${heading.level === 3 ? "ml-4" : ""}`}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          </>
        )}
      </div>

      {cover && (
        <div className="mt-auto pt-8 shrink-0">
          <img
            src={cover}
            className="w-full rounded-md border border-surface1 shadow-2xl transition-transform hover:scale-105 duration-300"
            alt=""
          />
        </div>
      )}
    </aside>
  );
}
