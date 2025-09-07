'use client';
import * as React from 'react';
import type { NavItem } from '../lib/types';
import { NavLink } from './nav-link';
import { cn } from '../lib/utils';

export function Sidebar({ nav }: { nav: NavItem[] }) {
  const groups = React.useMemo(() => {
    const m = new Map<string, NavItem[]>();
    for (const it of nav) {
      const key = it.section ?? 'General';
      const arr = m.get(key) ?? [];
      arr.push(it);
      m.set(key, arr);
    }
    return Array.from(m.entries());
  }, [nav]);

  return (
    <aside className="sticky top-0 hidden h-screen w-72 border-r bg-card/60 backdrop-blur lg:block">
      <div className="flex h-14 items-center px-4">
        <div className="text-base font-semibold">Maham</div>
      </div>
      <div className="h-[calc(100vh-56px)] overflow-y-auto px-3 pb-6">
        {groups.map(([section, items]) => (
          <div key={Math.random()} className="mb-4 space-y-1">
            <div className="px-2 pt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {section}
            </div>
            {items.map((it) => (
              <NavLink key={Math.random()} item={it} />
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
