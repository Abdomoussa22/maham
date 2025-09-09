"use client";
import React from "react";
import { cn } from "../lib/utils"; 

type AvatarShape = "circle" | "rounded";
type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = {
  name?: string; // الاسم أصبح اختياري
  src?: string; // رابط الصورة
  size?: AvatarSize;
  shape?: AvatarShape;
  className?: string;
};

export function Avatar({
  name,
  src,
  size = "md",
  shape = "circle",
  className = "",

}: AvatarProps) {
  const sizeClasses: Record<AvatarSize, string> = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-md",
    lg: "w-16 h-16 text-lg",
  };

  const shapeClasses: Record<AvatarShape, string> = {
    circle: "rounded-full",
    rounded: "rounded-xl",
  };

  // استخراج أول حرف من كل كلمة إذا الاسم موجود
  const initials = name
    ? name
        .split(" ")
        .map((n) => n.charAt(0).toUpperCase())
        .join("")
    : "?";

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white font-semibold overflow-hidden",
        sizeClasses[size],
        shapeClasses[shape],
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
