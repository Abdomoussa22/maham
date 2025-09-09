"use client";
import React from "react";
import { cn } from "../lib/utils"; 

type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "glass";

type BadgeSize = "sm" | "md" | "lg";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode; 
  className?: string;
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  className = "",
}: BadgeProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-full transition-all";

  const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100",
    primary: "bg-blue-600 text-white",
    secondary: "bg-purple-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-400 text-black",
    danger: "bg-red-600 text-white",
    glass: "bg-white/30 dark:bg-gray-800/30 backdrop-blur-md text-black dark:text-white border border-white/20 dark:border-gray-200/20",
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span className={cn(base, variantStyles[variant], sizeStyles[size], className)}>
      {icon && <span className="mr-1 flex items-center">{icon}</span>}
      {children}
    </span>
  );
}
