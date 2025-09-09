"use client";

import * as React from "react";
import { Fragment } from "react";
import { Dialog, Menu as HMenu, Transition } from "@headlessui/react";
import { MessageSquare, X } from "lucide-react";
import IconButton from "./icon-button";
import { useIsMobile } from "./use-media-query";
import { useDir, edgeClass } from "./use-dir";
import { cn } from "../../lib/utils";

const msgs = [
  { id: 1, from: "Sarah", text: "Can you review the PR?", time: "now" },
  { id: 2, from: "Omar", text: "Standup moved to 11am.", time: "5m" },
  { id: 3, from: "Lena", text: "Specs attached ✨", time: "1h" },
];

export default function MessagesMenu() {
  const isMobile = useIsMobile();
  const dir = useDir();
  const [open, setOpen] = React.useState(false);

  // 👇 gate يمنع أي اختلاف بين SSR و أول رندر على العميل
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // أثناء SSR / أول hydration: زر ثابت غير تفاعلي (ما فيش dropdown)
  if (!mounted) {
    return (
      <IconButton aria-label="Messages" dotColor="bg-emerald-500">
        <MessageSquare className="size-4" />
      </IconButton>
    );
  }

  if (isMobile) {
    return (
      <>
        <IconButton
          aria-label="Messages"
          dotColor="bg-emerald-500"
          onClick={() => setOpen(true)}
        >
          <MessageSquare className="size-4" />
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
                  leaveTo="opacity-0 -translate-y-2"
                >
                  <Dialog.Panel className="fixed inset-x-0 top-14 sm:static sm:inset-auto rounded-b-2xl sm:rounded-2xl border bg-card text-card-foreground shadow-2xl max-h-[85vh] w-full sm:max-w-[22rem] pt-[env(safe-area-inset-top)]">
                    <div className="flex items-center justify-between border-b p-3">
                      <Dialog.Title className="text-sm font-semibold">
                        Messages
                      </Dialog.Title>
                      <button
                        className="rounded-md p-1 hover:bg-muted"
                        onClick={() => setOpen(false)}
                        aria-label="Close"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="max-h-[70vh] overflow-auto p-2">
                      {msgs.map((m) => (
                        <div
                          key={m.id}
                          className="rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{m.from}</div>
                            <div className="text-xs text-muted-foreground">
                              {m.time}
                            </div>
                          </div>
                          <div className="text-muted-foreground">{m.text}</div>
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

  // Desktop dropdown (Hydration-safe بعد الـgate)
  return (
    <HMenu as="div" className="relative">
      <HMenu.Button as={Fragment}>
        <IconButton aria-label="Messages" dotColor="bg-emerald-500">
          <MessageSquare className="size-4" />
        </IconButton>
      </HMenu.Button>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <HMenu.Items
          className={cn(
            "absolute top-11 w-[22rem] rounded-lg border bg-card p-2 shadow-lg outline-none",
            edgeClass(dir, "right-0 origin-top-right", "left-0 origin-top-left")
          )}
        >
          <div className="px-2 pb-2 text-xs font-semibold text-muted-foreground">
            Messages
          </div>
          <div className="max-h-72 space-y-1 overflow-auto">
            {msgs.map((m) => (
              <HMenu.Item key={m.id}>
                {({ active }) => (
                  <div
                    className={cn(
                      "rounded-md px-2 py-1.5 text-sm",
                      active && "bg-muted"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{m.from}</div>
                      <div className="text-xs text-muted-foreground">
                        {m.time}
                      </div>
                    </div>
                    <div className="text-muted-foreground">{m.text}</div>
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
