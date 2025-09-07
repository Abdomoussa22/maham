"use client";
import * as React from "react";

const Ctx = React.createContext<{ collapsed: boolean; toggle(): void } | null>(
  null
);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    try {
      const s = localStorage.getItem("shell_sidebar");
      if (s) setCollapsed(s === "1");
    } catch {}
  }, []);

  const toggle = React.useCallback(() => {
    setCollapsed((c) => {
      try {
        localStorage.setItem("shell_sidebar", c ? "0" : "1");
      } catch {}
      return !c;
    });
  }, []);

  return <Ctx.Provider value={{ collapsed, toggle }}>{children}</Ctx.Provider>;
}

export function useSidebar() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
