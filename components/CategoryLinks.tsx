"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function CategoryLinks({ cats }: { cats: Category[] }) {
  const path = usePathname();
  return (
    <ul className="flex gap-1.5 whitespace-nowrap">
      {cats.map((c) => {
        const active = path === `/category/${c.slug}`;
        return (
          <li key={c.slug}>
            <Link href={`/category/${c.slug}`} aria-current={active ? "page" : undefined}
              className={`btn btn-xs min-h-8 rounded-full px-2.5 text-xs sm:btn-sm ${active ? "btn-primary" : "btn-ghost hover:bg-base-200"}`}>
              {c.icon} {c.nameBn}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
