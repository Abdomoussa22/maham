"use client";
import {
  Home,
  Users,
  FileText,
  BarChart3,
  LifeBuoy,
  Settings,
} from "lucide-react";
import type { IconType, NavItem } from "../lib/types";

export const defaultNav: NavItem[] = [
  {
    section: "Overview",
    title: "Dashboard",
    href: "/",
    icon: Home as IconType,
  },
  {
    // section: "Project",
    title: "Overview",
    href: "/project",
    icon: FileText as IconType,
    children: [
      {
        title: "Kanban Board",
        href: "/project/kanban",
        icon: FileText as IconType,
      },
      { title: "Tasks", href: "/project/tasks", icon: FileText as IconType },
      {
        title: "Calendar",
        href: "/project/calendar",
        icon: FileText as IconType,
      },
      { title: "Files", href: "/project/files", icon: FileText as IconType },
      { title: "Team", href: "/project/team", icon: Users as IconType },
      {
        title: "Reports",
        href: "/project/reports",
        icon: BarChart3 as IconType,
      },
    ],
  },
  { 
    // section: "People", 
    title: "HR", 
    href: "/hr", 
    icon: Users as IconType 
  },
  {
    // section: "Analytics",
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3 as IconType,
  },
  {
    // section: "Support",
    title: "Support",
    href: "/support",
    icon: LifeBuoy as IconType,
  },
  {
    // section: "System",
    title: "Settings",
    href: "/settings",
    icon: Settings as IconType,
  },
];
