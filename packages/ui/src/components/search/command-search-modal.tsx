"use client";

import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FileText, Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "../../lib/utils";
import type { NavItem } from "../../lib/types";
import type { SearchEntry } from "../../types/search";
import { SearchBar } from "./search-bar";
import { anchorsOnPage, flattenNavToIndex } from "../../search/build-index";

type Dir = "ltr" | "rtl";
const edge = (dir: Dir, ltr: string, rtl: string) =>
  dir === "rtl" ? rtl : ltr;

type RecentQuery = { q: string; ts: number };
type RecentItem = { label: string; url: string; ts: number };
const Q_KEY = "maham:search:recent:q";
const I_KEY = "maham:search:recent:item";
const MAX_RECENT = 10;

function lsGet<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(key);
    return s ? (JSON.parse(s) as T) : fallback;
  } catch {
    return fallback;
  }
}
function lsSet(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
function dedupeBy<T extends Record<string, any>>(arr: T[], key: keyof T) {
  const seen = new Set<any>();
  const out: T[] = [];
  for (const it of arr) {
    const k = it[key];
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(it);
  }
  return out;
}

function filterEntries(
  entries: SearchEntry[],
  q: string,
  limit = 30
): SearchEntry[] {
  const Q = q.trim().toLowerCase();
  if (!Q) return [];
  const scored = entries
    .map((e) => {
      const hay = (e.label + " " + (e.keywords || []).join(" ")).toLowerCase();
      const starts = e.label.toLowerCase().startsWith(Q) ? 2 : 0;
      const hit = hay.includes(Q) ? 1 : 0;
      return { e, score: starts + hit };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.e);
}

async function waitForEl(
  selector: string,
  timeout = 4000
): Promise<HTMLElement | null> {
  const t0 = performance.now();
  return new Promise((resolve) => {
    const tick = () => {
      const el = document.querySelector<HTMLElement>(selector);
      if (el) return resolve(el);
      if (performance.now() - t0 > timeout) return resolve(null);
      requestAnimationFrame(tick);
    };
    tick();
  });
}

async function navigateAndScroll(
  url: string,
  router: ReturnType<typeof useRouter>
) {
  const [path, hash] = url.split("#");
  const same =
    typeof window !== "undefined" && path === window.location.pathname;

  if (hash && same) {
    const el = await waitForEl(`#${CSS.escape(hash)}`, 50);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (el) el.classList.add("ring-2", "ring-emerald-400/40", "rounded-md");
    setTimeout(
      () => el?.classList.remove("ring-2", "ring-emerald-400/40", "rounded-md"),
      1500
    );
    return;
  }
  router.push(path || url);
  if (hash) {
    const el = await waitForEl(`#${CSS.escape(hash)}`, 6000);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (el) el.classList.add("ring-2", "ring-emerald-400/40", "rounded-md");
    setTimeout(
      () => el?.classList.remove("ring-2", "ring-emerald-400/40", "rounded-md"),
      1500
    );
  }
}

export type CommandSearchModalProps = {
  nav?: NavItem[];
  extra?: SearchEntry[];
  limit?: number;
  /** زر شبيه الحقل في الديسكتوب */
  triggerWidthClass?: string;
  /** عرض المودال */
  panelWidthClass?: string; // مثل: "w-full max-w-2xl"
  /** إظهار/إخفاء التريجرات */
  showDesktopTrigger?: boolean; // default: true
  showMobileTrigger?: boolean; // default: true
  /** كلاس إضافي لزر الموبايل (لو عايز تعدّل مكانه داخل الـNavbar) */
  mobileButtonClassName?: string;
};

export function CommandSearchModal({
  nav,
  extra,
  limit = 30,
  triggerWidthClass = "w-[520px]",
  panelWidthClass = "w-full max-w-xl",
  showDesktopTrigger = true,
  showMobileTrigger = true,
  mobileButtonClassName,
}: CommandSearchModalProps) {
  const EMPTY_EXTRA = React.useMemo<SearchEntry[]>(() => [], []);
  const extraSafe = extra ?? EMPTY_EXTRA;
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchEntry[]>([]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [dir, setDir] = React.useState<Dir>("ltr");

  // history
  const [recentQ, setRecentQ] = React.useState<RecentQuery[]>([]);
  const [recentIt, setRecentIt] = React.useState<RecentItem[]>([]);
  const loadHistory = React.useCallback(() => {
    setRecentQ(lsGet<RecentQuery[]>(Q_KEY, []));
    setRecentIt(lsGet<RecentItem[]>(I_KEY, []));
  }, []);
  const addRecentQuery = React.useCallback((q: string) => {
    if (!q.trim()) return;
    setRecentQ((prev) => {
      const list = dedupeBy(
        [{ q: q.trim(), ts: Date.now() }, ...prev],
        "q"
      ).slice(0, MAX_RECENT);
      lsSet(Q_KEY, list);
      return list;
    });
  }, []);
  const addRecentItem = React.useCallback(
    (item: { label: string; url: string }) => {
      setRecentIt((prev) => {
        const list = dedupeBy(
          [{ ...item, ts: Date.now() }, ...prev],
          "url"
        ).slice(0, MAX_RECENT);
        lsSet(I_KEY, list);
        return list;
      });
    },
    []
  );

  // dir
  React.useEffect(() => {
    const html = document.documentElement;
    const update = () => setDir((html.getAttribute("dir") as Dir) || "ltr");
    update();
    const obs = new MutationObserver(update);
    obs.observe(html, { attributes: true, attributeFilter: ["dir"] });
    return () => obs.disconnect();
  }, []);

  // shortcuts
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // index
  const baseIndex = React.useMemo<SearchEntry[]>(() => {
    const base = nav ? flattenNavToIndex(nav) : [];
    return base.concat(extraSafe);
  }, [nav, extraSafe]);

  React.useEffect(() => {
    if (open) loadHistory();
  }, [open, loadHistory]);

  // results
  React.useEffect(() => {
    if (!open || !query) {
      setResults([]);
      setActiveIndex(0);
      return;
    }
    const anchors = anchorsOnPage();
    const hits = filterEntries([...baseIndex, ...anchors], query, limit);
    setResults(hits);
    setActiveIndex(0);
  }, [open, query, baseIndex, limit]);

  const go = (entry: SearchEntry) => {
    addRecentItem({ label: entry.label, url: entry.url });
    addRecentQuery(query);
    navigateAndScroll(entry.url, router);
    setOpen(false);
  };

  const showHistory = open && !query && (recentQ.length || recentIt.length);

  // ------------ Triggers ------------
  const DesktopTrigger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "relative hidden h-10 items-center rounded-xl border bg-transparent pl-9 pr-12 text-left text-sm text-muted-foreground",
        "hover:border-foreground/30 md:inline-flex",
        triggerWidthClass
      )}
      aria-label="Open search"
    >
      {/* أيقونة بحث (داخل الحقل) */}
      <svg
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2",
          edge(dir, "left-3", "right-3")
        )}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span>Search pages here</span>
      <span
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-md bg-emerald-600 px-1.5 py-0.5 text-[10px] font-semibold text-white",
          edge(dir, "right-2", "left-2")
        )}
      >
        ⌘K
      </span>
    </button>
  );

  const MobileTrigger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open search"
      className={cn(
        "md:hidden inline-flex size-9 items-center justify-center rounded-lg border hover:bg-muted",
        mobileButtonClassName
      )}
    >
      <SearchIcon className="size-5" />
    </button>
  );
  // -----------------------------------

  return (
    <>
      {showDesktopTrigger && DesktopTrigger}
      {showMobileTrigger && MobileTrigger}

      <Transition show={open}>
        <Dialog onClose={() => setOpen(false)} className="relative z-50">
          {/* خلفية ببلور (تتلوّن مع الثيم) */}
          <Transition.Child
            enter="transition-opacity ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-background/60 backdrop-blur-sm" />
          </Transition.Child>

          {/* المودال في وسط الشاشة */}
          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-3">
              <Transition.Child
                enter="transition-transform ease-out duration-150"
                enterFrom="opacity-0 -translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition-transform ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-2"
              >
                <Dialog.Panel
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-2xl",
                    panelWidthClass
                  )}
                >
                  {/* شريط البحث */}
                  <div className="relative border-b p-2 md:p-3">
                    <SearchBar
                      ref={inputRef}
                      variant="plain"
                      widthClass="w-full"
                      autoFocus
                      showBadge={false}
                      placeholder="Search pages here"
                      onValueChange={setQuery}
                      onSubmit={() => {
                        const pick = results[activeIndex] || results[0];
                        if (pick) {
                          go(pick);
                        } else {
                          if (query.trim()) {
                            lsSet(
                              Q_KEY,
                              dedupeBy(
                                [
                                  { q: query.trim(), ts: Date.now() },
                                  ...recentQ,
                                ],
                                "q"
                              ).slice(0, MAX_RECENT)
                            );
                          }
                          setOpen(false);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") return setOpen(false);
                        if (!results.length) return;
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setActiveIndex((i) => (i + 1) % results.length);
                        } else if (e.key === "ArrowUp") {
                          e.preventDefault();
                          setActiveIndex(
                            (i) => (i - 1 + results.length) % results.length
                          );
                        }
                      }}
                    />
                    {/* إغلاق: x */}
                    <span
                      role="button"
                      aria-label="Close"
                      onClick={() => setOpen(false)}
                      className={cn(
                        "absolute top-2.5 md:top-3.5 cursor-pointer select-none text-sm text-muted-foreground hover:text-foreground",
                        edge(dir, "right-3", "left-3")
                      )}
                    >
                      x
                    </span>
                  </div>

                  {/* التاريخ أو النتائج */}
                  <div className="max-h-[70vh] overflow-auto p-2 md:p-3">
                    {/* HISTORY */}
                    {open && !query && (recentQ.length || recentIt.length) ? (
                      <>
                        {recentIt.length > 0 && (
                          <div className="mb-4">
                            <div className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                              Recent pages
                            </div>
                            <div className="space-y-1">
                              {recentIt.map((r, i) => (
                                <button
                                  key={`${r.url}-${i}`}
                                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-muted/60"
                                  onClick={() =>
                                    go({ label: r.label, url: r.url })
                                  }
                                >
                                  <span className="inline-flex size-8 items-center justify-center rounded-md border bg-card/60">
                                    <FileText className="size-4" />
                                  </span>
                                  <span className="flex-1">
                                    <div className="font-medium">{r.label}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {r.url}
                                    </div>
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {recentQ.length > 0 && (
                          <div className="mb-2">
                            <div className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                              Recent searches
                            </div>
                            <div className="space-y-1">
                              {recentQ.map((rq, i) => (
                                <button
                                  key={`${rq.q}-${i}`}
                                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-muted/60"
                                  onClick={() => {
                                    setQuery(rq.q);
                                    requestAnimationFrame(() =>
                                      inputRef.current?.focus()
                                    );
                                  }}
                                >
                                  <span className="inline-flex size-8 items-center justify-center rounded-md border bg-card/60">
                                    <SearchIcon className="size-4" />
                                  </span>
                                  <span className="flex-1">
                                    <div className="font-medium">{rq.q}</div>
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : null}

                    {/* RESULTS */}
                    {query && results.length === 0 && (
                      <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                        No results for “{query}”
                      </div>
                    )}

                    {query && results.length > 0 && (
                      <div className="mb-3">
                        <div className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                          HOME
                        </div>
                        <div className="space-y-1">
                          {results.map((r, i) => {
                            const active = i === activeIndex;
                            return (
                              <button
                                key={`${r.url}-${i}`}
                                className={cn(
                                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left",
                                  active ? "bg-muted" : "hover:bg-muted/60"
                                )}
                                onMouseEnter={() => setActiveIndex(i)}
                                onClick={() => go(r)}
                              >
                                <span className="inline-flex size-8 items-center justify-center rounded-md border bg-card/60">
                                  <FileText className="size-4" />
                                </span>
                                <span className="flex-1">
                                  <div className="font-medium">{r.label}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {r.url}
                                  </div>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
