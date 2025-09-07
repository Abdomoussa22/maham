"use client";
import {
  FolderKanban,
  CalendarDays,
  Users,
  FileText,
  BarChart3,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import type { IconType, NavItem } from "../lib/types";

export const defaultNav: NavItem[] = [
  {
    section: "Overview",
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard as IconType,
    
  },
    {
    section: "Overview",
    title: "test",
    href: "/dashboard",
    icon: LayoutDashboard as IconType,
    
  },
  {
    section: "Project",
    title: "Project",
    href: "/project",
    icon: FolderKanban as IconType,
    children: [
      {
        title: "Kanban Board",
        href: "/project/kanban",
        icon: FolderKanban as IconType,
      },
      {
        title: "Tasks",
        href: "/project/tasks",
        icon: FileText as IconType,
        badge: 12,
      },
      {
        title: "Calendar",
        href: "/project/calendar",
        icon: CalendarDays as IconType,
      },
      {
        title: "Team",
        href: "/project/team",
        icon: Users as IconType,
        badge: 5,
      },
      {
        title: "Reports",
        href: "/project/reports",
        icon: BarChart3 as IconType,
      },
      {
        title: "Settings",
        href: "/project/settings",
        icon: Settings as IconType,
      },
    ],
  },
];
