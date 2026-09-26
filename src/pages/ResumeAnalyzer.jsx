
import React, { useState } from "react";

import ResumeUpload from "../components/ui/ResumeUpload";
import ResumeAnalysisLoader from "../components/loaders/ResumeAnalysisLoader";


import PageTransition from "../components/layouts/PageTransition";

import { resumeSuggestions } from "../data/resumesuggestions";

import { FaAngleDoubleRight } from "react-icons/fa";
import { Sparkles } from "lucide-react";

import { toast } from "react-toastify";

import axiosInstance from "../axios/axiosInstance";
import { postResumeAnalysis } from "../api/resumeAPI";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysis = async () => {
    if (!file) {
      toast.error("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // IMPORTANT:
      // "resume" must match upload.single("resume")
      // in your backend route.
      formData.append("resume", file);

      const response = await postResumeAnalysis(formData);

      console.log("Analysis response:", response.data);

      toast.success("Resume analyzed successfully!");

      // Redirect to result page
      window.location.href = "/resume-analysis/result";

    } catch (error) {
      console.error(
        "Resume analysis error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to analyze resume"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <ResumeAnalysisLoader />}

      <PageTransition>
        <section className="min-h-screen px-4 pb-10 pt-23 font-rubik md:pt-30">

          <div className="mx-auto max-w-7xl rounded-3xl border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-md md:p-10">

            {/* Heading */}
            <div className="text-center">

              <h2 className="text-3xl font-bold text-gray-800 md:text-5xl">
                Resume Analyzer
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Upload your resume to receive AI-powered suggestions,
                ATS improvements, keyword recommendations, and
                formatting tips.
              </p>

            </div>

            {/* Upload */}
            <div className="mt-12">
              <ResumeUpload
                onFileSelect={(selectedFile) => {
                  setFile(selectedFile);
                }}
              />
            </div>

            {/* Analyze Button */}
            <div className="mt-8 flex justify-center">

              <button
                onClick={handleAnalysis}
                disabled={loading || !file}
                className={`rounded-xl px-10 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ${
                  !file || loading
                    ? "cursor-not-allowed bg-gray-400"
                    : "cursor-pointer bg-black/90 hover:bg-black active:scale-95"
                }`}
              >
                {loading
                  ? "Analyzing..."
                  : "Analyze Resume"}
              </button>

            </div>

            {/* Suggestions */}
            <div className="mt-14">

              <div className="mb-8 flex items-center gap-3">

                <Sparkles className="text-green-500" />

                <h2 className="text-2xl font-bold text-gray-800">
                  Resume Improvement Suggestions
                </h2>

              </div>

              <div className="grid gap-4 md:grid-cols-2">

                {resumeSuggestions.map(
                  (suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-xl border border-green-100 bg-green-50 p-5 transition-all duration-300 hover:border-green-300 hover:shadow-md"
                    >

                      <div className="mt-1 rounded-full bg-green-500 p-2 text-white">
                        <FaAngleDoubleRight size={12} />
                      </div>

                      <p className="leading-relaxed text-gray-700">
                        {suggestion}
                      </p>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </section>
      </PageTransition>
    </>
  );
}

export default ResumeAnalyzer;
