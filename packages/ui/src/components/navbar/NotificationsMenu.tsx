"use client";

import * as React from "react";
import { Fragment } from "react";
import { Menu as HMenu, Transition } from "@headlessui/react";
import { Bell } from "lucide-react";
import IconButton from "./icon-button";
import { useDir, edgeClass } from "./use-dir";
import { cn } from "../../lib/utils";

const notifs = [
  { id: 1, title: "New task assigned to you", time: "2m" },
  { id: 2, title: "Build finished successfully", time: "10m" },
  { id: 3, title: "Server restarted", time: "1h" },
];

export default function NotificationsMenu() {
  const dir = useDir();

  return (
    <HMenu as="div" className="relative">
      {/* مهم: as={Fragment} + IconButton كطفل */}
      <HMenu.Button as={Fragment}>
        <IconButton aria-label="Notifications" dotColor="bg-amber-400">
          <Bell className="size-4" />
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
            "absolute top-11 w-72 rounded-lg border bg-card p-2 shadow-lg outline-none",
            edgeClass(dir, "right-0 origin-top-right", "left-0 origin-top-left")
          )}
        >
          <div className="px-2 pb-2 text-xs font-semibold text-muted-foreground">
            Notifications
          </div>

          <div className="max-h-64 space-y-1 overflow-auto">
            {notifs.map((n) => (
              <HMenu.Item key={n.id}>
                {({ active }) => (
                  <div
                    className={cn(
                      "rounded-md px-2 py-1.5 text-sm",
                      active && "bg-muted"
                    )}
                  >
                    <div className="font-medium">{n.title}</div>
                    <div className="text-xs text-muted-foreground">{n.time} ago</div>
                  </div>
                )}
              </HMenu.Item>
            ))}
          </div>

          <div className="mt-2 border-t pt-2 text-right">
            <a href="/notifications" className="text-sm text-primary hover:underline">
              View all
            </a>
          </div>
        </HMenu.Items>
      </Transition>
    </HMenu>
  );
}
