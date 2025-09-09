import type { Metadata } from "next";
import "@maham/theme/src/styles.css";
import "./globals.css";
import { AppShell, cn, defaultNav } from "@maham/ui"; // ← عدّل الاسم لو مختلف
import { ThemeProvider } from "@maham/theme/src/providers/theme-provider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Maham – Main",
  description: "Main app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="maham-init" strategy="beforeInteractive">{`
          (function(){
            try{
              var b = localStorage.getItem('maham-brand'); 
              if (b) document.documentElement.setAttribute('data-brand', b);
              var d = localStorage.getItem('ui_dir'); 
              if (d) document.documentElement.setAttribute('dir', d);
            }catch(e){}
          })();
        `}</Script>
      </head>
      <body
        suppressHydrationWarning
        className={cn("min-h-screen bg-background text-foreground antialiased")}
      >
        <ThemeProvider>
          <AppShell nav={defaultNav}>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
