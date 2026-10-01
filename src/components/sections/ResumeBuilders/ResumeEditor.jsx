import React, { useMemo } from "react";
import { motion } from "framer-motion";

import {
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  Lightbulb,
  UserRound,
  Wrench,
  Award,
} from "lucide-react";

import PersonalSection from "./PersonalSection";
import SummarySection from "./SummarySection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import CertificationSection from "./CertificationSection";

const sections = [
  ["personal", "Personal", UserRound],
  ["summary", "Summary", FileText],
  ["experience", "Experience", BriefcaseBusiness],
  ["education", "Education", GraduationCap],
  ["projects", "Projects", Wrench],
  ["skills", "Skills", Lightbulb],
  ["certifications", "Certifications", Award],
];

const renderers = {
  personal: PersonalSection,
  summary: SummarySection,
  experience: ExperienceSection,
  education: EducationSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  certifications: CertificationSection,
};

export default function ResumeEditor({
  resume,
  updateResume,
  activeSection,
  setActiveSection,
}) {
  const Component = useMemo(
    () => renderers[activeSection] || PersonalSection,
    [activeSection]
  );

  return (
    <div className="flex h-full min-h-[calc(100vh-7rem)] flex-col">

      {/* Header */}
      <div className="border-b border-[#ece7dc] px-6 py-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c2410c]">
          Build your resume
        </p>

        <h1 className="mt-1.5 text-[22px] font-semibold tracking-[-0.02em] text-[#1c1917]">
          Make it sound like you.
        </h1>

        <p className="mt-1 text-[12px] leading-[1.6] text-[#78716c]">
          One resume, many faces. Change the design, keep your story.
        </p>
      </div>

      <div className="flex min-h-0 flex-1">

        {/* Navigation */}
        <nav className="hidden w-[168px] shrink-0 border-r border-[#ece7dc] p-3 md:block">
          <div className="space-y-0.5">
            {sections.map(([id, label, Icon], index) => {
              const active = activeSection === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSection(id)}
                  className="
                    group
                    relative
                    flex
                    w-full
                    items-center
                    gap-2.5
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    transition-colors
                  "
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-[#1c1917]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}

                  <span
                    className={`
                      relative
                      z-10
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-md
                      transition-colors
                      ${
                        active
                          ? "bg-[#c2410c] text-white"
                          : "bg-[#f5f0e6] text-[#78716c] group-hover:bg-[#e7e1d5]"
                      }
                    `}
                  >
                    <Icon size={13} />
                  </span>

                  <span
                    className={`
                      relative
                      z-10
                      text-[12px]
                      font-semibold
                      transition-colors
                      ${
                        active
                          ? "text-white"
                          : "text-[#57534e] group-hover:text-[#1c1917]"
                      }
                    `}
                  >
                    {label}
                  </span>

                  <span
                    className={`
                      relative
                      z-10
                      ml-auto
                      text-[9px]
                      font-bold
                      tabular-nums
                      transition-colors
                      ${
                        active
                          ? "text-[#c2410c]"
                          : "text-[#d6cfc0]"
                      }
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Editor */}
        <div className="min-w-0 flex-1 overflow-y-auto">
          <div className="p-5 md:p-7">

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Component
                resume={resume}
                updateResume={updateResume}
              />
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}