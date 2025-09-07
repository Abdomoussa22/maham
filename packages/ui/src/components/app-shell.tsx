'use client';
import * as React from 'react';
import type { NavItem } from '../lib/types';
import { SidebarProvider } from './sidebar-context';
import { Sidebar } from './sidebar';
import { Navbar } from './navbar';
import { MobileSidebar } from './mobile-sidebar';

export function AppShell({ nav, children }: { nav: NavItem[]; children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar nav={nav} />
        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar onOpenMobile={() => setMobileOpen(true)} />
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </div>
      <MobileSidebar nav={nav} open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </SidebarProvider>
  );
}
