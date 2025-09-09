'use client';
import {
  ThemeProvider as NextThemeProvider,
  type ThemeProviderProps,
} from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      storageKey='maham-theme'
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
}
