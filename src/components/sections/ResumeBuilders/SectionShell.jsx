import React from "react";
import { motion } from "framer-motion";

export default function SectionShell({
  title,
  description,
  children,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <header className="mb-7 flex items-start gap-4">
        <div className="flex flex-col items-center pt-1">
          <span className="h-2 w-2 rounded-full bg-[#c2410c]" />

          <span className="mt-2 h-10 w-px bg-gradient-to-b from-[#c2410c]/40 to-transparent" />
        </div>

        <div>
          <h2 className="text-[19px] font-semibold tracking-[-0.01em] text-[#1c1917]">
            {title}
          </h2>

          {description && (
            <p className="mt-1 max-w-md text-[12.5px] leading-[1.6] text-[#78716c]">
              {description}
            </p>
          )}
        </div>
      </header>

      {children}
    </motion.div>
  );
}