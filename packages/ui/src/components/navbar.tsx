'use client';
import * as React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useSidebar } from './sidebar-context';
import { cn } from '../lib/utils';
import { useTheme } from 'next-themes';

export function Navbar({ onOpenMobile }: { onOpenMobile?(): void }) {
  const { toggle } = useSidebar();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 h-14 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center gap-2 px-3">
        {/* Sidebar toggle (mobile/desktop) */}
        <button
          type="button"
          onClick={() => (onOpenMobile ? onOpenMobile() : toggle())}
          className={cn('inline-flex size-9 items-center justify-center rounded-md border hover:bg-muted')}
          aria-label="Toggle sidebar"
        >
          <Menu className="size-4" />
        </button>

        {/* Search */}
        <div className="relative ml-1 hidden flex-1 items-center md:flex">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-9 w-full rounded-xl border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
            placeholder="Search…"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex size-9 items-center justify-center rounded-md border hover:bg-muted"
            aria-label="Toggle theme"
          >
            <span className="hidden dark:inline">🌞</span>
            <span className="inline dark:hidden">🌙</span>
          </button>

          <button type="button" className="relative inline-flex size-9 items-center justify-center rounded-md border hover:bg-muted" aria-label="Notifications">
            <Bell className="size-4" />
            <span className="absolute right-1 top-1 inline-block size-2 rounded-full bg-primary" />
          </button>

          <button type="button" className="inline-flex size-9 items-center justify-center rounded-full border hover:bg-muted" aria-label="Profile">
            <User className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
