'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem, IconType } from '../lib/types';
import { cn } from '../lib/utils';
import { ChevronDown } from 'lucide-react';
import { Disclosure } from '@headlessui/react';

function isActive(pathname: string | null, item: NavItem) {
  if (!pathname) return false;
  if (pathname === item.href) return true;
  if (item.children?.some((c) => pathname.startsWith(c.href))) return true;
  return false;
}

export function NavLeaf({ item, collapsed }: { item: NavItem; collapsed?: boolean }) {
  const pathname = usePathname();
  const active = isActive(pathname, item);
  const Icon = item.icon as IconType | undefined;

  return (
    <Link
      href={item.href}
      className={cn(
        'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition',
        active
          ? 'bg-primary/10 text-primary ring-1 ring-primary/20'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      {Icon ? <Icon className="size-4 shrink-0" /> : null}
      {!collapsed && <span className="truncate">{item.title}</span>}
      {!collapsed && item.badge ? (
        <span className="ml-auto rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground/90">
          {item.badge}
        </span>
      ) : null}
    </Link>
  );
}

export function NavGroup({ item, collapsed }: { item: NavItem; collapsed?: boolean }) {
  const pathname = usePathname();
  const openByDefault = isActive(pathname, item);
  const Icon = item.icon as IconType | undefined;

  return (
    <Disclosure defaultOpen={openByDefault}>
      {({ open }) => (
        <div className="space-y-1">
          <Disclosure.Button
            className={cn(
              'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition text-muted-foreground hover:bg-muted hover:text-foreground',
              open && 'text-foreground'
            )}
          >
            {Icon ? <Icon className="size-4 shrink-0" /> : null}
            <span className="flex-1 text-left truncate">{item.title}</span>
            <ChevronDown className={cn('size-4 transition', open && 'rotate-180')} />
          </Disclosure.Button>

          <Disclosure.Panel>
            <div className="mt-1 space-y-1 border-l border-border pl-5">
              {item.children?.map((child) => (
                <NavLeaf key={child.href} item={child} />
              ))}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

export function NavLink({ item, collapsed = false }: { item: NavItem; collapsed?: boolean }) {
  if (item.children?.length) return <NavGroup item={item} collapsed={collapsed} />;
  return <NavLeaf item={item} collapsed={collapsed} />;
}
