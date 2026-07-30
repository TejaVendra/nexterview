import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import PageTransition from "../components/layouts/PageTransition";

const templates = [
  {
    id: 1,
    name: "Modern",
    image: "/templates/modern.png",
    tag: "Popular",
  },
  {
    id: 2,
    name: "Professional",
    image: "/templates/professional.png",
    tag: "ATS Friendly",
  },
  {
    id: 3,
    name: "Minimal",
    image: "/templates/minimal.png",
    tag: "Simple",
  },
  {
    id: 4,
    name: "Creative",
    image: "/templates/creative.png",
    tag: "Designer",
  },
];

function ResumeMaker() {
  return (
    <PageTransition>
      <section className="min-h-screen pt-22 md:pt-25 pb-16 font-rubik">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-12">
          

            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              Choose Your Resume Template
            </h1>

            <p className="mt-3 max-w-2xl text-gray-600">
              Select a professionally designed template and customize it in
              minutes. All templates are clean, modern, and ATS-friendly.
            </p>
          </div>

          {/* Templates */}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group overflow-hidden rounded-[32px] border border-white/60 bg-white/40 backdrop-blur-xl shadow-lg shadow-slate-200/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                {/* Preview */}
                <div className="relative overflow-hidden p-5">
                  <div className="absolute right-5 top-5 z-20 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                    {template.tag}
                  </div>

                  <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 pb-6">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {template.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Professional resume layout
                    </p>
                  </div>

                  <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white transition-all duration-300 hover:scale-110 hover:bg-violet-600">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default ResumeMaker;