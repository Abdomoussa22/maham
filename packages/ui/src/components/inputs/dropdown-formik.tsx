"use client";
import React, { useState, useRef, useEffect } from "react";
import { useField } from "formik";
import { motion, AnimatePresence } from "framer-motion";

type Option = {
  label: string;
  value: string | number;
};

type DropdownFormikAdvancedProps = {
  name: string;
  label?: string;
  options: Option[];
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
};

export function DropdownFormikAdvanced({
  name,
  label,
  options,
  placeholder = "اختر...",
  searchable = false,
  disabled = false,
  className = "",
}: DropdownFormikAdvancedProps) {
  const [field, meta, helpers] = useField(name);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`flex flex-col relative ${className}`} ref={dropdownRef}>
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}

      {/* Input / button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border rounded px-3 py-2 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <span>{field.value ? field.value : placeholder}</span>
        <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg max-h-60 overflow-auto"
          >
            {searchable && (
              <input
                type="text"
                placeholder="ابحث..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-b px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    helpers.setValue(opt.value);
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                >
                  {opt.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-400">لا توجد خيارات</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {meta.touched && meta.error && (
        <span className="text-red-500 text-sm mt-1">{meta.error}</span>
      )}
    </div>
  );
}
