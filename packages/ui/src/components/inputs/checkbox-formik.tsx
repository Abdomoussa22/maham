"use client";
import React from "react";
import { useField } from "formik";
import { Check } from "lucide-react"; // أيقونة الصح

type CheckboxFormikProps = {
  name: string;
  label: string;
  disabled?: boolean;
  className?: string;
};

export function CheckboxFormik({
  name,
  label,
  disabled = false,
  className = "",
}: CheckboxFormikProps) {
  const [field, meta] = useField({ name, type: "checkbox" });

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <div
          className={`relative w-5 h-5 flex items-center justify-center rounded-md border transition 
          ${field.checked ? "bg-blue-600 border-blue-600" : "border-gray-300"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <input
            type="checkbox"
            {...field}
            disabled={disabled}
            className="absolute w-0 h-0 opacity-0 cursor-pointer"
          />
          {field.checked && <Check size={14} className="text-white" />}
        </div>
        <span>{label}</span>
      </label>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm ml-2">{meta.error}</div>
      )}
    </div>
  );
}
