import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const templates = [
  {
    id: "modern",
    name: "Modern",
    desc: "Sharp, editorial, technical",
    accent: "#c2410c",
  },
  {
    id: "classic",
    name: "Classic",
    desc: "Traditional, recruiter-friendly",
    accent: "#78716c",
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Quiet, spacious, clean",
    accent: "#a8a29e",
  },
  {
    id: "professional",
    name: "Professional",
    desc: "Structured hierarchy",
    accent: "#1c1917",
  },
];

export default function TemplateSelector({
  selected,
  onSelect,
  onClose,
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1917]/40 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{
          duration: 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl overflow-hidden rounded-[24px] border border-[#ece7dc] bg-[#fdfcf9] shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-[#ece7dc] px-6 py-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c2410c]">
              Design
            </p>

            <h2 className="mt-1.5 text-[22px] font-semibold tracking-[-0.02em] text-[#1c1917]">
              Choose your template
            </h2>

            <p className="mt-1 text-[12px] text-[#78716c]">
              Your content stays the same. Only the presentation changes.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#a8a29e] transition-colors hover:bg-[#f5f0e6] hover:text-[#1c1917]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-3 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => {
            const active = selected === template.id;

            return (
              <motion.button
                type="button"
                key={template.id}
                onClick={() => onSelect(template.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 28,
                }}
                className="group text-left"
              >
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-2xl border bg-white p-3.5 shadow-sm transition-shadow ${
                    active
                      ? "border-[#c2410c] shadow-[0_0_0_3px_rgba(194,65,12,0.12)]"
                      : "border-[#ece7dc] group-hover:shadow-md"
                  }`}
                >
                  <div
                    className="h-2 w-1/2 rounded-full"
                    style={{
                      backgroundColor: template.accent,
                    }}
                  />

                  <div className="mt-3.5 space-y-2">
                    <div className="h-1.5 w-4/5 rounded bg-[#1c1917]/10" />
                    <div className="h-1 w-3/5 rounded bg-[#1c1917]/5" />

                    <div className="mt-5 h-1 w-full rounded bg-[#1c1917]/10" />
                    <div className="h-1 w-11/12 rounded bg-[#1c1917]/5" />
                    <div className="h-1 w-4/5 rounded bg-[#1c1917]/5" />

                    <div className="mt-3 h-1 w-full rounded bg-[#1c1917]/10" />
                    <div className="h-1 w-2/3 rounded bg-[#1c1917]/5" />
                  </div>

                  {active && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#c2410c] text-white shadow-lg"
                    >
                      <Check size={13} />
                    </motion.span>
                  )}
                </div>

                <h3 className="mt-3 text-[13px] font-semibold text-[#1c1917]">
                  {template.name}
                </h3>

                <p className="mt-0.5 text-[11px] text-[#78716c]">
                  {template.desc}
                </p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}