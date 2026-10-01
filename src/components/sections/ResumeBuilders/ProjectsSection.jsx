import React from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  Trash2,
  Plus,
  FolderCode,
  ExternalLink,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import SectionShell from "./SectionShell.jsx";
import AIImproveButton from "./AIImproveButton.jsx";

const createProject = () => ({
  id: crypto.randomUUID(),
  name: "",
  description: "",
  githubUrl: "",
  liveUrl: "",
  technologies: [],
});

export default function ProjectsSection({
  resume,
  updateResume,
}) {
  const items = resume?.projects || [];

  const set = (next) =>
    updateResume({
      projects: next,
    });

  const patch = (index, data) => {
    set(
      items.map((item, i) =>
        i === index
          ? {
              ...item,
              ...data,
            }
          : item
      )
    );
  };

  const add = () => {
    set([...items, createProject()]);
  };

  const remove = (index) => {
    set(items.filter((_, i) => i !== index));
  };

  return (
    <SectionShell
      title="Projects"
      description="Your strongest proof of technical ability."
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
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c2410c]/10 text-[#c2410c]">
                    <FolderCode size={13} />
                  </span>

                  <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#a8a29e]">
                    Project {String(i + 1).padStart(2, "0")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="rounded-lg p-1.5 text-[#a8a29e] transition-colors hover:bg-[#c2410c]/10 hover:text-[#c2410c]"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <input
                value={item.name || ""}
                onChange={(e) =>
                  patch(i, {
                    name: e.target.value,
                  })
                }
                placeholder="Project name"
                className="
                  mb-3
                  w-full
                  rounded-xl
                  border
                  border-[#ece7dc]
                  bg-white
                  px-3.5
                  py-2.5
                  text-[13px]
                  font-medium
                  text-[#1c1917]
                  outline-none
                  transition-all
                  placeholder:text-[#d6cfc0]
                  focus:border-[#c2410c]/50
                  focus:shadow-[0_0_0_3px_rgba(194,65,12,0.08)]
                "
              />

              <div className="relative">
                <textarea
                  rows={5}
                  value={item.description || ""}
                  onChange={(e) =>
                    patch(i, {
                      description: e.target.value,
                    })
                  }
                  placeholder="What did you build? What problem did it solve?"
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
                  onResult={(value) =>
                    patch(i, {
                      description: value,
                    })
                  }
                />
              </div>

              <input
                value={
                  Array.isArray(item.technologies)
                    ? item.technologies.join(", ")
                    : item.technologies || ""
                }
                onChange={(e) =>
                  patch(i, {
                    technologies: e.target.value
                      .split(",")
                      .map((x) => x.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="Technologies: React, Node.js, PostgreSQL"
                className="
                  mt-3
                  w-full
                  rounded-xl
                  border
                  border-[#ece7dc]
                  bg-white
                  px-3.5
                  py-2.5
                  text-[12.5px]
                  outline-none
                  focus:border-[#c2410c]/50
                "
              />

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="relative">
                  <FaGithub
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]"
                  />

                  <input
                    value={item.githubUrl || ""}
                    onChange={(e) =>
                      patch(i, {
                        githubUrl:
                          e.target.value,
                      })
                    }
                    placeholder="GitHub URL"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[#ece7dc]
                      bg-white
                      py-2.5
                      pl-9
                      pr-3.5
                      text-[12.5px]
                      outline-none
                      focus:border-[#c2410c]/50
                    "
                  />
                </div>

                <div className="relative">
                  <ExternalLink
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]"
                  />

                  <input
                    value={item.liveUrl || ""}
                    onChange={(e) =>
                      patch(i, {
                        liveUrl:
                          e.target.value,
                      })
                    }
                    placeholder="Live URL"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[#ece7dc]
                      bg-white
                      py-2.5
                      pl-9
                      pr-3.5
                      text-[12.5px]
                      outline-none
                      focus:border-[#c2410c]/50
                    "
                  />
                </div>
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

          Add project
        </motion.button>
      </div>
    </SectionShell>
  );
}