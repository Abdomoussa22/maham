"use client";
import * as React from "react";
import type { NavItem } from "../lib/types";
import { NavLink } from "./nav-link";
import { useSidebar } from "./sidebar-context";
import { cn } from "../lib/utils";
import  Link  from "next/link";

export function Sidebar({ nav }: { nav: NavItem[] }) {
  const { collapsed } = useSidebar();

  const groups = React.useMemo(() => {
    const m = new Map<string, NavItem[]>();
    for (const it of nav) {
      const key = it.section ?? "General";
      const arr = m.get(key) ?? [];
      arr.push(it);
      m.set(key, arr);
    }
    return Array.from(m.entries());
  }, [nav]);

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen bg-card/60 backdrop-blur border-r lg:block",
        collapsed ? "w-[4.5rem]" : "w-72"
      )}
    >
      <div className="flex h-14 items-center px-3">
        <div
          className={cn(
            "text-base font-semibold truncate",
            collapsed && "sr-only"
          )}
        >
          <Link href="/">Maham-AI</Link>
        </div>
      </div>
      <div className="h-[calc(100vh-56px)] overflow-y-auto p-2 space-y-4">
        {groups.map(([section, items]) => (
          <div key={section} className="space-y-1">
            {!collapsed && (
              <div className="px-3 text-[11px] uppercase tracking-wider text-muted-foreground">
                {section}
              </div>
            )}
            {items.map((item) => (
              <NavLink key={item.href} item={item} collapsed={collapsed} />
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
