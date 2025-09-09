"use client";
import React from "react";
import { Formik, Form } from "formik";
import { Button1 } from "../buttons/button";

type FormikFormProps = {
  initialValues: Record<string, any>;
  validationSchema: any; // Yup schema
  onSubmit: (values: any) => void;
  onReset?: () => void;
  children: React.ReactNode; // الحقول (TextBox, Select, ...)
  submitText?: string;
  resetText?: string;
};

export function FormikForm({
  initialValues,
  validationSchema,
  onSubmit,
  onReset,
  children,
  submitText = "إرسال",
  resetText = "إعادة تعيين",
}: FormikFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, handleReset }) => (
        <Form className="flex flex-col gap-4">
          {/* Fields */}
          {children}

          {/* Buttons */}
          <div className="flex gap-2 justify-end mt-4">
            {onReset && (
              <Button1
                type="button"
                variant="secondary"
                onClick={() => {
                  handleReset();
                  onReset();
                }}
              >
                {resetText}
              </Button1>
            )}
            <Button1 type="submit" variant="default" disabled={isSubmitting}>
              {isSubmitting ? "جاري الإرسال..." : submitText}
            </Button1>
          </div>
        </Form>
      )}
    </Formik>
  );
}
