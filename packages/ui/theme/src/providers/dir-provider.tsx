'use client';
import * as React from 'react';

type Dir = 'ltr' | 'rtl';
type Ctx = { dir: Dir; setDir: (d: Dir) => void };
const DirContext = React.createContext<Ctx | null>(null);

export function DirProvider({ children }: { children: React.ReactNode }) {
  const [dir, setState] = React.useState<Dir>('ltr');
  React.useEffect(() => {
    const saved = (localStorage.getItem('ui_dir') as Dir) || 'ltr';
    setState(saved);
    document.documentElement.setAttribute('dir', saved);
  }, []);
  const setDir = (d: Dir) => {
    localStorage.setItem('ui_dir', d);
    document.documentElement.setAttribute('dir', d);
    setState(d);
  };
  return <DirContext.Provider value={{ dir, setDir }}>{children}</DirContext.Provider>;
}

export function useDir() {
  const ctx = React.useContext(DirContext);
  if (!ctx) throw new Error('useDir must be used within DirProvider');
  return ctx;
}
