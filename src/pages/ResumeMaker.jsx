import React from "react";
import { ArrowUpRight, Star, Zap, Feather, Layers } from "lucide-react";
import PageTransition from "../components/layouts/PageTransition";

const templates = [
  {
    id: 1,
    name: "The Classic",
    image: "/templates/modern.png",
    tag: "Reader's Choice",
    icon: Star,
  
    dot: "bg-amber-500",
    note: "Recruiters keep coming back to this one.",
  },
  {
    id: 2,
    name: "Boardroom",
    image: "/templates/professional.png",
    tag: "ATS Safe",
    icon: Layers,
  
    dot: "bg-teal-500",
    note: "Quietly confident. Built for screeners.",
  },
  {
    id: 3,
    name: "Bare",
    image: "/templates/minimal.png",
    tag: "No Fuss",
    icon: Feather,
   
    dot: "bg-stone-500",
    note: "Just you, your words, and white space.",
  },
  {
    id: 4,
    name: "Studio",
    image: "/templates/creative.png",
    tag: "For Makers",
    icon: Zap,
   
    dot: "bg-fuchsia-500",
    note: "For portfolios that want to be remembered.",
  },
];

function ResumeMaker() {
  return (
    <PageTransition>
      <section className="min-h-screen pt-24 md:pt-28 pb-20 font-rubik bg-transparent">
        <div className="mx-auto max-w-6xl px-6">
          {/* Header — editorial, left aligned, with a small mark */}
          <div className="mb-14 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-neutral-400/70" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                Templates · 04
              </span>
            </div>

            <h1 className="mt-6 text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-neutral-900 md:text-6xl">
              Pick a page that
              <span className="relative ml-2 inline-block">
                <span className="relative z-10 italic font-serif text-rose-500">
                  sounds
                </span>
                <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-rose-200/70 -z-0" />
              </span>
              <br />
              like you.
            </h1>

            <p className="mt-5 text-[15px] leading-relaxed text-neutral-600">
              Four layouts, hand-tuned. No clutter, no gimmicks — just clean
              typography that survives the six-second scan.
            </p>
          </div>

          {/* Templates — offset grid, some cards taller */}
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {templates.map((template, i) => {
              const Icon = template.icon;
              const isWide = i === 0;
              return (
                <article
                  key={template.id}
                  className={`group relative ${isWide ? "xl:col-span-2" : ""}`}
                >
                  {/* soft accent glow behind card */}
                 

                  <div className="relative overflow-hidden rounded-[28px] border border-neutral-200/70 bg-white/55 backdrop-blur-md transition-all duration-500 group-hover:border-neutral-300 group-hover:bg-white/75">
                    {/* Preview */}
                    <div className="relative p-4">
                      {/* tag chip */}
                      <div className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-medium text-neutral-700 shadow-sm ring-1 ring-neutral-200/80 backdrop-blur">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${template.dot}`}
                        />
                        {template.tag}
                      </div>

                      {/* index number — human touch */}
                      <span className="absolute right-6 top-6 z-20 font-serif text-2xl italic text-neutral-300">
                        0{i + 1}
                      </span>

                      <div className="overflow-hidden rounded-[20px] bg-neutral-100 ring-1 ring-neutral-200/60">
                        <img
                          src={template.image}
                          alt={template.name}
                          className="aspect-[3/4] w-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.04]"
                        />
                      </div>

                      {/* hover reveal note */}
                      <div className="pointer-events-none absolute inset-x-4 bottom-4 translate-y-2 rounded-2xl bg-neutral-900/85 px-4 py-3 text-[12px] text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        {template.note}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-end justify-between px-6 pb-6 pt-1">
                      <div>
                        <div className="flex items-center gap-2">
                          <Icon
                            size={14}
                            className="text-neutral-400"
                            strokeWidth={2}
                          />
                          <h2 className="text-[17px] font-semibold tracking-tight text-neutral-900">
                            {template.name}
                          </h2>
                        </div>
                        <p className="mt-1 text-[12.5px] text-neutral-500">
                          Editable in minutes · PDF export
                        </p>
                      </div>

                      <button className="group/btn flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white/70 text-neutral-800 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white">
                        <ArrowUpRight
                          size={18}
                          className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                        />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* footer note — like a real designer left it */}
          <p className="mt-12 text-center text-[12.5px] text-neutral-400">
            More layouts drop every month ·{" "}
            <span className="underline decoration-dotted underline-offset-4">
              request one
            </span>
          </p>
        </div>
      </section>
    </PageTransition>
  );
}

export default ResumeMaker;