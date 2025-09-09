'use client';
import { Form, Formik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Button1 } from '../buttons/button';

type FormModalProps = {
  isOpen: boolean;
  title: string;
  initialValues: Record<string, any>;
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: any) => void;
  onClose: () => void;
  children: React.ReactNode; // الحقول (TextBox, Select, ...)
};

export function FormikModal({
  isOpen,
  title,
  initialValues,
  validationSchema,
  onSubmit,
  onClose,
  children,
}: FormModalProps) {
  // ESC close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/50 z-40'
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 flex items-center justify-center z-50'
          >
            <div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-lg mx-4 overflow-hidden'>
              {/* Header */}
              <div className='flex justify-between items-center px-6 py-3 border-b'>
                <h2 className='text-lg font-semibold'>{title}</h2>
                <button
                  onClick={onClose}
                  className='text-gray-500 hover:text-gray-700 transition'
                >
                  ✕
                </button>
              </div>

              {/* Formik Form */}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  onSubmit(values);
                  resetForm();
                  onClose();
                }}
              >
                {({ isSubmitting }) => (
                  <Form className='flex flex-col'>
                    {/* Body */}
                    <div className='px-6 py-4 space-y-4'>{children}</div>

                    {/* Footer */}
                    <div className='flex justify-end gap-2 px-6 py-3 border-t'>
                      <Button1
                        variant='secondary'
                        type='button'
                        onClick={onClose}
                      >
                        إغلاق
                      </Button1>
                      <Button1
                        variant='default'
                        type='submit'
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
                      </Button1>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
