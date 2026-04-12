"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const headingElementsRef = useRef<{
    [key: string]: IntersectionObserverEntry;
  }>({});

  useEffect(() => {
    setHeadings([]);
    setActiveId("");
    headingElementsRef.current = {};

    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    );
    const items = elements.map((el) => {
      const id =
        el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
      if (!el.id) el.id = id;
      return {
        id,
        text: el.textContent || "",
        level: parseInt(el.tagName[1]),
      };
    });
    setHeadings(items);

    if (items.length > 0) {
      setActiveId(items[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        headingElementsRef.current = entries.reduce((map, headingElement) => {
          map[headingElement.target.id] = headingElement;
          return map;
        }, headingElementsRef.current);

        const visibleHeadings: IntersectionObserverEntry[] = [];
        Object.keys(headingElementsRef.current).forEach((key) => {
          const headingElement = headingElementsRef.current[key];
          if (headingElement.isIntersecting) {
            visibleHeadings.push(headingElement);
          }
        });

        const getIndexFromId = (id: string) =>
          items.findIndex((heading) => heading.id === id);

        if (visibleHeadings.length === 1) {
          setActiveId(visibleHeadings[0].target.id);
        } else if (visibleHeadings.length > 1) {
          const sortedVisibleHeadings = visibleHeadings.sort(
            (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
          );
          setActiveId(sortedVisibleHeadings[0].target.id);
        }
      },
      { rootMargin: "1000px 0px -40% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  if (headings.length === 0) {
    return (
      <p className="text-xs text-subtext1 opacity-60 px-3 py-2">No headings</p>
    );
  }

  return (
    <div className="space-y-1">
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
    </div>
  );
}
