
"use client";

import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Settings as SettingsIcon, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "../../lib/utils";
import { useIsMobile } from "./use-media-query";

type Dir = "ltr" | "rtl";
type Brand = "blue" | "black" | "teal" | "violet" | "rose" | "yellow";
type LayoutKey = "hydrogen" | "helium" | "lithium" | "beryllium" | "boron" | "carbon";

/* Helpers */
function setAttr(key: string, value: string) {
  document.documentElement.setAttribute(key, value);
}
function saveLS(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch {}
}
function loadLS(key: string) {
  try { return localStorage.getItem(key) || undefined; } catch { return undefined; }
}

/* يحفظ موضع السكول داخل عنصر معيّن */
function usePreserveScroll<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const preserve = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const top = el.scrollTop;
    requestAnimationFrame(() => { if (ref.current) ref.current.scrollTop = top; });
  }, []);
  return { scrollRef: ref, preserve };
}

/* معاينة صغيرة للـ layout */
function LayoutThumb({ active }: { active?: boolean }) {
  return (
    <div
      className={cn(
        "h-10 w-16 rounded-md border grid grid-cols-[20px,1fr] grid-rows-2 gap-1 p-1",
        active && "ring-2 ring-primary/50"
      )}
    >
      <div className="row-span-2 rounded-sm bg-muted" />
      <div className="rounded-sm bg-muted" />
      <div className="rounded-sm bg-muted" />
    </div>
  );
}

/* زر اختيار مُوحّد وموسّط */
function ChoiceButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }
) {
  const { className, active, children, ...rest } = props;
  return (
    <button
      type="button"
      className={cn(
        "rounded-lg border p-2 text-sm hover:bg-muted transition",
        "flex flex-col items-center justify-center text-center",
        active && "ring-2 ring-primary/50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default function SettingsMenu() {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  /* Hooks أعلى المستوى */
  const [dir, setDir]       = React.useState<Dir>(() => (loadLS("ui_dir") as Dir) || "ltr");
  const [brand, setBrand]   = React.useState<Brand>(() => (loadLS("maham-brand") as Brand) || "violet");
  const [layout, setLayout] = React.useState<LayoutKey>(() => (loadLS("maham-layout") as LayoutKey) || "hydrogen");
  const [mobileOpen, setMobileOpen]   = React.useState(false);
  const [desktopOpen, setDesktopOpen] = React.useState(false);

  const { scrollRef, preserve } = usePreserveScroll<HTMLDivElement>();

  const changeDir    = (d: Dir)      => { preserve(); setDir(d);    saveLS("ui_dir", d);         setAttr("dir", d); };
  const changeBrand  = (b: Brand)    => { preserve(); setBrand(b);  saveLS("maham-brand", b);    setAttr("data-brand", b); };
  const changeLayout = (l: LayoutKey)=> { preserve(); setLayout(l); saveLS("maham-layout", l);   setAttr("data-layout", l); };

  /* تطبيق السمات المخزّنة مرة واحدة */
  React.useEffect(() => {
    setAttr("dir", dir);
    setAttr("data-brand", brand);
    setAttr("data-layout", layout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* قفل Scroll الصفحة عند فتح أي Dialog */
  React.useEffect(() => {
    const anyOpen = mobileOpen || desktopOpen;
    const html = document.documentElement;
    const body = document.body;
    if (anyOpen) {
      html.classList.add("overflow-hidden");
      body.classList.add("overflow-hidden");
    } else {
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    }
    return () => {
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    };
  }, [mobileOpen, desktopOpen]);

  /* أقسام المحتوى */
  const ThemeSection = () => (
    <section className="space-y-2">
      <div className="text-xs font-semibold text-muted-foreground">APPEARANCE</div>
      <div className="grid grid-cols-3 gap-2">
        <ChoiceButton active={theme === "light"} onClick={() => { preserve(); setTheme("light"); }}>
          <div className="h-10 w-full rounded-md border bg-white" />
          <div className="mt-1 text-xs">Light</div>
        </ChoiceButton>
        <ChoiceButton active={theme === "dark"} onClick={() => { preserve(); setTheme("dark"); }}>
          <div className="h-10 w-full rounded-md border bg-neutral-900" />
          <div className="mt-1 text-xs">Dark</div>
        </ChoiceButton>
        <ChoiceButton active={theme === "system"} onClick={() => { preserve(); setTheme("system"); }}>
          <div className="h-10 w-full rounded-md border bg-gradient-to-r from-white to-neutral-900" />
          <div className="mt-1 text-xs">System</div>
        </ChoiceButton>
      </div>
    </section>
  );

  const DirSection = () => (
    <section className="space-y-2">
      <div className="text-xs font-semibold text-muted-foreground">DIRECTION</div>
      <div className="grid grid-cols-2 gap-2">
        <ChoiceButton active={dir === "ltr"} onClick={() => changeDir("ltr")}>LTR</ChoiceButton>
        <ChoiceButton active={dir === "rtl"} onClick={() => changeDir("rtl")}>RTL</ChoiceButton>
      </div>
    </section>
  );

  const LayoutSection = () => {
    const options: { key: LayoutKey; label: string }[] = [
      { key: "hydrogen", label: "Hydrogen" },
      { key: "helium", label: "Helium" },
      { key: "lithium", label: "Lithium" },
      { key: "beryllium", label: "Beryllium" },
      { key: "boron", label: "Boron" },
      { key: "carbon", label: "Carbon" },
    ];
    return (
      <section className="space-y-2">
        <div className="text-xs font-semibold text-muted-foreground">LAYOUT</div>
        <div className="grid grid-cols-3 gap-2">
          {options.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => changeLayout(key)}
              className="group space-y-1 flex flex-col items-center justify-center text-center"
            >
              <LayoutThumb active={layout === key} />
              <div className={cn("text-[11px]", layout === key && "text-primary font-medium")}>
                {label}
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  };

  const BrandSection = () => {
    const colors: { k: Brand; name: string; bg: string }[] = [
      { k: "blue", name: "Blue", bg: "bg-blue-500" },
      { k: "black", name: "Black", bg: "bg-neutral-900" },
      { k: "teal", name: "Teal", bg: "bg-teal-600" },
      { k: "violet", name: "Violet", bg: "bg-violet-600" },
      { k: "rose", name: "Rose", bg: "bg-rose-600" },
      { k: "yellow", name: "Yellow", bg: "bg-yellow-500" },
    ];
    return (
      <section className="space-y-2">
        <div className="text-xs font-semibold text-muted-foreground">COLORS</div>
        <div className="grid grid-cols-3 gap-2">
          {colors.map((c) => (
            <button
              key={c.k}
              onClick={() => changeBrand(c.k)}
              className={cn(
                "rounded-lg border p-2 transition hover:bg-muted",
                "flex flex-col items-center justify-center text-center"
              )}
            >
              <div className={cn("h-8 w-full rounded-md", c.bg)} />
              <div className={cn("mt-1 text-[11px]", brand === c.k && "text-primary font-medium")}>
                {c.name}
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  };

  /* لوحة المحتوى (لا Scroll أفقي، والارتفاع يملأ اللوحة) */
  const Panel = ({ onClose }: { onClose?: () => void }) => (
    <div className="flex h-[100dvh] w-full flex-col overflow-x-hidden">
      {/* Header ثابت داخل اللوحة */}
      <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-card/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-card/70">
        <div className="text-sm font-semibold">Settings</div>
        {onClose && (
          <button className="rounded-md p-1 hover:bg-muted" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* محتوى قابل للتمرير فقط عند الحاجة */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4 overscroll-contain"
      >
        <ThemeSection />
        <DirSection />
        <LayoutSection />
        <BrandSection />
      </div>
    </div>
  );

  /* زر الفتح (نفس الزر للموبايل والديسكتوب) */
  const openAny = () => (isMobile ? setMobileOpen(true) : setDesktopOpen(true));

  return (
    <>
      <button
        type="button"
        aria-label="Settings"
        className="relative inline-flex size-9 items-center justify-center rounded-md border bg-card/60 hover:bg-muted active:scale-95"
        onClick={openAny}
      >
        <SettingsIcon className="size-4" />
      </button>

      {/* ===== Mobile: Top sheet يملأ الشاشة ===== */}
      <Transition show={mobileOpen}>
        <Dialog onClose={() => setMobileOpen(false)} className="relative z-50">
          {/* Overlay */}
          <Transition.Child
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-background/70 backdrop-blur-sm" />
          </Transition.Child>

          {/* Panel */}
          <div className="fixed inset-0">
            <div className="flex min-h-full items-start justify-center p-0">
              <Transition.Child
                enter="transition-transform duration-300 ease-out"
                enterFrom="-translate-y-3 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="transition-transform duration-200 ease-in"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="-translate-y-3 opacity-0"
              >
                <Dialog.Panel className="fixed inset-0 bg-card text-card-foreground">
                  <Panel onClose={() => setMobileOpen(false)} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* ===== Desktop: Side sheet (يمين LTR / شمال RTL) ===== */}
      <Transition show={desktopOpen}>
        <Dialog onClose={() => setDesktopOpen(false)} className="relative z-50">
          {/* Overlay */}
          <Transition.Child
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-background/60 backdrop-blur-[2px]" />
          </Transition.Child>

          {/* Panel */}
          <div className="fixed inset-0">
            <div className="flex min-h-full items-start justify-center p-0">
              <Transition.Child
                enter="transform transition duration-300 ease-out"
                enterFrom={dir === "rtl" ? "-translate-x-3 opacity-0" : "translate-x-3 opacity-0"}
                enterTo="translate-x-0 opacity-100"
                leave="transform transition duration-200 ease-in"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo={dir === "rtl" ? "-translate-x-3 opacity-0" : "translate-x-3 opacity-0"}
              >
                <Dialog.Panel
                  className={cn(
                    "fixed top-0 bottom-0 bg-card text-card-foreground shadow-xl border-l",
                    "w-[360px] h-[100dvh] overflow-hidden", // اللوحة نفسها بلا سكرول أفقي
                    dir === "rtl" ? "left-0 border-l-0 border-r" : "right-0"
                  )}
                >
                  <Panel onClose={() => setDesktopOpen(false)} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
