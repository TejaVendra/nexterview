import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function InterviewExit({ open, onClose, onConfirm }) {
  // Esc to dismiss
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleYes = () => {
    onConfirm?.();
    onClose?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="exit-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 backdrop-blur-[2px] p-4"
          onClick={onClose}
        >
          <motion.div
            key="exit-panel"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md border border-stone-200 bg-white/80 p-8 backdrop-blur-md"
          >
            {/* Corner ticks — matches QuestionCard language */}
            <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-stone-300" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-stone-300" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-stone-300" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-stone-300" />

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-red-800" />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500">
                End interview
              </p>
              <span className="h-px flex-1 bg-stone-200" />
            </div>

            {/* Title + copy */}
            <h2 className="font-serif text-[22px] leading-snug text-stone-900">
              Are you sure you want to end the interview?
            </h2>
            <p className="mt-3 text-[13px] leading-6 text-stone-600">
              Your responses so far are saved. You won't be able to resume this
              session once it ends.
            </p>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="border border-stone-300 bg-white/50 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-600 transition-colors hover:border-stone-800 hover:text-stone-900"
              >
                No, keep going
              </button>

              <button
                type="button"
                onClick={handleYes}
                className="border border-stone-900 bg-stone-900 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-red-900 hover:border-red-900"
              >
                Yes, end it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InterviewExit;