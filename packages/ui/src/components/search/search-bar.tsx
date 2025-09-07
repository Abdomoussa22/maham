"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "../../lib/utils";

type Dir = "ltr" | "rtl";

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  widthClass?: string;
  showBadge?: boolean;
  badgeLabel?: string;
  onValueChange?: (v: string) => void;
  onSubmit?: (v: string) => void;
  /** framed = نفس الشكل السابق / plain = بدون إطار داخلي (يملى عرض الحاوية) */
  variant?: "framed" | "plain";
  /** عنصر مخصص على يمين/يسار الحقل (زر scope مثلًا) */
  rightSlot?: React.ReactNode;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      widthClass = "w-[520px]",
      showBadge = true,
      badgeLabel = "⌘K",
      onValueChange,
      onSubmit,
      placeholder = "Search your page...",
      variant = "framed",
      rightSlot,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const [dir, setDir] = React.useState<Dir>("ltr");
    React.useEffect(() => {
      const html = document.documentElement;
      const update = () => setDir((html.getAttribute("dir") as Dir) || "ltr");
      update();
      const obs = new MutationObserver(update);
      obs.observe(html, { attributes: true, attributeFilter: ["dir"] });
      return () => obs.disconnect();
    }, []);

    // Ctrl/Cmd + K → focus
    React.useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          inputRef.current?.focus();
        }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") onSubmit?.(inputRef.current?.value ?? "");
      props.onKeyDown?.(e);
    };

    const hasRight = !!rightSlot || showBadge;
    const padding =
      dir === "rtl"
        ? cn("pl-12", hasRight ? "pr-12" : "pr-9")
        : cn("pr-12", hasRight ? "pl-12" : "pl-9");

    const framedClasses =
      "h-10 rounded-xl border border-border bg-transparent text-sm outline-none focus:ring-2 focus:ring-ring/40";
    const plainClasses =
      "h-1 w-full bg-transparent text-sm outline-none border-0 focus:ring-0";

    return (
      <div
        className={cn(
          "relative inline-flex items-center",
          className,
          widthClass
        )}
      >
        {/* أيقونة البحث */}
        <Search
          className={cn(
            "pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
            dir === "rtl" ? "right-3" : "left-3"
          )}
        />

        <input
          ref={inputRef}
          placeholder={placeholder}
          onChange={(e) => onValueChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            variant === "plain" ? plainClasses : framedClasses,
            padding
          )}
          {...props}
        />

        {showBadge && !rightSlot && variant !== "plain" && (
          <span
            className={cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-md bg-emerald-600 px-1.5 py-0.5 text-[10px] font-semibold text-white",
              dir === "rtl" ? "left-2" : "right-2"
            )}
          >
            {badgeLabel}
          </span>
        )}

        {rightSlot && (
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2",
              dir === "rtl" ? "left-2" : "right-2"
            )}
          >
            {rightSlot}
          </div>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";
