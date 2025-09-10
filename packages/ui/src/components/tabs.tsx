"use client";
import React, { useState, ReactNode } from "react";
import { cn } from "../lib/utils";

type Tab = {
  label: string;
  icon?: ReactNode;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultIndex?: number;
  className?: string;
};

export function Tabs({ tabs, defaultIndex = 0, className = "" }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Headers */}
      <div className="flex border-b border-gray-300 dark:border-gray-600">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 -mb-px border-b-2 transition-colors",
              activeIndex === index
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            {tab.icon && <span className="text-lg">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={activeIndex === index ? "block" : "hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
