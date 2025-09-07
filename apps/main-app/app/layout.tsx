import '../app/globals.css';
import type { Metadata } from 'next';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { AppShell, defaultNav } from '@maham/ui'; // ← عدّل الاسم لو مختلف

export const metadata: Metadata = { title: 'Maham – Main', description: 'Main app' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          <AppShell nav={defaultNav}>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
