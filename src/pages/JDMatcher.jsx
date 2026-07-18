import React from "react";
import ResumeUploader from "../components/ui/ResumeUpload";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import PageTransition from "../components/layouts/PageTransition";

function JDMatcher() {
  return (
    <PageTransition>
      <section className="pt-25 md:pt-30 px-4 pb-10 font-rubik min-h-screen">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-6 md:p-10">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Resume & JD Matcher
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Upload your resume and paste a job description to instantly analyze
            ATS compatibility, matching skills, missing keywords, and receive
            AI-powered suggestions.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Resume Upload */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-1">
              <IoDocumentTextOutline  size={22}/> Upload Resume
            </h3>

            <ResumeUploader />
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-1">
              <TfiWrite /> Job Description
            </h3>

            <textarea
              rows={16}
              placeholder="Paste the complete job description here..."
              className="w-full rounded-xl border border-gray-300 p-4 resize-none outline-none focus:scale-[1.01] transition focus:shadow-lg"
            />
          </div>

        </div>

        {/* Analyze Button */}
        <div className="flex justify-center mt-10">
          <button className="px-10 py-4 rounded-xl bg-cyan-500 text-white font-semibold shadow-lg hover:bg-cyan-600 hover:scale-105 transition-all duration-300">
            Analyze Resume
          </button>
        </div>

      </div>
    </section>
    </PageTransition>
  );
}

export default JDMatcher;