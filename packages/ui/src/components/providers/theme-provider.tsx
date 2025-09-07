'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"      // يضيف data-theme="dark" على <html> في الوضع الداكن
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange   // اختياري: يمنع فلاش ترانزيشن عند التغيير
    >
      {children}
    </NextThemesProvider>
  );
}
