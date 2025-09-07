"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "../../lib/utils";
import { defaultNav } from "../../config/nav";
import { CommandSearchModal } from "../search/command-search-modal";
import NotificationsMenu from "./NotificationsMenu";
import MessagesMenu from "./MessagesMenu";
import SettingsMenu from "./SettingsMenu";
import AvatarMenu, { NavbarUser } from "./AvatarMenu";

type Props = {
  onOpenMobile?: () => void;
  user?: NavbarUser;
  onSignIn?: () => void;
  onSignOut?: () => void;
};

export default function Navbar({
  onOpenMobile,
  user = { name: "Guest", isAuthenticated: false },
  onSignIn,
  onSignOut,
}: Props) {
  return (
    <header className="sticky top-0 z-30 h-14 w-full  bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center gap-2 px-3">
        {/* يسار: أزرار الموبايل */}
        <button
          type="button"
          onClick={() => onOpenMobile?.()}
          className="inline-flex size-9 items-center justify-center rounded-md border hover:bg-muted lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-4" />
        </button>

        {/* تريجر البحث للموبايل (أيقونة فقط) */}
        <CommandSearchModal
          nav={defaultNav}
          showDesktopTrigger={false}
          showMobileTrigger={true}
          mobileButtonClassName="md:hidden inline-flex size-9 items-center justify-center rounded-md border hover:bg-muted"
          panelWidthClass="w-full max-w-lg"
        />

        {/* لوجو/اسم + بحث الديسكتوب */}
        <div className="flex flex-1 items-center gap-3">
          {/* <Link href="/" className="hidden md:block text-sm font-semibold">
            Maham
          </Link> */}

          {/* Search الديسكتوب */}
          <div className="ml-1 hidden md:block">
            <CommandSearchModal
              nav={defaultNav}
              triggerWidthClass="w-[520px]"
              panelWidthClass="w-full max-w-xl"
              showDesktopTrigger={true}
              showMobileTrigger={false}
            />
          </div>
        </div>

        {/* يمين: أيقونات (رسائل تُخفى تحت sm عشان المساحة) */}
        <div className={cn("ml-auto flex items-center gap-2")}>
          <NotificationsMenu />
          <div>
            <MessagesMenu />
          </div>
          <SettingsMenu />
          <AvatarMenu user={user} onSignIn={onSignIn} onSignOut={onSignOut} />
        </div>
      </div>
    </header>
  );
}
