"use client";
import * as React from "react";
import type { NavItem } from "../lib/types";
import { NavLink } from "./nav-link";
import { Dialog, Transition } from "@headlessui/react";

export function MobileSidebar({
  nav,
  open,
  onClose,
}: {
  nav: NavItem[];
  open: boolean;
  onClose(): void;
}) {
  return (
    <Transition show={open} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="absolute left-0 top-0 h-full w-72">
            <Transition.Child
              as={React.Fragment}
              enter="transition-transform ease-out duration-200"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition-transform ease-in duration-150"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="h-full w-full border-r bg-card p-3">
                <div className="flex h-14 items-center px-1">
                  <div className="text-base font-semibold">Maham</div>
                </div>
                <nav className="space-y-1 overflow-y-auto">
                  {nav.map((item) => (
                    <NavLink key={item.href} item={item} />
                  ))}
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
