import React from "react";
import ResumeUpload from "../components/ui/ResumeUpload";
import { resumeSuggestions } from "../data/resumesuggestions";
import { FaAngleDoubleRight } from "react-icons/fa";

function ResumeAnalyzer() {
  return (
    <section className="pt-25 md:pt-30 font-rubik min-h-screen px-4 pb-10">
      <div className="max-w-7xl mx-auto rounded-3xl bg-white/70 backdrop-blur-md shadow-xl border border-white/20 p-6 md:p-10">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Resume Analyzer
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Upload your resume to receive AI-powered suggestions, ATS improvements,
            keyword recommendations, and formatting tips.
          </p>
        </div>

        {/* Upload */}
        <div className="mt-12">
          <ResumeUpload />
        </div>

        {/* Button */}
        <div className="flex justify-center mt-8">
          <button className="rounded-xl bg-cyan-500 px-10 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-cyan-600 hover:scale-105">
            Analyze Resume
          </button>
        </div>

        {/* Suggestions */}
        <div className="mt-14">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Resume Improvement Suggestions
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {resumeSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-green-100 bg-green-50 p-5 transition-all duration-300 hover:border-green-300 hover:shadow-md"
              >
                <div className="mt-1 rounded-full bg-green-500 p-2 text-white">
                  <FaAngleDoubleRight size={12} />
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
  );
}

export default ResumeAnalyzer;