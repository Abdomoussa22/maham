"use client";
import React from "react";
import { useField } from "formik";

type TextBoxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder?: string;
  name: string; // مطلوب من أجل Formik
};

export function TextBoxFormik({ label,placeholder, ...props }: TextBoxProps) {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      <label htmlFor={props.id || props.name} className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>

      {/* Input */}
      <input
        {...field}
        {...props}
        placeholder={placeholder}
        className={`px-3 py-2 rounded-lg border outline-none transition 
          ${meta.touched && meta.error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
          dark:bg-gray-800 dark:text-white
        `}
      />

      {/* Error Message */}
      {meta.touched && meta.error ? (
        <span className="text-sm text-red-500">{meta.error}</span>
      ) : null}
    </div>
  );
}
