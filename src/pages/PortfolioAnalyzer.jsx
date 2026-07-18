import React from "react";
import { portfolioSuggestions } from "../data/porfolioSuggestions";
import PageTransition from "../components/layouts/PageTransition";
import { Sparkles, Globe, ArrowRight, CheckCircle2 } from "lucide-react";

function PortfolioAnalyzer() {
  return (
    <PageTransition>
      <section className="min-h-screen pt-25 md:pt-30 pb-10 font-rubik px-4 md:px-6">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-white/40 bg-white/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 md:p-10 lg:p-12">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-700">
              <Sparkles size={16} />
              AI Powered Portfolio Review
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Analyze Your Portfolio
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Receive AI-powered feedback on design, responsiveness, SEO,
              accessibility, and recruiter experience.
            </p>
          </div>

          {/* URL Input */}
          <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Globe
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="url"
                placeholder="https://yourportfolio.com"
                className="
                  h-16
                  w-full
                  rounded-2xl
                  border
                  border-white/50
                  bg-white/80
                  pl-14
                  pr-5
                  text-gray-700
                  shadow-lg
                  outline-none
                  transition
                  duration-300
                  focus:border-cyan-400
                  focus:ring-4
                  focus:ring-cyan-100
                "
              />
            </div>

            <button
              className="
                flex
                h-16
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-blue-600
                px-8
                font-semibold
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                active:scale-95
              "
            >
              Analyze
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Suggestions */}
          <div className="mt-16">
            <div className="mb-8 flex items-center gap-3">
              <Sparkles className="text-cyan-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                AI Improvement Suggestions
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {portfolioSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="
                    group
                    rounded-3xl
                    border
                    border-gray-100
                    bg-white/80
                    p-6
                    shadow-md
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-cyan-200
                    hover:shadow-2xl
                  "
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500 text-white">
                      <CheckCircle2 size={20} />
                    </div>

                    <span className="text-sm font-semibold text-cyan-600">
                      #{index + 1}
                    </span>
                  </div>

                  <p className="leading-7 text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default PortfolioAnalyzer;