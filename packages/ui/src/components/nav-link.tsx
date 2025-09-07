'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem, IconType } from '../lib/types';
import { cn } from '../lib/utils';

export function NavLink({ item, collapsed=false, depth=0 }: { item: NavItem; collapsed?: boolean; depth?: number }) {
  const pathname = usePathname();
  const active = pathname === item.href || (item.children?.some(c => pathname?.startsWith(c.href)) ?? false);
  const Icon = item.icon as IconType | undefined;

  return (
    <div>
      <Link
        href={item.href}
        className={cn(
          'group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition',
          active
            ? 'bg-primary/10 text-primary ring-1 ring-primary/20'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
      >
        {Icon ? <Icon className="size-4 shrink-0" /> : null}
        {!collapsed && <span className="truncate">{item.title}</span>}
        {!collapsed && item.badge && (
          <span className="ml-auto rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground/90">
            {item.badge}
          </span>
        )}
      </Link>

      {!collapsed && item.children?.length ? (
        <div className={cn('mt-1 pl-6 space-y-1', depth === 0 && 'border-l border-border')}>
          {item.children.map(c => <NavLink key={c.href} item={c} depth={depth+1} />)}
        </div>
      ) : null}
    </div>
  );
}
