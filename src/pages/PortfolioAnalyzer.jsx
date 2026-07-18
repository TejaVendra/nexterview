import React from "react";
import { portfolioSuggestions } from "../data/porfolioSuggestions";
import PageTransition from "../components/layouts/PageTransition";

function PortfolioAnalyzer() {
  return (
    <PageTransition>
      <section className="pt-25 md:pt-30 font-rubik min-h-screen">
      <div className="max-w-7xl py-10 mx-auto px-5 bg-white/60 backdrop-blur-lg rounded-[50px]">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Portfolio Analyzer
          </h2>
          <p className="mt-3 text-gray-600">
            Enter your portfolio URL to receive personalized improvement
            suggestions.
          </p>
        </div>

        {/* Input */}
        <div className="flex justify-center mt-10">
          <input
            type="url"
            placeholder="https://yourportfolio.com"
            autoFocus
            className="w-full md:w-3/4 xl:w-1/2 p-4 rounded-full border-2 border-transparent  focus:shadow-2xl outline-1 focus:outline-none focus:scale-[1.01] transition-all duration-300 focus:bg-white/60"
          />
        </div>

        {/* Suggestions */}
        <div className="mt-14">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Portfolio Suggestions
          </h3>

          <div className="grid gap-5 md:grid-cols-2">
            {portfolioSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white font-semibold shrink-0">
                  {index + 1}
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {suggestion}
                </p>
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