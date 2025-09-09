"use client";

import * as React from "react";
import { Fragment } from "react";
import { Dialog, Menu as HMenu, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import IconButton from "./icon-button";
import { useIsMobile } from "./use-media-query";
import { useDir, edgeClass } from "./use-dir";
import { cn } from "../../lib/utils";

export type NavbarUser = {
  name: string;
  email?: string;
  imageUrl?: string;
  isAuthenticated?: boolean;
};

export default function AvatarMenu({
  user = { name: "Guest", isAuthenticated: false },
  onSignIn,
  onSignOut,
}: {
  user?: NavbarUser;
  onSignIn?: () => void;
  onSignOut?: () => void;
}) {
  const isMobile = useIsMobile();
  const dir = useDir();
  const [open, setOpen] = React.useState(false);

  // دالة ترجع زر الأفاتار ويمكن نمرر لها props إضافية (onClick... إلخ)
  const renderAvatarBtn = (
    extra?: React.ComponentProps<typeof IconButton>
  ) => (
    <IconButton
      aria-label="Profile"
      className="overflow-hidden rounded-full bg-card/60"
      {...extra}
    >
      {user.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.imageUrl}
          alt={user.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-xs font-medium">
          {user.name?.slice(0, 2).toUpperCase() || "GU"}
        </span>
      )}
    </IconButton>
  );

  if (isMobile) {
    // موبايل: Top sheet كما هو
    return (
      <>
        {renderAvatarBtn({ onClick: () => setOpen(true) })}

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
                      <div>
                        <div className="text-sm font-semibold">
                          {user.name || "Guest"}
                        </div>
                        {user.email && (
                          <div className="text-xs text-muted-foreground">
                            {user.email}
                          </div>
                        )}
                      </div>
                      <button
                        className="rounded-md p-1 hover:bg-muted"
                        onClick={() => setOpen(false)}
                        aria-label="Close"
                      >
                        <X className="size-4" />
                      </button>
                    </div>

                    <div className="p-2">
                      <a
                        href="/profile"
                        className="block rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                      >
                        Profile
                      </a>
                      <a
                        href="/settings"
                        className="block rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                      >
                        Settings
                      </a>
                      <div className="my-2 h-px bg-border" />
                      {user.isAuthenticated ? (
                        <button
                          onClick={onSignOut}
                          className="w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
                        >
                          Sign out
                        </button>
                      ) : (
                        <button
                          onClick={onSignIn}
                          className="w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
                        >
                          Sign in
                        </button>
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

  // Desktop dropdown — Hydration-safe: as={Fragment} + IconButton كطفل مباشر
  return (
    <HMenu as="div" className="relative">
      <HMenu.Button as={Fragment}>
        {renderAvatarBtn()}
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
            "absolute top-11 w-64 rounded-lg border bg-card p-2 shadow-lg outline-none",
            edgeClass(dir, "right-0 origin-top-right", "left-0 origin-top-left")
          )}
        >
          <div className="px-2 py-2">
            <div className="text-sm font-semibold">{user.name || "Guest"}</div>
            {user.email && (
              <div className="text-xs text-muted-foreground">{user.email}</div>
            )}
          </div>
          <div className="my-2 h-px bg-border" />
          <HMenu.Item>
            {({ active }) => (
              <a
                href="/profile"
                className={cn(
                  "block rounded-md px-2 py-1.5 text-sm",
                  active && "bg-muted"
                )}
              >
                Profile
              </a>
            )}
          </HMenu.Item>
          <HMenu.Item>
            {({ active }) => (
              <a
                href="/settings"
                className={cn(
                  "block rounded-md px-2 py-1.5 text-sm",
                  active && "bg-muted"
                )}
              >
                Settings
              </a>
            )}
          </HMenu.Item>
          <div className="my-2 h-px bg-border" />
          {user.isAuthenticated ? (
            <HMenu.Item>
              {({ active }) => (
                <button
                  onClick={onSignOut}
                  className={cn(
                    "w-full rounded-md px-2 py-1.5 text-left text-sm",
                    active && "bg-muted"
                  )}
                >
                  Sign out
                </button>
              )}
            </HMenu.Item>
          ) : (
            <HMenu.Item>
              {({ active }) => (
                <button
                  onClick={onSignIn}
                  className={cn(
                    "w-full rounded-md px-2 py-1.5 text-left text-sm",
                    active && "bg-muted"
                  )}
                >
                  Sign in
                </button>
              )}
            </HMenu.Item>
          )}
        </HMenu.Items>
      </Transition>
    </HMenu>
  );
}
