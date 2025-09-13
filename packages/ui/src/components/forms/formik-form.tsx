'use client';
import { Form, Formik } from 'formik';
import React from 'react';

type FormikFormProps = {
  initialValues: Record<string, any>;
  validationSchema: any; // Yup schema
  onSubmit: (values: any) => void;
  onReset?: () => void;
  children: React.ReactNode; // fields + custom buttons
};

export function FormikForm({
  initialValues,
  validationSchema,
  onSubmit,
  onReset,
  children,
}: FormikFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      {({ isSubmitting }) => (
        <Form className='flex flex-col gap-4'>
          {/* Fields + Buttons (passed as children) */}
          {children}
        </Form>
      )}
    </Formik>
  );
}
