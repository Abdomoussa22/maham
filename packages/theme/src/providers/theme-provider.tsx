"use client";
import * as React from "react";
import { ThemeProvider as NextThemeProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="maham-theme"
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
}
