import React from "react";
import SectionShell from "./SectionShell";
import AIImproveButton from "./AIImproveButton";

export default function SummarySection({
  resume,
  updateResume,
}) {
  return (
    <SectionShell
      title="Professional summary"
      description="A short introduction that gives your resume direction."
    >
      <div className="relative">
        <textarea
          rows={9}
          value={resume?.summary || ""}
          onChange={(e) =>
            updateResume({
              summary: e.target.value,
            })
          }
          placeholder="Write a concise summary of who you are, what you build, and where you create value…"
          className="
            w-full
            resize-none
            rounded-2xl
            border
            border-[#ece7dc]
            bg-white
            p-4
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
          text={resume?.summary}
          onResult={(value) =>
            updateResume({
              summary: value,
            })
          }
        />
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-[10.5px] text-[#a8a29e]">
        <span className="h-1 w-1 rounded-full bg-[#c2410c]" />
        Tip: focus on your strengths, technical direction and measurable impact.
      </p>
    </SectionShell>
  );
}