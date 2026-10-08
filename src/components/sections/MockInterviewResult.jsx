import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion ,AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock3,
  MessageSquareText,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  BriefcaseBusiness,
} from "lucide-react";

import PageTransition from "../layouts/PageTransition.jsx";
import { getInterviewResult } from "../../api/interviewAPI.js";

function getScoreLabel(score) {
  if (score >= 9) return "Excellent";
  if (score >= 7) return "Strong";
  if (score >= 5) return "Good";
  if (score >= 3) return "Needs Improvement";
  return "Needs More Practice";
}

function getScorePercentage(score) {
  if (score == null) return 0;

  const normalizedScore = Number(score);

  return Math.min(
    100,
    Math.max(0, normalizedScore * 10)
  );
}

function formatDuration(seconds) {
  if (!seconds) return "0 min";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function ScoreCircle({ score }) {
  const percentage = getScorePercentage(score);

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 120 120"
      >
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-[#eeeae2]"
        />

        <motion.circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          className="text-[#c2410c]"
          initial={{
            strokeDasharray: "0 314",
          }}
          animate={{
            strokeDasharray: `${
              percentage * 3.14
            } 314`,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
        />
      </svg>

      <div className="relative text-center">
        <p className="text-4xl font-bold tracking-tight text-[#1c1917]">
          {score != null ? Number(score).toFixed(1) : "—"}
        </p>

        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a8a29e]">
          / 10
        </p>
      </div>
    </div>
  );
}

function QuestionCard({ question, index }) {
  const [open, setOpen] = useState(index === 0);

  const score = question.score != null ? Number(question.score) : null;

  // Warm, editorial palette — no AI-default blues/purples/greens
  const tone = (() => {
    if (score == null) return { text: "text-stone-400", dot: "bg-stone-300", wash: "bg-stone-50" };
    if (score >= 9)    return { text: "text-orange-900", dot: "bg-orange-700", wash: "bg-orange-50/60" };
    if (score >= 7)    return { text: "text-amber-900",  dot: "bg-amber-700",  wash: "bg-amber-50/60" };
    if (score >= 5)    return { text: "text-yellow-900", dot: "bg-yellow-600", wash: "bg-yellow-50/60" };
    return               { text: "text-red-900",    dot: "bg-red-800",    wash: "bg-red-50/60" };
  })();

  const verdict =
    score == null ? "Unrated"
    : score >= 9  ? "Exceptional"
    : score >= 7  ? "Strong"
    : score >= 5  ? "Developing"
    :               "Needs work";

  const qno = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white/50 backdrop-blur-xl"
    >

      <span className="absolute inset-x-0 top-0 h-px bg-stone-200/80 transition-colors group-hover:bg-stone-300" />

      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="relative flex w-full items-start gap-6 px-1 py-8 text-left"
      >

        <span
          aria-hidden
          className="pointer-events-none absolute -top-3 left-0 select-none font-serif text-[64px] leading-none text-blue-400 transition-colors group-hover:text-blue-700/70"
        >
          {qno}
        </span>

        {/* Left rail: dot + vertical tick */}
        <div className="relative z-10 mt-1 flex w-8 shrink-0 flex-col items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${tone.dot} ring-4 ring-white/60`} />
          <span className="h-6 w-px bg-stone-200" />
        </div>

        {/* Body */}
        <div className="relative z-10 min-w-0 flex-1 pr-4">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
            Q{qno} · Interview
          </p>

          <p className="text-[15px] font-medium leading-7 text-stone-800 transition-colors group-hover:text-stone-950">
            {question.question}
          </p>

          {/* Tiny inline meta — mobile only */}
          <div className="mt-3 flex items-center gap-3 sm:hidden">
            <span className={`font-serif text-lg leading-none ${tone.text}`}>
              {score != null ? score.toFixed(1) : "—"}
            </span>
            <span className="text-[11px] text-stone-400">/ 10</span>
            <span className="text-[11px] italic text-stone-500">{verdict}</span>
          </div>
        </div>

        {/* Right rail: score block + toggle */}
        <div className="relative z-10 flex shrink-0 items-center gap-6">
          <div className="hidden text-right sm:block">
            <div className="flex items-baseline justify-end gap-1.5">
              <span className={`font-serif text-[28px] leading-none ${tone.text}`}>
                {score != null ? score.toFixed(1) : "—"}
              </span>
              <span className="text-[11px] text-stone-400">/10</span>
            </div>
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-stone-400">
              {verdict}
            </p>
          </div>

          {/* Toggle: a square, not a circle — cheaper, sharper */}
          <div
            className={`flex h-7 w-7 items-center justify-center border transition-all duration-300 ${
              open
                ? "rotate-45 border-stone-800 bg-stone-900 text-white"
                : "border-stone-300 bg-white/50 text-stone-500 group-hover:border-stone-800"
            }`}
          >
            {open ? (
              <ChevronUp size={14} strokeWidth={1.6} />
            ) : (
              <ChevronDown size={14} strokeWidth={1.6} />
            )}
          </div>
        </div>
      </button>

      {/* Expanded — subtle wash, editorial rules, serif labels */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className={`relative mx-1 mb-6 ${tone.wash} bg-gray-50 px-6 py-8 sm:px-10`}>
              {/* Corner ticks — like a technical drawing */}
              <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-stone-300" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-stone-300" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-stone-300" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-stone-300" />

              {/* Question recap */}
              <Section label="Prompt" accent={tone.dot}>
                <p className="max-w-3xl font-serif text-[16px] leading-8 text-stone-800">
                  {question.question}
                </p>
              </Section>

              {/* Answer */}
              <Section label="Response" accent="bg-stone-400">
                {question.answer ? (
                  <p className="max-w-3xl whitespace-pre-wrap text-[14px] leading-7 text-stone-700">
                    {question.answer}
                  </p>
                ) : (
                  <p className="max-w-3xl text-[13px] italic text-stone-400">
                    — No response recorded —
                  </p>
                )}
              </Section>

              {/* Feedback */}
              <Section
                label="Reviewer"
                accent={tone.dot}
                trailing={
                  <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${tone.text}`}>
                    {verdict}
                  </span>
                }
                last
              >
                <p className="max-w-3xl whitespace-pre-wrap text-[14px] leading-7 text-stone-700">
                  {question.feedback || "— No notes provided —"}
                </p>
              </Section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}


function Section({ label, accent, trailing, children, last }) {
  return (
    <section className={last ? "" : "mb-7"}>
      <div className="mb-3 flex items-center gap-3">
        <span className={`h-1.5 w-1.5 rounded-full ${accent}`} />
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500">
          {label}
        </p>
        <span className="h-px flex-1 bg-stone-200" />
        {trailing}
      </div>
      {children}
    </section>
  );
}

export default function MockInterviewResult() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [interview, setInterview] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      const interviewId = Number(id);

      if (!Number.isInteger(interviewId)) {
        setError("Invalid interview ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getInterviewResult(interviewId);

         console.log(response)

        setInterview(response.data.interview);
      } catch (error) {
        console.error(
          "Failed to fetch interview result:",
          error
        );

        setError(
          error?.response?.data?.message ||
            "Failed to load interview result."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  const statistics = useMemo(() => {
    if (!interview) {
      return {
        total: 0,
        answered: 0,
        average: 0,
      };
    }

    const questions = interview.questions || [];

    const answered = questions.filter(
      (question) =>
        question.answer &&
        question.answer.trim()
    ).length;

    const scored = questions.filter(
      (question) =>
        typeof question.score === "number"
    );

    const average =
      scored.length > 0
        ? scored.reduce(
            (sum, question) =>
              sum + question.score,
            0
          ) / scored.length
        : 0;

    return {
      total: questions.length,
      answered,
      average,
    };
  }, [interview]);

  if (loading) {
    return (
      <PageTransition>
        <section className="min-h-screen bg-transparent px-4 pb-10 pt-23 font-rubik md:pt-30">
          <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#e7e1d5] border-t-[#c2410c]" />

              <p className="mt-4 text-sm text-[#78716c]">
                Loading interview result...
              </p>
            </div>
          </div>
        </section>
      </PageTransition>
    );
  }

  if (error || !interview) {
    return (
      <PageTransition>
        <section className="min-h-screen bg-transparent px-4 pb-10 pt-23 font-rubik md:pt-30">
          <div className="mx-auto max-w-7xl">
            <button
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#57534e]"
            >
              <ArrowLeft size={17} />
              Back
            </button>

            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
              <CircleAlert
                className="mx-auto text-red-500"
                size={32}
              />

              <p className="mt-3 text-sm font-semibold text-red-700">
                {error ||
                  "Interview result not found."}
              </p>
            </div>
          </div>
        </section>
      </PageTransition>
    );
  }

  const score = interview.score ?? 0;

  return (
    <PageTransition>
      <section className="min-h-screen px-4 pb-12 pt-23 font-rubik md:pt-30">
        <div className="mx-auto max-w-7xl">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#57534e] transition-colors hover:text-[#1c1917]"
          >
            <ArrowLeft size={17} />
            Back to interviews
          </button>

          {/* Header */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-3xl border border-white/30 bg-white/60 p-6 shadow backdrop-blur-2xl md:p-10"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#f5f0e6] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#57534e]">
                  <Award size={13} />
                  Interview Completed
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-[#1c1917] md:text-5xl">
                  Interview Results
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#78716c]">
                  Review your performance, AI feedback,
                  and answers from this mock interview.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#ece7dc] bg-white px-3 py-1.5 text-xs font-semibold text-[#57534e]">
                    {interview.role}
                  </span>

                  <span className="rounded-full border border-[#ece7dc] bg-white px-3 py-1.5 text-xs font-semibold text-[#57534e]">
                    {interview.round}
                  </span>

                  <span className="rounded-full border border-[#ece7dc] bg-white px-3 py-1.5 text-xs font-semibold text-[#57534e]">
                    {interview.experience}
                  </span>
                </div>
              </div>

              <div className="flex justify-center lg:pr-8">
                <ScoreCircle score={score} />
              </div>
            </div>
          </motion.div>

          {/* Statistics */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={Target}
              label="Overall Score"
              value={`${Math.round(score)}/10`}
            />

            <StatCard
              icon={MessageSquareText}
              label="Questions"
              value={statistics.total}
            />

            <StatCard
              icon={CheckCircle2}
              label="Answered"
              value={`${statistics.answered}/${statistics.total}`}
            />

            <StatCard
              icon={Clock3}
              label="Duration"
              value={formatDuration(
                interview.elapsedSeconds
              )}
            />
          </div>

          {/* Feedback */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="mt-5 rounded-3xl border border-[#ece7dc] bg-white/50 p-6 shadow-sm md:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f5f0e6]">
                <TrendingUp
                  size={19}
                  className="text-[#c2410c]"
                />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a8a29e]">
                  Overall feedback
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#1c1917]">
                  {getScoreLabel(score)}
                </h2>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#B39DDB]/10 p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-[#57534e]">
                {interview.feedback ||
                  "No overall feedback was generated for this interview."}
              </p>
            </div>
          </motion.div>

          {/* Interview Information */}
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <InfoCard
              icon={BriefcaseBusiness}
              label="Role"
              value={interview.role}
            />

            <InfoCard
              icon={Target}
              label="Interview Round"
              value={interview.round}
            />

            <InfoCard
              icon={Clock3}
              label="Completed"
              value={formatDate(
                interview.completedAt
              )}
            />
          </div>

          {/* Questions */}
          <div className="mt-10">
            <div className="mb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c2410c]">
                Detailed review
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#1c1917] md:text-3xl">
                Question-by-question feedback
              </h2>

              <p className="mt-2 text-sm text-[#78716c]">
                Review each answer and understand where
                you performed well and where you can improve.
              </p>
            </div>

            <div className="space-y-3">
              {(interview.questions || []).map(
                (question, index) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    index={index}
                  />
                )
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#ece7dc] bg-white/50 p-5 sm:flex-row">
            <div>
              <p className="text-sm font-semibold text-[#292524]">
                Ready for another round?
              </p>

              <p className="mt-1 text-xs text-[#78716c]">
                Practice again and compare your performance.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/mock-interview")
              }
              className="rounded-xl bg-black/80 px-5 py-3 text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-black"
            >
              Start New Interview
            </button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-[#ece7dc] bg-white/50 p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50">
          <Icon
            size={16}
            className="text-blue-400"
          />
        </div>

        <p className="text-xl font-bold text-[#1c1917]">
          {value}
        </p>
      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-700">
        {label}
      </p>
    </motion.div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-[#ece7dc] bg-white/50 p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50">
          <Icon
            size={16}
            className="text-blue-400"
          />
        </div>

        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#a8a29e]">
            {label}
          </p>

          <p className="mt-1 text-sm font-semibold text-[#292524]">
            {value || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}