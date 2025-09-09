"use client";
import React from "react";
import { useField } from "formik";

type CheckboxFormikProps = {
  name: string;
  label: string;
  disabled?: boolean;
  className?: string;
};

export function CheckboxFormik({ name, label, disabled = false, className = "" }: CheckboxFormikProps) {
  const [field, meta] = useField({ name, type: "checkbox" });

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        {...field}
        id={name}
        disabled={disabled}
        className="w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 text-blue-600"
      />
      <label htmlFor={name} className="select-none">
        {label}
      </label>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm ml-2">{meta.error}</div>
      )}
    </div>
  );
}
