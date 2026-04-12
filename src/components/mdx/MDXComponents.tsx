import Link from "next/link";
import Image from "next/image";
import { Callout } from "@/components/ui/Callout";

export const components = {
  Callout,
  a: ({ href, children, ...props }: any) => {
    const isInternal = href?.startsWith("/");
    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-bold text-mauve no-underline hover:underline decoration-mauve underline-offset-4 transition-all"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-mauve no-underline hover:underline decoration-mauve underline-offset-4 transition-all"
        {...props}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt, ...props }: any) => {
    return (
      <span className="block my-8 overflow-hidden border border-surface1 shadow-xl bg-surface0">
        <Image
          src={src}
          alt={alt || ""}
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
          {...props}
        />
        {alt && (
          <span className="block px-4 py-2 text-[10px] font-black text-overlay1 tracking-widest border-t border-surface1 bg-mantle">
            {alt}
          </span>
        )}
      </span>
    );
  },
  // Add other mappings as needed
};
