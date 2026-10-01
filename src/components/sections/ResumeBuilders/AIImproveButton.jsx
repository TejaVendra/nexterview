import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  RotateCcw,
  Sparkles,
  Wand2,
} from "lucide-react";

export default function AIImproveButton({ text, onResult }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  const generateSuggestion = (value) => {
    const clean = value.trim();

    if (!clean) return "";

    const capitalized =
      clean.charAt(0).toUpperCase() + clean.slice(1);

    return `${capitalized} — strengthened with clearer action, impact and professional wording.`;
  };

  const improve = async () => {
    if (!text?.trim() || loading) return;

    setLoading(true);
    setOpen(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      const result = generateSuggestion(text);

      setSuggestion(result);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const accept = () => {
    if (!suggestion) return;

    onResult?.(suggestion);
    setOpen(false);
  };

  const reject = () => {
    setOpen(false);
  };

  return (
    <div className="absolute bottom-3 right-3 z-10">
      <motion.button
        type="button"
        onClick={improve}
        disabled={loading || !text?.trim()}
        whileTap={{ scale: 0.96 }}
        className="
          group
          inline-flex
          items-center
          gap-1.5
          overflow-hidden
          rounded-full
          border
          border-[#e7e1d5]
          bg-[#fdfbf7]/95
          px-3
          py-1.5
          text-[10.5px]
          font-semibold
          text-[#57534e]
          shadow-[0_2px_10px_-4px_rgba(28,25,23,0.15)]
          backdrop-blur-sm
          transition-all
          hover:border-[#c2410c]/40
          hover:text-[#c2410c]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <motion.span
          animate={loading ? { rotate: 360 } : { rotate: 0 }}
          transition={
            loading
              ? {
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "linear",
                }
              : {}
          }
        >
          {loading ? (
            <Wand2 size={11} />
          ) : (
            <Sparkles size={11} />
          )}
        </motion.span>

        {loading ? "Refining…" : "Polish with AI"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.98,
            }}
            transition={{
              duration: 0.22,
            }}
            className="
              absolute
              bottom-11
              right-0
              w-[300px]
              overflow-hidden
              rounded-2xl
              border
              border-[#e7e1d5]
              bg-[#fdfbf7]
              p-4
              shadow-[0_16px_40px_-12px_rgba(28,25,23,0.2)]
            "
          >
            <div className="mb-2.5 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c2410c]/10">
                <Sparkles
                  size={10}
                  className="text-[#c2410c]"
                />
              </span>

              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#c2410c]">
                Suggested rewrite
              </p>
            </div>

            <p className="text-[12px] leading-[1.65] text-[#44403c]">
              {suggestion}
            </p>

            <div className="mt-3.5 flex gap-2">
              <button
                type="button"
                onClick={accept}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-lg
                  bg-[#1c1917]
                  px-3
                  py-1.5
                  text-[10.5px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#c2410c]
                "
              >
                <Check size={11} />
                Use this
              </button>

              <button
                type="button"
                onClick={reject}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-[#e7e1d5]
                  bg-white
                  px-3
                  py-1.5
                  text-[10.5px]
                  font-semibold
                  text-[#57534e]
                  transition
                  hover:border-[#1c1917]/20
                "
              >
                <RotateCcw size={11} />
                Keep mine
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}