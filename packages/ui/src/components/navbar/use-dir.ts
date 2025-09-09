'use client';
import * as React from 'react';
export type Dir = 'ltr' | 'rtl';

export function useDir(): Dir {
  const [dir, setDir] = React.useState<Dir>('ltr');
  React.useEffect(() => {
    const html = document.documentElement;
    const update = () => setDir((html.getAttribute('dir') as Dir) || 'ltr');
    update();
    const obs = new MutationObserver(update);
    obs.observe(html, { attributes: true, attributeFilter: ['dir'] });
    return () => obs.disconnect();
  }, []);
  return dir;
}

export const edgeClass = (dir: Dir, ltr: string, rtl: string) => (dir === 'rtl' ? rtl : ltr);
