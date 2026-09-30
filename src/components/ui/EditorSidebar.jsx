import React from "react";
import {
  User,
  AlignLeft,
  Briefcase,
  GraduationCap,
  Folder,
  Wrench,
  Award,
} from "lucide-react";

const sections = [
  { id: "personal", label: "Personal", icon: User, filled: true },
  { id: "summary", label: "Summary", icon: AlignLeft, filled: true },
  { id: "experience", label: "Experience", icon: Briefcase, filled: false },
  { id: "education", label: "Education", icon: GraduationCap, filled: true },
  { id: "projects", label: "Projects", icon: Folder, filled: false },
  { id: "skills", label: "Skills", icon: Wrench, filled: true },
  { id: "certificates", label: "Certificates", icon: Award, filled: false },
];

export default function EditorSidebar({ active, onChange }) {
  return (
    <aside className="relative overflow-hidden rounded-2xl border border-[#e5dcc9] bg-[#fbf7ef]/75 backdrop-blur-md">
      {/* torn-paper top edge accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#c9a27a] via-[#d8b58a] to-[#b98b5e]" />

      <div className="px-4 pt-5 pb-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-[15px] italic text-[#4a4437]">
            Sections
          </h2>
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#a39778]">
            07
          </span>
        </div>

        <p className="mt-1 text-[11.5px] leading-relaxed text-[#8a7f66]">
          Fill each part. Green dots are done.
        </p>
      </div>

      <ul className="px-2 pb-3">
        {sections.map((s) => {
          const Icon = s.icon;
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => onChange(s.id)}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-300 ${
                  isActive
                    ? "bg-[#efe7d6] text-[#3f3a2e]"
                    : "text-[#6b6350] hover:bg-[#f3ecdd]"
                }`}
              >
                {/* active marker — like a bookmark */}
                <span
                  className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#b98b5e] transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <Icon
                  size={15}
                  strokeWidth={1.8}
                  className={isActive ? "text-[#8a5a2b]" : "text-[#a39778]"}
                />

                <span className="flex-1 text-[13px] font-medium">
                  {s.label}
                </span>

                {s.filled && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7a8b5a]" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-dashed border-[#e0d5bf] px-4 py-3">
        <p className="text-[11px] leading-relaxed text-[#a39778]">
          Tip — keep it one page until you hit 8 years.
        </p>
      </div>
    </aside>
  );
}