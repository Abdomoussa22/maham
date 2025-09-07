"use client";

import * as React from "react";
import { Dialog, Menu as HMenu, Transition } from "@headlessui/react";
import { Bell, X } from "lucide-react";
import IconButton from "./icon-button";
import { useIsMobile } from "./use-media-query";
import { useDir, edgeClass } from "./use-dir";
import { cn } from "../../lib/utils";

const items = [
  { id: 1, title: "New task assigned to you", time: "2m" },
  { id: 2, title: "Build finished successfully", time: "10m" },
  { id: 3, title: "Server restarted", time: "1h" },
];

export default function NotificationsMenu() {
  const isMobile = useIsMobile();
  const dir = useDir();
  const [open, setOpen] = React.useState(false);

  if (isMobile) {
    return (
      <>
        <IconButton
          aria-label="Notifications"
          dotColor="bg-amber-400"
          onClick={() => setOpen(true)}
        >
          <Bell className="size-4" />
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
                  enterFrom="opacity-0 translate-y-2 sm:-translate-y-2"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition-transform duration-100 ease-in"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-2 sm:-translate-y-2"
                >
                  <Dialog.Panel className="fixed inset-x-0 top-14 sm:static sm:inset-auto rounded-b-2xl sm:rounded-2xl border bg-card text-card-foreground shadow-2xl max-h-[85vh] w-full sm:max-w-md pt-[env(safe-area-inset-top)]">
                    <div className="flex items-center justify-between border-b p-3">
                      <Dialog.Title className="text-sm font-semibold">
                        Notifications
                      </Dialog.Title>
                      <button
                        className="rounded-md p-1 hover:bg-muted"
                        onClick={() => setOpen(false)}
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="max-h-[70vh] overflow-auto p-2">
                      {items.map((n) => (
                        <div
                          key={n.id}
                          className="rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                        >
                          <div className="font-medium">{n.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {n.time} ago
                          </div>
                        </div>
                      ))}
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

  // Desktop dropdown
  return (
    <HMenu as="div" className="relative">
      <HMenu.Button
        as={IconButton}
        aria-label="Notifications"
        dotColor="bg-amber-400"
      >
        <Bell className="size-4" />
      </HMenu.Button>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 translate-y-0"
       leaveTo="opacity-0 -translate-y-2"
      >
        <HMenu.Items
          className={cn(
            "absolute top-11 w-72 rounded-lg border bg-card p-2 shadow-lg outline-none",
            edgeClass(dir, "right-0", "left-0")
          )}
        >
          <div className="px-2 pb-2 text-xs font-semibold text-muted-foreground">
            Notifications
          </div>
          <div className="max-h-64 space-y-1 overflow-auto">
            {items.map((n) => (
              <HMenu.Item key={n.id}>
                {({ active }) => (
                  <div
                    className={cn(
                      "rounded-md px-2 py-1.5 text-sm",
                      active && "bg-muted"
                    )}
                  >
                    <div className="font-medium">{n.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {n.time} ago
                    </div>
                  </div>
                )}
              </HMenu.Item>
            ))}
          </div>
        </HMenu.Items>
      </Transition>
    </HMenu>
  );
}
