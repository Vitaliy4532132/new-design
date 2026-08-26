import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Хлебные крошки"
      className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-text-dim"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-text-muted" : ""}>{item.label}</span>
            )}
            {!isLast && <ChevronRight size={12} />}
          </span>
        );
      })}
    </nav>
  );
}
