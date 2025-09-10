"use client";
import React, { useState } from "react";
import { useField } from "formik";
import moment from "moment-hijri"; 

type DateInputFormikProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  calendar?: "gregorian" | "hijri" | "both"; // اختيار التقويم
};

export function DateInputFormik({
  name,
  label,
  disabled = false,
  className = "",
  calendar = "gregorian",
}: DateInputFormikProps) {
  const [field, meta, helpers] = useField(name);
  const [mode, setMode] = useState<"gregorian" | "hijri">(
    calendar === "hijri" ? "hijri" : "gregorian"
  );

  const handleChange = (value: string) => {
    if (mode === "hijri") {
      // تحويل هجري → ميلادي للتخزين
      const gDate = moment(value, "iYYYY-iMM-iDD").format("YYYY-MM-DD");
      helpers.setValue(gDate);
    } else {
      helpers.setValue(value);
    }
  };

  const displayValue =
    mode === "hijri" && field.value
      ? moment(field.value, "YYYY-MM-DD").format("iYYYY-iMM-iDD")
      : field.value || "";

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={name} className="mb-1 text-sm font-medium">
          {label}
        </label>
      )}

      <div className="flex items-center gap-2">
        <input
          id={name}
          type="date"
          disabled={disabled || mode === "hijri"}
          value={mode === "gregorian" ? displayValue : ""}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={() => helpers.setTouched(true)}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            meta.touched && meta.error ? "border-red-500" : "border-gray-300"
          } flex-1`}
        />

        {mode === "hijri" && (
          <input
            type="text"
            placeholder="YYYY-MM-DD (Hijri)"
            value={displayValue}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={() => helpers.setTouched(true)}
            className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              meta.touched && meta.error ? "border-red-500" : "border-gray-300"
            } flex-1`}
          />
        )}

        {calendar === "both" && (
          <button
            type="button"
            onClick={() =>
              setMode(mode === "gregorian" ? "hijri" : "gregorian")
            }
            className="px-3 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            {mode === "gregorian" ? "Hijri" : "Gregorian"}
          </button>
        )}
      </div>

      {meta.touched && meta.error && (
        <span className="text-red-500 text-sm mt-1">{meta.error}</span>
      )}
    </div>
  );
}
