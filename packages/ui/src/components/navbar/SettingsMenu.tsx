"use client";

import * as React from "react";
import { Popover, Dialog, Transition } from "@headlessui/react";
import { Settings as SettingsIcon, X } from "lucide-react";
import IconButton from "./icon-button";
import { useIsMobile } from "./use-media-query";
import { useDir, edgeClass } from "./use-dir";
import { useTheme } from "next-themes";
import { cn } from "../../lib/utils";

export default function SettingsMenu() {
  const isMobile = useIsMobile();
  const dir = useDir();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [dirState, setDirState] =
    React.useState<ReturnType<typeof useDir>>(dir);

  React.useEffect(() => setDirState(dir), [dir]);

  const changeDir = (next: "ltr" | "rtl") => {
    setDirState(next);
    try {
      localStorage.setItem("ui_dir", next);
    } catch {}
    document.documentElement.setAttribute("dir", next);
  };

  if (isMobile) {
    return (
      <>
        <IconButton aria-label="Settings" onClick={() => setOpen(true)}>
          <SettingsIcon className="size-4" />
        </IconButton>

        <Transition show={open}>
          <Dialog onClose={() => setOpen(false)} className="relative z-50">
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
              <div className="flex min-h-full items-start sm:items-center justify-center p-0 sm:p-3">
                <Transition.Child
                  enter="transition-transform duration-150 ease-out"
                  enterFrom="opacity-0 -translate-y-2"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition-transform duration-100 ease-in"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-2"
                >
                 <Dialog.Panel className="fixed inset-x-0 top-14 sm:static sm:inset-auto rounded-b-2xl sm:rounded-2xl border bg-card text-card-foreground shadow-2xl max-h-[85vh] w-full sm:max-w-[22rem] pt-[env(safe-area-inset-top)]">
                    <div className="flex items-center justify-between border-b p-3">
                      <Dialog.Title className="text-sm font-semibold">
                        Settings
                      </Dialog.Title>
                      <button
                        className="rounded-md p-1 hover:bg-muted"
                        onClick={() => setOpen(false)}
                      >
                        <X className="size-4" />
                      </button>
                    </div>

                    <div className="p-3 space-y-4">
                      <section>
                        <div className="px-1 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                          Theme
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {(["light", "dark", "system"] as const).map((k) => (
                            <button
                              key={k}
                              onClick={() => setTheme(k)}
                              className={cn(
                                "rounded-md border px-2 py-1.5 text-sm hover:bg-muted",
                                theme === k && "ring-2 ring-ring/40"
                              )}
                            >
                              {k[0].toUpperCase() + k.slice(1)}
                            </button>
                          ))}
                        </div>
                      </section>

                      <section>
                        <div className="px-1 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                          Direction
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {(["ltr", "rtl"] as const).map((d) => (
                            <button
                              key={d}
                              onClick={() => changeDir(d)}
                              className={cn(
                                "rounded-md border px-2 py-1.5 text-sm hover:bg-muted",
                                dirState === d && "ring-2 ring-ring/40"
                              )}
                            >
                              {d.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </section>
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

  // Desktop Popover
  return (
    <Popover className="relative">
      <Popover.Button as={IconButton} aria-label="Settings">
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
            "absolute top-11 w-64 rounded-lg border bg-card p-3 shadow-lg outline-none",
            edgeClass(dir, "right-0", "left-0")
          )}
        >
          <div className="px-1 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Theme
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["light", "dark", "system"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTheme(k)}
                className={cn(
                  "rounded-md border px-2 py-1.5 text-sm hover:bg-muted",
                  theme === k && "ring-2 ring-ring/40"
                )}
              >
                {k[0].toUpperCase() + k.slice(1)}
              </button>
            ))}
          </div>

          <div className="my-3 h-px bg-border" />

          <div className="px-1 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Direction
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(["ltr", "rtl"] as const).map((d) => (
              <button
                key={d}
                onClick={() => {
                  try {
                    localStorage.setItem("ui_dir", d);
                  } catch {}
                  document.documentElement.setAttribute("dir", d);
                }}
                className={cn(
                  "rounded-md border px-2 py-1.5 text-sm hover:bg-muted",
                  typeof document !== "undefined" &&
                    document.documentElement.getAttribute("dir") === d &&
                    "ring-2 ring-ring/40"
                )}
              >
                {d.toUpperCase()}
              </button>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
