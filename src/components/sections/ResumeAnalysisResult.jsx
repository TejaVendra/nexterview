import React, { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  FileText,
  Lightbulb,
  Loader2,
  Sparkles,
  Target,
  TrendingUp,
  X,
  XCircle,
  AlertTriangle,
} from "lucide-react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import PageTransition from "../layouts/PageTransition.jsx";
import axiosInstance from "../../axios/axiosInstance";


// ============================================================
// SCORE COLOR
// ============================================================

const getScoreInfo = (score) => {
  if (score >= 80) {
    return {
      label: "Excellent",
      text: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      ring: "from-green-400 to-emerald-600",
    };
  }

  if (score >= 60) {
    return {
      label: "Good",
      text: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      ring: "from-cyan-400 to-blue-600",
    };
  }

  if (score >= 40) {
    return {
      label: "Needs Improvement",
      text: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      ring: "from-yellow-400 to-orange-500",
    };
  }

  return {
    label: "Needs Work",
    text: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    ring: "from-red-400 to-rose-600",
  };
};


// ============================================================
// LOADING COMPONENT
// ============================================================

function AnalysisLoader() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] px-4 pb-12 pt-24 md:pt-32">
      <div className="mx-auto max-w-7xl animate-pulse">

        {/* Header */}

        <div className="mb-10">
          <div className="h-5 w-24 rounded bg-gray-200" />

          <div className="mt-6 h-10 w-72 rounded-xl bg-gray-200" />

          <div className="mt-3 h-4 w-96 max-w-full rounded bg-gray-200" />
        </div>


        {/* Main dashboard */}

        <div className="grid gap-6 lg:grid-cols-[330px_1fr]">

          {/* Left */}

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">

            <div className="mx-auto h-48 w-48 rounded-full bg-gray-200" />

            <div className="mx-auto mt-8 h-5 w-32 rounded bg-gray-200" />

            <div className="mx-auto mt-3 h-4 w-44 rounded bg-gray-200" />

            <div className="mt-8 h-px bg-gray-200" />

            <div className="mt-8 h-5 w-full rounded bg-gray-200" />

            <div className="mt-3 h-5 w-4/5 rounded bg-gray-200" />
          </div>


          {/* Right */}

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">

            <div className="h-6 w-40 rounded bg-gray-200" />

            <div className="mt-6 space-y-3">

              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />

            </div>


            <div className="mt-10 grid gap-4 md:grid-cols-2">

              <div className="h-28 rounded-2xl bg-gray-200" />
              <div className="h-28 rounded-2xl bg-gray-200" />

            </div>

          </div>

        </div>


        {/* Bottom */}

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          <div className="h-72 rounded-[2rem] bg-white" />
          <div className="h-72 rounded-[2rem] bg-white" />

        </div>

      </div>
    </div>
  );
}


// ============================================================
// SCORE GAUGE
// ============================================================

function ScoreGauge({ score }) {
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));

  const scoreInfo = getScoreInfo(safeScore);

  return (
    <div className="flex flex-col items-center">

      <div className="relative h-52 w-52">

        {/* Outer ring */}

        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(
              from 220deg,
              #22c55e 0%,
              #22c55e ${safeScore * 0.01 * 280}%,
              #e5e7eb ${safeScore * 0.01 * 280}%,
              #e5e7eb 78%,
              transparent 78%,
              transparent 100%
            )`,
          }}
        />

        {/* Inner circle */}

        <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-white">

          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            ATS Score
          </span>

          <div className="mt-1 flex items-end">
            <span className="text-6xl font-black tracking-tight text-gray-900">
              {safeScore}
            </span>

            <span className="mb-2 ml-1 text-sm font-semibold text-gray-400">
              /100
            </span>
          </div>

          <span
            className={`mt-1 rounded-full px-3 py-1 text-xs font-bold ${scoreInfo.bg} ${scoreInfo.text}`}
          >
            {scoreInfo.label}
          </span>

        </div>

      </div>


      <p className="mt-5 max-w-[220px] text-center text-sm leading-6 text-gray-500">
        Your resume's compatibility with Applicant Tracking Systems.
      </p>

    </div>
  );
}


// ============================================================
// SCORE CARD
// ============================================================

function MiniScore({ title, score, icon: Icon }) {
  const safeScore =
    score === null || score === undefined
      ? null
      : Math.max(0, Math.min(100, Number(score)));

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="rounded-lg bg-white p-2 shadow-sm">
            <Icon size={17} className="text-gray-700" />
          </div>

          <span className="text-sm font-medium text-gray-500">
            {title}
          </span>

        </div>

        <span className="text-xl font-black text-gray-900">
          {safeScore !== null ? safeScore : "--"}
        </span>

      </div>


      {safeScore !== null && (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">

          <div
            className="h-full rounded-full bg-black transition-all duration-700"
            style={{
              width: `${safeScore}%`,
            }}
          />

        </div>
      )}

    </div>
  );
}


// ============================================================
// LIST ITEM
// ============================================================

function AnalysisListItem({ children, type = "positive" }) {
  const positive = type === "positive";

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border p-4 ${
        positive
          ? "border-green-100 bg-green-50/70"
          : "border-red-100 bg-red-50/70"
      }`}
    >

      <div
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
          positive
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {positive ? (
          <Check size={15} strokeWidth={3} />
        ) : (
          <X size={15} strokeWidth={3} />
        )}
      </div>

      <p className="text-sm leading-6 text-gray-700">
        {children}
      </p>

    </div>
  );
}


// ============================================================
// SECTION TITLE
// ============================================================

function SectionTitle({ icon: Icon, title, description }) {
  return (
    <div className="mb-6 flex items-start gap-3">

      <div className="rounded-xl bg-gray-100 p-2.5 text-gray-700">
        <Icon size={20} />
      </div>

      <div>

        <h2 className="text-xl font-bold text-gray-900">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        )}

      </div>

    </div>
  );
}


// ============================================================
// MAIN COMPONENT
// ============================================================

function ResumeAnalysisResult() {

  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);


  // ==========================================================
  // FETCH ANALYSIS
  // ==========================================================

  const fetchAnalysis = async () => {

    try {

      setLoading(true);

      const response = await axiosInstance.get(
        "/resume/analysis"
      );

      setAnalysis(response.data.analysis);

    } catch (error) {

      console.error(
        "Fetch analysis error:",
        error.response?.data || error
      );

      if (error.response?.status === 404) {

        setAnalysis(null);

      } else {

        toast.error(
          error.response?.data?.message ||
            "Failed to load resume analysis"
        );

      }

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    fetchAnalysis();
  }, []);


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return <AnalysisLoader />;
  }


  // ==========================================================
  // NO ANALYSIS
  // ==========================================================

  if (!analysis) {

    return (

      <PageTransition>

        <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-4">

          <div className="w-full max-w-md rounded-[2rem] bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50">

              <AlertTriangle
                size={30}
                className="text-yellow-500"
              />

            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No Analysis Found
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              You haven't analyzed a resume yet. Upload your
              resume to get your AI-powered analysis.
            </p>

            <button
              onClick={() => navigate("/resume-analyzer")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Analyze Resume
              <ChevronRight size={18} />
            </button>

          </div>

        </div>

      </PageTransition>

    );
  }


  const atsScore = Number(analysis.atsScore) || 0;

  const overallScore =
    analysis.overallScore !== null &&
    analysis.overallScore !== undefined
      ? Number(analysis.overallScore)
      : null;


  const scoreInfo = getScoreInfo(atsScore);


  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <PageTransition>

      <section className="min-h-screen bg-[#f7f8fa] px-4 pb-16 pt-24 font-rubik md:px-6 md:pt-32">

        <div className="mx-auto max-w-7xl">


          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="mb-8">

            <button
              onClick={() => navigate("/resume-analyzer")}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-black"
            >
              <ArrowLeft
                size={17}
                className="transition-transform group-hover:-translate-x-1"
              />

              Analyze another resume
            </button>


            <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm">

                  <Sparkles
                    size={14}
                    className="text-green-500"
                  />

                  AI Resume Analysis

                </div>

                <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-5xl">
                  Your Resume Report
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                  A detailed breakdown of your resume, ATS compatibility,
                  strengths, weaknesses and areas you can improve.
                </p>

              </div>


              {/* Status */}

              <div
                className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${scoreInfo.bg} ${scoreInfo.border} ${scoreInfo.text}`}
              >

                <CheckCircle2 size={17} />

                Analysis completed

              </div>

            </div>

          </div>


          {/* ==================================================
              MAIN HERO
          ================================================== */}

          <div className="grid gap-6 lg:grid-cols-[330px_1fr]">


            {/* =================================================
                LEFT SCORE PANEL
            ================================================= */}

            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">

              <ScoreGauge score={atsScore} />


              <div className="my-7 h-px bg-gray-100" />


              <div className="space-y-4">

                <MiniScore
                  title="Overall Score"
                  score={overallScore}
                  icon={Target}
                />

                <div className="rounded-2xl bg-gray-50 p-5">

                  <div className="flex items-center gap-2">

                    <TrendingUp
                      size={18}
                      className="text-green-500"
                    />

                    <span className="text-sm font-semibold text-gray-700">
                      Resume health
                    </span>

                  </div>

                  <p className="mt-2 text-sm leading-6 text-gray-500">

                    {atsScore >= 80
                      ? "Your resume is well optimized for ATS systems."
                      : atsScore >= 60
                      ? "Your resume has a solid foundation but can still be improved."
                      : "Your resume needs several improvements to perform better with ATS systems."}

                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                RIGHT SUMMARY PANEL
            ================================================= */}

            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm md:p-9">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-black p-2.5 text-white">

                      <Sparkles size={19} />

                    </div>

                    <h2 className="text-xl font-bold text-gray-900">
                      AI Overview
                    </h2>

                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    What our AI thinks about your resume.
                  </p>

                </div>


                <FileText
                  className="hidden text-gray-200 sm:block"
                  size={40}
                />

              </div>


              <div className="mt-7 rounded-2xl bg-gray-50 p-6">

                <p className="text-sm leading-7 text-gray-700 md:text-base">

                  {analysis.summary ||
                    "No summary was provided for this resume."}

                </p>

              </div>


              {/* Score cards */}

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <MiniScore
                  title="ATS Compatibility"
                  score={atsScore}
                  icon={Target}
                />

                <MiniScore
                  title="Overall Quality"
                  score={overallScore}
                  icon={TrendingUp}
                />

              </div>

            </div>

          </div>


          {/* ==================================================
              STRENGTHS + WEAKNESSES
          ================================================== */}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">


            {/* Strengths */}

            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">

              <SectionTitle
                icon={CheckCircle2}
                title="Strengths"
                description="Things your resume is already doing well."
              />

              <div className="space-y-3">

                {Array.isArray(analysis.pros) &&
                analysis.pros.length > 0 ? (

                  analysis.pros.map((pro, index) => (

                    <AnalysisListItem
                      key={index}
                      type="positive"
                    >
                      {pro}
                    </AnalysisListItem>

                  ))

                ) : (

                  <p className="text-sm text-gray-400">
                    No strengths found.
                  </p>

                )}

              </div>

            </div>


            {/* Weaknesses */}

            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">

              <SectionTitle
                icon={XCircle}
                title="Areas to Improve"
                description="Potential issues that may reduce your resume's impact."
              />

              <div className="space-y-3">

                {Array.isArray(analysis.cons) &&
                analysis.cons.length > 0 ? (

                  analysis.cons.map((con, index) => (

                    <AnalysisListItem
                      key={index}
                      type="negative"
                    >
                      {con}
                    </AnalysisListItem>

                  ))

                ) : (

                  <p className="text-sm text-gray-400">
                    No major issues found.
                  </p>

                )}

              </div>

            </div>

          </div>


          {/* ==================================================
              SUGGESTIONS
          ================================================== */}

          <div className="mt-6 rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">

            <SectionTitle
              icon={Lightbulb}
              title="Recommended Improvements"
              description="Actionable changes you can make to improve your resume."
            />


            <div className="grid gap-4 md:grid-cols-2">

              {Array.isArray(analysis.suggestions) &&
              analysis.suggestions.length > 0 ? (

                analysis.suggestions.map(
                  (suggestion, index) => (

                    <div
                      key={index}
                      className="group flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                    >

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">

                        <span className="text-sm font-black">
                          {index + 1}
                        </span>

                      </div>

                      <div>

                        <p className="text-sm leading-6 text-gray-700">
                          {suggestion}
                        </p>

                      </div>

                    </div>

                  )
                )

              ) : (

                <p className="text-sm text-gray-400">
                  No suggestions available.
                </p>

              )}

            </div>

          </div>


          {/* ==================================================
              MISSING SKILLS
          ================================================== */}

          <div className="mt-6 rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">

            <SectionTitle
              icon={Target}
              title="Skills to Consider Adding"
              description="Skills that could strengthen your resume based on the analysis."
            />


            <div className="flex flex-wrap gap-3">

              {Array.isArray(analysis.missingSkills) &&
              analysis.missingSkills.length > 0 ? (

                analysis.missingSkills.map(
                  (skill, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700"
                    >

                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />

                      {skill}

                    </div>

                  )
                )

              ) : (

                <p className="text-sm text-gray-400">
                  No missing skills identified.
                </p>

              )}

            </div>

          </div>


          {/* ==================================================
              SECTION SCORES
          ================================================== */}

          {analysis.sectionScores &&
            typeof analysis.sectionScores === "object" &&
            !Array.isArray(analysis.sectionScores) && (

              <div className="mt-6 rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">

                <SectionTitle
                  icon={FileText}
                  title="Section Breakdown"
                  description="How each section of your resume performed."
                />


                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  {Object.entries(
                    analysis.sectionScores
                  ).map(([section, score]) => (

                    <MiniScore
                      key={section}
                      title={
                        section.charAt(0).toUpperCase() +
                        section.slice(1)
                      }
                      score={Number(score)}
                      icon={FileText}
                    />

                  ))}

                </div>

              </div>

            )}


          {/* ==================================================
              FOOTER
          ================================================== */}

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 sm:flex-row">

            <div className="flex items-center gap-3">

              <div className="rounded-full bg-green-50 p-2 text-green-600">

                <Sparkles size={18} />

              </div>

              <p className="text-sm text-gray-500">
                Want to improve your score?
              </p>

            </div>


            <button
              onClick={() => navigate("/resume-analyzer")}
              className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-95"
            >

              Analyze another resume

              <ChevronRight size={17} />

            </button>

          </div>

        </div>

      </section>

    </PageTransition>

  );
}

export default ResumeAnalysisResult;