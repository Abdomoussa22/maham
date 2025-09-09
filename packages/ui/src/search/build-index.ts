import type { NavItem } from '../lib/types';
import type { SearchEntry } from '../types/search';

export function flattenNavToIndex(nav: NavItem[], sectionFallback = 'Pages'): SearchEntry[] {
  const out: SearchEntry[] = [];
  const walk = (items: NavItem[], parent?: string) => {
    for (const it of items) {
      out.push({
        label: parent ? `${parent} / ${it.title}` : it.title,
        url: it.href,
        section: it.section || sectionFallback,
      });
      if (it.children?.length) walk(it.children, it.title);
    }
  };
  walk(nav);
  return out;
}

// جمع عناوين الصفحة الحالية كعناصر قابلة للبحث (#anchor)
export function anchorsOnPage(section = 'On this page'): SearchEntry[] {
  if (typeof window === 'undefined') return [];
  const nodes = document.querySelectorAll<HTMLElement>('h1,h2,h3,h4,h5,h6,[data-search]');
  const path = window.location.pathname;

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const list: SearchEntry[] = [];
  nodes.forEach((el) => {
    const text = (el.innerText || el.textContent || '').trim();
    if (!text) return;
    if (!el.id) el.id = slugify(text);
    list.push({ label: text, url: `${path}#${el.id}`, section });
  });
  return list;
}
