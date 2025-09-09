// import '../app/globals.css';
// import type { Metadata } from 'next';
// import React from 'react';
// import { ThemeProvider } from 'next-themes';
// import { AppShell, defaultNav } from '@maham/ui'; // ← عدّل الاسم لو مختلف

// export const metadata: Metadata = { title: 'Maham – Main', description: 'Main app' };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body suppressHydrationWarning>
//         <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
//           <AppShell nav={defaultNav}>{children}</AppShell>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import { ThemeProvider } from '@maham/theme/src/providers/theme-provider';
import '@maham/theme/src/styles.css';
import { AppShell, defaultNav } from '@maham/ui'; // ← عدّل الاسم لو مختلف
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Maham – Main',
  description: 'Main app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AppShell nav={defaultNav}>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
