import React, { useState } from "react";
import { ArrowLeft, Check, Download } from "lucide-react";
import PageTransition from "../layouts/PageTransition";
import EditorSidebar from "../ui/EditorSidebar";
import ResumePreview from "../ui/ResumePreview";

function ResumeEditor() {
  const [activeSection, setActiveSection] = useState("personal");
  const [saved, setSaved] = useState(true);

  return (
    <PageTransition>
      <section className="min-h-screen bg-transparent font-rubik pt-20 pb-14">
        <div className="mx-auto max-w-[1180px] px-5">
          {/* Top bar — like a paper header, not a chrome toolbar */}
          <header className="mb-6 flex items-center justify-between rounded-2xl border border-[#e5dcc9] bg-[#fbf7ef]/70 px-4 py-3 backdrop-blur-md">
            <button className="group flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] text-[#4a4437] transition hover:bg-[#efe7d6]">
              <ArrowLeft
                size={15}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              <span className="font-medium">Resume Maker</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full bg-[#eef2e2] px-3 py-1.5 text-[12px] text-[#5a6b3f] sm:flex">
                <Check size={13} strokeWidth={2.5} />
                {saved ? "Saved" : "Saving…"}
              </span>

              <button
                onClick={() => setSaved(true)}
                className="flex items-center gap-2 rounded-full bg-[#3f3a2e] px-4 py-2 text-[12.5px] font-medium text-[#f7f2e7] transition hover:bg-[#2b271e]"
              >
                <Download size={14} />
                Download PDF
              </button>
            </div>
          </header>

          {/* Split layout */}
          <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
            <EditorSidebar
              active={activeSection}
              onChange={setActiveSection}
            />
            <ResumePreview />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default ResumeEditor;