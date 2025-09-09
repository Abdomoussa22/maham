"use client";
import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

type StatsCardVariant = "default" | "glass" | "colored";

type StatsCardProps = {
  title: string;
  value: number;
  percentage?: string | number;
  icon?: React.ReactNode;
  variant?: StatsCardVariant;
  className?: string;
  duration?: number; // مدة الأنيميشن بالثواني
  width?: string;    // عرض الكارد (مثال: w-72 أو "18rem")
  height?: string;   // ارتفاع الكارد (مثال: h-48 أو "12rem")
};

export function StatsCard({
  title,
  value,
  percentage,
  icon,
  variant = "default",
  className = "",
  duration = 2,
  width = "w-72",
  height = "h-32",
}: StatsCardProps) {
  const base =
    `flex items-center justify-between p-4 rounded-xl shadow-md transition-all ${width} ${height}`;

  const variantsStyles: Record<StatsCardVariant, string> = {
    default:
      "bg-white text-black dark:bg-gray-800 dark:text-white",
    glass:
      "bg-white/30 dark:bg-gray-800/30 backdrop-blur-md text-black dark:text-white border border-white/20 dark:border-gray-200/20",
    colored: "bg-blue-600 text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${base} ${variantsStyles[variant]} ${className}`}
    >
      {/* أيقونة على اليسار */}
      {icon && <div className="text-4xl flex-shrink-0 mr-4">{icon}</div>}

      {/* محتوى النصوص على اليمين */}
<div className="flex flex-col justify-between items-end flex-1 text-right h-full">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-2xl font-bold">
          <CountUp start={0} end={value} duration={duration} separator="," />
        </span>
        {percentage && (
          <span
            className={`text-sm mt-1 ${
              Number(percentage) > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {percentage}%
          </span>
        )}
      </div>
    </motion.div>
  );
}
