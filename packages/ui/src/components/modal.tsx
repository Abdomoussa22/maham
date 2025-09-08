"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
      : "bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-400";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}

type ModalProps = {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function Modal({ isOpen, title, children, onClose, onConfirm, onCancel }: ModalProps) {
  // Close modal on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-3 border-b">
                <h2 className="text-lg font-semibold">{title}</h2>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="px-6 py-4">{children}</div>

              {/* Footer */}
              <div className="flex justify-end gap-2 px-6 py-3 border-t">
                {onCancel && <Button variant="secondary" onClick={onCancel}>إغلاق</Button>}
                {onConfirm && <Button variant="primary" onClick={onConfirm}>موافق</Button>}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
