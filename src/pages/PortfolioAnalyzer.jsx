import React from "react";
import { portfolioSuggestions } from "../data/porfolioSuggestions";
import PageTransition from "../components/layouts/PageTransition";
import { Sparkles, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import AnalyzeButton from "../components/ui/AnalyzeButton.jsx";

function PortfolioAnalyzer() {
  return (
    <PageTransition>
      <section className="min-h-screen pt-23 md:pt-30 pb-10 font-rubik px-4 md:px-6">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-white/40 bg-white/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 md:p-10 lg:p-12">
      
          <div className="mx-auto max-w-3xl text-center">
            

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Analyze Your Portfolio
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Receive AI-powered feedback on design, responsiveness, SEO,
              accessibility, and recruiter experience.
            </p>
          </div>

          <div className="mx-auto mt-12 flex max-w-4xl flex-col justify-center items-center gap-4 md:flex-row">
            <div className="relative flex-1">
              <Globe
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="url"
                placeholder="https://yourportfolio.com"
                className="
                  h-13
                  w-full
                  rounded-2xl
                  border
                  border-white/50
                  bg-white/80
                  pl-14
                  pr-5
                  text-gray-700
                  inset-shadow-sm
                  inset-shadow-gray-200
                
                  outline-none
                  transition
                  duration-300
                
                  focus:ring-2
                  focus:ring-gray-200
                "
              />
            </div>

            <div className="flex justify-center">
              <AnalyzeButton
                onClick={null}
              />
            </div>
          </div>

      
          <div className="mt-16">
            <div className="mb-8 flex items-center gap-3">
           
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
                    
                    hover:-translate-y-1
                    hover:border-cyan-200
                    hover:shadow-xl
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