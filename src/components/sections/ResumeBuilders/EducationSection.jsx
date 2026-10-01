import React from "react";
import {
  Trash2,
  Plus,
  GraduationCap,
} from "lucide-react";

import SectionShell from "./SectionShell";

const createEducation = () => ({
  id: crypto.randomUUID(),
  institution: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  grade: "",
});

export default function EducationSection({
  resume,
  updateResume,
}) {
  const items = resume?.educations || [];

  const set = (next) =>
    updateResume({
      educations: next,
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
    set([...items, createEducation()]);
  };

  const remove = (index) => {
    set(items.filter((_, i) => i !== index));
  };

  return (
    <SectionShell
      title="Education"
      description="Add the education that supports your professional story."
    >
      <div className="space-y-4">
        {items.map((item, i) => (
          <div
            key={item.id || i}
            className="
              rounded-2xl
              border
              border-[#ece7dc]
              bg-[#fdfcf9]
              p-5
            "
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1c1917] text-white">
                  <GraduationCap size={13} />
                </span>

                <span className="text-xs font-bold">
                  Education {i + 1}
                </span>
              </div>

              <button
                type="button"
                onClick={() => remove(i)}
                className="rounded-lg p-1.5 text-[#a8a29e] hover:bg-[#c2410c]/10 hover:text-[#c2410c]"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Institution", "institution"],
                ["Degree", "degree"],
                ["Field", "field"],
                ["Start date", "startDate"],
                ["End date", "endDate"],
                ["Grade", "grade"],
              ].map(([label, key]) => (
                <label key={key}>
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
                      text-sm
                      outline-none
                      focus:border-[#c2410c]/50
                    "
                  />
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={add}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-dashed
            border-[#d6cfc0]
            py-4
            text-xs
            font-bold
            text-[#57534e]
            transition
            hover:border-[#c2410c]/40
            hover:bg-[#c2410c]/[0.03]
            hover:text-[#c2410c]
          "
        >
          <Plus size={15} />
          Add education
        </button>
      </div>
    </SectionShell>
  );
}