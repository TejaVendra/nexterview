import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Building2,
} from "lucide-react";

import SectionShell from "./SectionShell";
import AIImproveButton from "./AIImproveButton";

const createExperience = () => ({
  id: crypto.randomUUID(),
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
});

const fields = [
  ["Company", "company"],
  ["Position", "position"],
  ["Location", "location"],
  ["Start date", "startDate"],
  ["End date", "endDate"],
];

export default function ExperienceSection({
  resume,
  updateResume,
}) {
  const items = resume?.experiences || [];

  const set = (next) => {
    updateResume({
      experiences: next,
    });
  };

  const add = () => {
    set([...items, createExperience()]);
  };

  const remove = (index) => {
    set(items.filter((_, i) => i !== index));
  };

  const patch = (index, patchData) => {
    set(
      items.map((item, i) =>
        i === index
          ? {
              ...item,
              ...patchData,
            }
          : item
      )
    );
  };

  return (
    <SectionShell
      title="Experience"
      description="Show what you did, not just where you worked."
    >
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {items.map((item, i) => (
            <motion.div
              key={item.id || i}
              layout
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-[#ece7dc]
                bg-[#fdfcf9]
                p-5
                transition-colors
                hover:border-[#d6cfc0]
              "
            >
              <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#c2410c] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1c1917] text-white">
                    <Building2 size={13} />
                  </span>

                  <div>
                    <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#a8a29e]">
                      Role {String(i + 1).padStart(2, "0")}
                    </p>

                    <p className="text-[12px] font-semibold text-[#1c1917]">
                      {item.position || "New position"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="rounded-lg p-1.5 text-[#a8a29e] transition-colors hover:bg-[#c2410c]/10 hover:text-[#c2410c]"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {fields.map(([label, key]) => (
                  <label
                    key={key}
                    className={
                      key === "location"
                        ? "sm:col-span-2"
                        : ""
                    }
                  >
                    <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a8a29e]">
                      {label}
                    </span>

                    <input
                      value={item[key] || ""}
                      onChange={(e) =>
                        patch(i, {
                          [key]: e.target.value,
                        })
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#ece7dc]
                        bg-white
                        px-3.5
                        py-2.5
                        text-[13px]
                        text-[#1c1917]
                        outline-none
                        transition-all
                        placeholder:text-[#d6cfc0]
                        focus:border-[#c2410c]/50
                        focus:shadow-[0_0_0_3px_rgba(194,65,12,0.08)]
                      "
                    />
                  </label>
                ))}
              </div>

              <div className="relative mt-3">
                <textarea
                  rows={5}
                  value={item.description || ""}
                  onChange={(e) =>
                    patch(i, {
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your contribution, tools and measurable results…"
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-[#ece7dc]
                    bg-white
                    p-3.5
                    pr-32
                    text-[13px]
                    leading-[1.7]
                    text-[#1c1917]
                    outline-none
                    transition-all
                    placeholder:text-[#d6cfc0]
                    focus:border-[#c2410c]/50
                    focus:shadow-[0_0_0_3px_rgba(194,65,12,0.08)]
                  "
                />

                <AIImproveButton
                  text={item.description}
                  type="experience"
                  onResult={(value) =>
                    patch(i, {
                      description: value,
                    })
                  }
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={add}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.99 }}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2.5
            rounded-2xl
            border
            border-dashed
            border-[#d6cfc0]
            py-4
            text-[11px]
            font-bold
            uppercase
            tracking-[0.14em]
            text-[#78716c]
            transition-colors
            hover:border-[#c2410c]/40
            hover:bg-[#c2410c]/[0.03]
            hover:text-[#c2410c]
          "
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1c1917] text-white">
            <Plus size={12} />
          </span>

          Add experience
        </motion.button>
      </div>
    </SectionShell>
  );
}