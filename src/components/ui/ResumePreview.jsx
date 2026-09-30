import React from "react";

export default function ResumePreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#e5dcc9] bg-[#fbf7ef]/75 backdrop-blur-md">
      {/* soft paper grain top bar */}
      <div className="flex items-center justify-between border-b border-[#ece3d1] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#c9a27a]" />
          <span className="h-2 w-2 rounded-full bg-[#d8b58a]" />
          <span className="h-2 w-2 rounded-full bg-[#e3d9c2]" />
        </div>
        <span className="font-serif text-[11.5px] italic text-[#a39778]">
          preview · a4
        </span>
      </div>

      {/* Page area */}
      <div className="p-6 md:p-8">
        <article className="mx-auto max-w-[680px] rounded-xl border border-[#ece3d1] bg-white/85 p-8 shadow-[0_1px_0_#fff_inset,0_20px_40px_-24px_rgba(122,102,70,0.25)] md:p-10">
          {/* Name */}
          <header className="border-b border-dashed border-[#e8dfcc] pb-5">
            <h1 className="font-serif text-[28px] leading-tight tracking-tight text-[#2f2a1f]">
              Your Name
            </h1>
            <p className="mt-1 text-[13px] tracking-wide text-[#8a5a2b]">
              Software Developer
            </p>
            <p className="mt-2 text-[11.5px] text-[#a39778]">
              you@example.com · +91 · city, country
            </p>
          </header>

          {/* Summary */}
          <section className="mt-6">
            <SectionTitle>Summary</SectionTitle>
            <p className="mt-2 text-[13px] leading-relaxed text-[#5b5342]">
              Short paragraph about what you build, what you care about, and
              the kind of team you want to join. Two lines is enough.
            </p>
          </section>

          {/* Experience */}
          <section className="mt-6">
            <SectionTitle>Experience</SectionTitle>

            <Entry
              title="Software Engineer"
              place="Company"
              time="2023 — Present"
              body="Shipped the thing, broke the other thing, fixed it before Friday. Reduced load time by 40%."
            />
            <Entry
              title="Junior Developer"
              place="Studio"
              time="2021 — 2023"
              body="Built internal tools nobody asked for but everyone used."
            />
          </section>

          {/* Education */}
          <section className="mt-6">
            <SectionTitle>Education</SectionTitle>
            <Entry
              title="B.Tech, Computer Science"
              place="University"
              time="2017 — 2021"
            />
          </section>

          {/* Skills */}
          <section className="mt-6">
            <SectionTitle>Skills</SectionTitle>
            <div className="mt-2 flex flex-wrap gap-2">
              {["React", "Node.js", "TypeScript", "MongoDB", "Figma"].map(
                (s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[#e0d5bf] bg-[#faf5ea] px-3 py-1 text-[11.5px] text-[#6b6350]"
                  >
                    {s}
                  </span>
                )
              )}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

/* ---------- small pieces ---------- */

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a5a2b]">
        {children}
      </h2>
      <span className="h-px flex-1 bg-[#e8dfcc]" />
    </div>
  );
}

function Entry({ title, place, time, body }) {
  return (
    <div className="mt-3">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[13.5px] font-semibold text-[#2f2a1f]">
          {title}
        </h3>
        <span className="text-[11px] tracking-wide text-[#a39778]">
          {time}
        </span>
      </div>
      <p className="text-[12px] italic text-[#8a7f66]">{place}</p>
      {body && (
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#5b5342]">
          {body}
        </p>
      )}
    </div>
  );
}