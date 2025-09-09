// "use client";

// import * as React from "react";
// import { Popover, Dialog, Transition } from "@headlessui/react";
// import { Settings as SettingsIcon, X } from "lucide-react";
// import { useTheme } from "next-themes";
// import { cn } from "../../lib/utils";           // عدّل المسار لو لزم
// import { useIsMobile } from "./use-media-query"; // عدّل المسار لو لزم

// type Dir = "ltr" | "rtl";
// type Brand =
//   | "blue"
//   | "black"
//   | "teal"
//   | "violet"
//   | "rose"
//   | "yellow";
// type LayoutKey = "hydrogen" | "helium" | "lithium" | "beryllium" | "boron" | "carbon";

// /* Helpers */
// function setAttr(key: string, value: string) {
//   document.documentElement.setAttribute(key, value);
// }
// function saveLS(key: string, value: string) {
//   try { localStorage.setItem(key, value); } catch {}
// }
// function loadLS(key: string) {
//   try { return localStorage.getItem(key) || undefined; } catch { return undefined; }
// }

// /* مصغرات layout (شكل توضيحي) */
// function LayoutThumb({ active }: { active?: boolean }) {
//   return (
//     <div className={cn(
//       "h-10 w-16 rounded-md border grid grid-cols-[20px,1fr] grid-rows-2 gap-1 p-1",
//       active && "ring-2 ring-primary/50"
//     )}>
//       <div className="row-span-2 rounded-sm bg-muted" />
//       <div className="rounded-sm bg-muted" />
//       <div className="rounded-sm bg-muted" />
//     </div>
//   );
// }

// /* زر اختيار عام */
// function ChoiceButton(
//   props: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }
// ) {
//   const { className, active, ...rest } = props;
//   return (
//     <button
//       type="button"
//       className={cn(
//         "rounded-lg border p-2 text-sm hover:bg-muted transition",
//         active && "ring-2 ring-primary/50",
//         className
//       )}
//       {...rest}
//     />
//   );
// }

// export default function SettingsMenu() {
//   const isMobile = useIsMobile();
//   const { theme, setTheme } = useTheme();

//   /* DIR */
//   const [dir, setDir] = React.useState<Dir>(() => (loadLS("ui_dir") as Dir) || "ltr");
//   const changeDir = (d: Dir) => {
//     setDir(d); saveLS("ui_dir", d); setAttr("dir", d);
//   };

//   /* BRAND */
//   const [brand, setBrand] = React.useState<Brand>(() => (loadLS("maham-brand") as Brand) || "violet");
//   const changeBrand = (b: Brand) => {
//     setBrand(b); saveLS("maham-brand", b); setAttr("data-brand", b);
//   };

//   /* LAYOUT */
//   const [layout, setLayout] = React.useState<LayoutKey>(() => (loadLS("maham-layout") as LayoutKey) || "hydrogen");
//   const changeLayout = (l: LayoutKey) => {
//     setLayout(l); saveLS("maham-layout", l); setAttr("data-layout", l);
//   };

//   /* على أول mount طبّق السمات المخزَّنة */
//   React.useEffect(() => {
//     setAttr("dir", dir);
//     setAttr("data-brand", brand);
//     setAttr("data-layout", layout);
//   }, []); // once

//   const ThemeSection = () => (
//     <section className="space-y-2">
//       <div className="text-xs font-semibold text-muted-foreground">APPEARANCE</div>
//       <div className="grid grid-cols-2 gap-2">
//         <ChoiceButton active={theme === "light"} onClick={() => setTheme("light")}>
//           <div className="flex items-center gap-2">
//             <div className="h-10 w-full rounded-md border bg-white" />
//           </div>
//           <div className="mt-1 text-center text-xs">Light</div>
//         </ChoiceButton>
//         <ChoiceButton active={theme === "dark"} onClick={() => setTheme("dark")}>
//           <div className="flex items-center gap-2">
//             <div className="h-10 w-full rounded-md border bg-neutral-900" />
//           </div>
//           <div className="mt-1 text-center text-xs">Dark</div>
//         </ChoiceButton>
//       </div>
//     </section>
//   );

//   const DirSection = () => (
//     <section className="space-y-2">
//       <div className="text-xs font-semibold text-muted-foreground">DIRECTION</div>
//       <div className="grid grid-cols-2 gap-2">
//         <ChoiceButton active={dir === "ltr"} onClick={() => changeDir("ltr")}>
//           LTR
//         </ChoiceButton>
//         <ChoiceButton active={dir === "rtl"} onClick={() => changeDir("rtl")}>
//           RTL
//         </ChoiceButton>
//       </div>
//     </section>
//   );

//   const LayoutSection = () => {
//     const options: { key: LayoutKey; label: string }[] = [
//       { key: "hydrogen", label: "Hydrogen" },
//       { key: "helium", label: "Helium" },
//       { key: "lithium", label: "Lithium" },
//       { key: "beryllium", label: "Beryllium" },
//       { key: "boron", label: "Boron" },
//       { key: "carbon", label: "Carbon" },
//     ];
//     return (
//       <section className="space-y-2">
//         <div className="text-xs font-semibold text-muted-foreground">LAYOUT</div>
//         <div className="grid grid-cols-3 gap-2">
//           {options.map(({ key, label }) => (
//             <button
//               key={key}
//               onClick={() => changeLayout(key)}
//               className="group space-y-1"
//             >
//               <LayoutThumb active={layout === key} />
//               <div className={cn("text-[11px] text-center", layout === key && "text-primary font-medium")}>
//                 {label}
//               </div>
//             </button>
//           ))}
//         </div>
//       </section>
//     );
//   };

//   const BrandSection = () => {
//     const colors: { k: Brand; name: string; bg: string }[] = [
//       { k: "blue",   name: "Blue",   bg: "bg-blue-500" },
//       { k: "black",  name: "Black",  bg: "bg-neutral-900" },
//       { k: "teal",   name: "Teal",   bg: "bg-teal-600" },
//       { k: "violet", name: "Violet", bg: "bg-violet-600" },
//       { k: "rose",   name: "Rose",   bg: "bg-rose-600" },
//       { k: "yellow", name: "Yellow", bg: "bg-yellow-500" },
//     ];
//     return (
//       <section className="space-y-2">
//         <div className="text-xs font-semibold text-muted-foreground">COLORS</div>
//         <div className="grid grid-cols-3 gap-2">
//           {colors.map((c) => (
//             <button
//               key={c.k}
//               onClick={() => changeBrand(c.k)}
//               className={cn(
//                 "rounded-lg border p-2 transition hover:bg-muted text-left"
//               )}
//             >
//               <div className={cn("h-8 w-full rounded-md", c.bg)} />
//               <div className={cn("mt-1 text-[11px] text-center", brand === c.k && "text-primary font-medium")}>
//                 {c.name}
//               </div>
//             </button>
//           ))}
//         </div>
//       </section>
//     );
//   };

//   const Panel = ({ onClose }: { onClose?: () => void }) => (
//     <div className="w-[320px] sm:w-[360px] p-3 space-y-4">
//       {/* Header (للموبايل يظهر زر إغلاق) */}
//       <div className="flex items-center justify-between">
//         <div className="text-sm font-semibold">Settings</div>
//         {onClose ? (
//           <button className="rounded-md p-1 hover:bg-muted" onClick={onClose}>
//             <X className="size-4" />
//           </button>
//         ) : null}
//       </div>

//       <ThemeSection />
//       <DirSection />
//       <LayoutSection />
//       <BrandSection />
//     </div>
//   );

//   /* Mobile: Dialog */
//   if (isMobile) {
//     const [open, setOpen] = React.useState(false);
//     return (
//       <>
//         <button
//           type="button"
//           aria-label="Settings"
//           className="relative inline-flex size-9 items-center justify-center rounded-md border bg-card/60 hover:bg-muted active:scale-95"
//           onClick={() => setOpen(true)}
//         >
//           <SettingsIcon className="size-4" />
//         </button>

//         <Transition show={open}>
//           <Dialog onClose={() => setOpen(false)} className="relative z-50">
//             <Transition.Child
//               enter="transition-opacity duration-150"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="transition-opacity duration-100"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <div className="fixed inset-0 bg-background/70 backdrop-blur-sm" />
//             </Transition.Child>

//             <div className="fixed inset-0">
//               <div className="flex min-h-full items-start justify-center p-0 sm:p-3">
//                 <Transition.Child
//                   enter="transition-transform duration-150 ease-out"
//                   enterFrom="opacity-0 -translate-y-2"
//                   enterTo="opacity-100 translate-y-0"
//                   leave="transition-transform duration-100 ease-in"
//                   leaveFrom="opacity-100 translate-y-0"
//                   leaveTo="opacity-0 translate-y-2"
//                 >
//                   <Dialog.Panel className="fixed inset-x-0 top-14 sm:static sm:inset-auto rounded-b-2xl sm:rounded-2xl border bg-card text-card-foreground shadow-2xl max-h-[85vh] w-full sm:max-w-[24rem]">
//                     <Panel onClose={() => setOpen(false)} />
//                   </Dialog.Panel>
//                 </Transition.Child>
//               </div>
//             </div>
//           </Dialog>
//         </Transition>
//       </>
//     );
//   }

//   /* Desktop: Popover */
//   return (
//     <Popover className="relative">
//       <Popover.Button
//         className="relative inline-flex size-9 items-center justify-center rounded-md border bg-card/60 hover:bg-muted active:scale-95"
//         aria-label="Settings"
//       >
//         <SettingsIcon className="size-4" />
//       </Popover.Button>
//       <Transition
//         enter="transition ease-out duration-100"
//         enterFrom="opacity-0 translate-y-1"
//         enterTo="opacity-100 translate-y-0"
//         leave="transition ease-in duration-75"
//         leaveFrom="opacity-100 translate-y-0"
//         leaveTo="opacity-0 translate-y-1"
//       >
//         <Popover.Panel className="absolute top-11 right-0 rounded-2xl border bg-card shadow-lg outline-none">
//           <Panel />
//         </Popover.Panel>
//       </Transition>
//     </Popover>
//   );
// }
"use client";

import * as React from "react";
import { Popover, Dialog, Transition } from "@headlessui/react";
import { Settings as SettingsIcon, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "../../lib/utils";
import { useIsMobile } from "./use-media-query";

type Dir = "ltr" | "rtl";
type Brand = "blue" | "black" | "teal" | "violet" | "rose" | "yellow";
type LayoutKey = "hydrogen" | "helium" | "lithium" | "beryllium" | "boron" | "carbon";

/* helpers */
function setAttr(key: string, value: string) { document.documentElement.setAttribute(key, value); }
function saveLS(key: string, value: string) { try { localStorage.setItem(key, value); } catch {} }
function loadLS(key: string) { try { return localStorage.getItem(key) || undefined; } catch { return undefined; } }

/* يحفظ/يرجّع موضع السكول داخل عنصر معيّن */
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

/* معاينة layout */
function LayoutThumb({ active }: { active?: boolean }) {
  return (
    <div className={cn(
      "h-10 w-16 rounded-md border grid grid-cols-[20px,1fr] grid-rows-2 gap-1 p-1",
      active && "ring-2 ring-primary/50"
    )}>
      <div className="row-span-2 rounded-sm bg-muted" />
      <div className="rounded-sm bg-muted" />
      <div className="rounded-sm bg-muted" />
    </div>
  );
}

/* زر اختيار عام (كلها مُوسّطة) */
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

  // ⬅️ كل الـHooks على المستوى الأعلى (لا يوجد Hooks داخل شروط)
  const [dir, setDir]         = React.useState<Dir>(() => (loadLS("ui_dir") as Dir) || "ltr");
  const [brand, setBrand]     = React.useState<Brand>(() => (loadLS("maham-brand") as Brand) || "violet");
  const [layout, setLayout]   = React.useState<LayoutKey>(() => (loadLS("maham-layout") as LayoutKey) || "hydrogen");
  const [mobileOpen, setMobileOpen] = React.useState(false); // ← كان سبب التحذير قبل كده لأنه كان جوّا شرط

  const { scrollRef, preserve } = usePreserveScroll<HTMLDivElement>();

  const changeDir = (d: Dir) => { preserve(); setDir(d); saveLS("ui_dir", d); setAttr("dir", d); };
  const changeBrand = (b: Brand) => { preserve(); setBrand(b); saveLS("maham-brand", b); setAttr("data-brand", b); };
  const changeLayout = (l: LayoutKey) => { preserve(); setLayout(l); saveLS("maham-layout", l); setAttr("data-layout", l); };

  React.useEffect(() => {
    setAttr("dir", dir);
    setAttr("data-brand", brand);
    setAttr("data-layout", layout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <div className={cn("text-[11px]", layout === key && "text-primary font-medium")}>{label}</div>
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
              <div className={cn("mt-1 text-[11px]", brand === c.k && "text-primary font-medium")}>{c.name}</div>
            </button>
          ))}
        </div>
      </section>
    );
  };

  /* لوحة مشتركة (Scroll داخلي + عناصر مُوسّطة) */
  const Panel = ({ onClose }: { onClose?: () => void }) => (
    <div
      ref={scrollRef}
      className="w-[320px] sm:w-[360px] p-3 space-y-4 max-h-[75vh] overflow-y-auto overscroll-contain"
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Settings</div>
        {onClose ? (
          <button className="rounded-md p-1 hover:bg-muted" onClick={onClose}>
            <X className="size-4" />
          </button>
        ) : null}
      </div>
      <ThemeSection />
      <DirSection />
      <LayoutSection />
      <BrandSection />
    </div>
  );

  /* ===== Mobile: Top Sheet (يستخدم mobileOpen) ===== */
  if (isMobile) {
    return (
      <>
        <button
          type="button"
          aria-label="Settings"
          className="relative inline-flex size-9 items-center justify-center rounded-md border bg-card/60 hover:bg-muted active:scale-95"
          onClick={() => setMobileOpen(true)}
        >
          <SettingsIcon className="size-4" />
        </button>

        <Transition show={mobileOpen}>
          <Dialog onClose={() => setMobileOpen(false)} className="relative z-50">
            <Transition.Child
              enter="transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-background/70 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0">
              <div className="flex min-h-full items-start justify-center p-0">
                <Transition.Child
                  enter="transition-transform duration-200 ease-out"
                  enterFrom="-translate-y-3 opacity-0"
                  enterTo="translate-y-0 opacity-100"
                  leave="transition-transform duration-150 ease-in"
                  leaveFrom="translate-y-0 opacity-100"
                  leaveTo="-translate-y-3 opacity-0"
                >
                  <Dialog.Panel className="fixed inset-0 bg-card text-card-foreground">
                    <div className="flex h-[100dvh] flex-col">
                      <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b px-3">
                        <Dialog.Title className="text-sm font-semibold">Settings</Dialog.Title>
                        <button className="rounded-md p-1 hover:bg-muted" onClick={() => setMobileOpen(false)}>
                          <X className="size-4" />
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto p-3 space-y-4 overscroll-contain">
                        <ThemeSection />
                        <DirSection />
                        <LayoutSection />
                        <BrandSection />
                      </div>
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

  /* ===== Desktop: Popover ===== */
  const edge = dir === "rtl" ? "left-0 origin-top-left" : "right-0 origin-top-right";

  return (
    <Popover className="relative">
      <Popover.Button
        className="relative inline-flex size-9 items-center justify-center rounded-md border bg-card/60 hover:bg-muted active:scale-95"
        aria-label="Settings"
      >
        <SettingsIcon className="size-4" />
      </Popover.Button>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          className={cn(
            "absolute top-11 rounded-2xl border bg-card shadow-lg outline-none",
            "w-[360px] max-h-[85vh] overflow-y-auto overscroll-contain",
            edge
          )}
        >
          <Panel />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
