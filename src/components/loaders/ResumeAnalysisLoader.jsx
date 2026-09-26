import React from "react";
import { Brain, FileText, Sparkles } from "lucide-react";

function ResumeAnalysisLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="w-full max-w-md px-6 text-center">

        {/* Main animation */}
        <div className="relative mx-auto flex h-28 w-28 items-center justify-center">

          <div className="absolute inset-0 animate-ping rounded-full bg-cyan-200 opacity-30"></div>

          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 shadow-lg">
            <Brain size={42} />
          </div>
        </div>

        {/* Heading */}
        <h2 className="mt-8 flex items-center justify-center gap-2 text-2xl font-bold text-gray-800">
          Analyzing Your Resume
          <Sparkles className="text-cyan-500" size={22} />
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-500">
          Our AI is reviewing your resume and generating personalized
          feedback.
        </p>

        {/* Steps */}
        <div className="mt-8 space-y-3 text-left">

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div className="rounded-full bg-cyan-100 p-2 text-cyan-600">
              <FileText size={18} />
            </div>

            <span className="text-sm text-gray-600">
              Reading your resume
            </span>

            <div className="ml-auto h-2 w-2 animate-pulse rounded-full bg-cyan-500"></div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div className="rounded-full bg-purple-100 p-2 text-purple-600">
              <Brain size={18} />
            </div>

            <span className="text-sm text-gray-600">
              AI analyzing your resume
            </span>

            <div className="ml-auto h-2 w-2 animate-pulse rounded-full bg-purple-500"></div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div className="rounded-full bg-green-100 p-2 text-green-600">
              <Sparkles size={18} />
            </div>

            <span className="text-sm text-gray-600">
              Preparing recommendations
            </span>

            <div className="ml-auto h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
          </div>

        </div>

        <p className="mt-6 text-xs text-gray-400">
          This may take a few seconds...
        </p>

      </div>
    </div>
  );
}

export default ResumeAnalysisLoader;