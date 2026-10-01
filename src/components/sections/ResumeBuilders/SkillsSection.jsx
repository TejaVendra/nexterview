import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  Plus,
  X,
} from "lucide-react";

import SectionShell from "./SectionShell.jsx";

export default function SkillsSection({
  resume,
  updateResume,
}) {
  const [value, setValue] = useState("");

  const skills = resume?.skills || [];

  const add = () => {
    const v = value.trim();

    if (!v) return;

    const exists = skills.some((skill) => {
      const name =
        typeof skill === "string"
          ? skill
          : skill?.name;

      return (
        name?.toLowerCase() ===
        v.toLowerCase()
      );
    });

    if (exists) return;

    updateResume({
      skills: [
        ...skills,
        {
          id: crypto.randomUUID(),
          name: v,
        },
      ],
    });

    setValue("");
  };

  const remove = (index) => {
    updateResume({
      skills: skills.filter(
        (_, i) => i !== index
      ),
    });
  };

  return (
    <SectionShell
      title="Skills"
      description="Keep this focused on skills you can actually demonstrate."
    >
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="e.g. React, Python, PostgreSQL"
          className="
            min-w-0
            flex-1
            rounded-xl
            border
            border-[#ece7dc]
            bg-white
            px-3.5
            py-3
            text-[13px]
            text-[#1c1917]
            outline-none
            transition-all
            placeholder:text-[#d6cfc0]
            focus:border-[#c2410c]/50
            focus:shadow-[0_0_0_3px_rgba(194,65,12,0.08)]
          "
        />

        <motion.button
          type="button"
          onClick={add}
          whileTap={{ scale: 0.95 }}
          className="
            rounded-xl
            bg-[#1c1917]
            px-4
            text-white
            transition-colors
            hover:bg-[#c2410c]
          "
        >
          <Plus size={17} />
        </motion.button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <AnimatePresence initial={false}>
          {skills.map((skill, i) => {
            const name =
              typeof skill === "string"
                ? skill
                : skill?.name || "";

            return (
              <motion.span
                key={skill?.id || `${name}-${i}`}
                layout
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                }}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#ece7dc]
                  bg-[#fdfcf9]
                  px-3.5
                  py-2
                  text-[12px]
                  font-semibold
                  text-[#44403c]
                  shadow-sm
                  transition-colors
                  hover:border-[#c2410c]/40
                "
              >
                {name}

                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-[#a8a29e] transition-colors hover:text-[#c2410c]"
                >
                  <X size={12} />
                </button>
              </motion.span>
            );
          })}
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}