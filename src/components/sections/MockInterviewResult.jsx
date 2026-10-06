import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
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
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Strong";
  if (score >= 50) return "Good";
  if (score >= 35) return "Needs Improvement";
  return "Needs More Practice";
}

function getScorePercentage(score) {
  if (score == null) return 0;

  return Math.min(
    100,
    Math.max(0, Number(score))
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
          {score != null
            ? Math.round(score)
            : "—"}
        </p>

        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a8a29e]">
          / 100
        </p>
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  index,
}) {
  const [open, setOpen] = useState(
    index === 0
  );

  const score = question.score ?? 0;

  return (
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
        duration: 0.3,
        delay: index * 0.04,
      }}
      className="overflow-hidden rounded-2xl border border-[#ece7dc] bg-white shadow-sm"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-[#fdfcf9]"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f5f0e6] text-xs font-bold text-[#57534e]">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#a8a29e]">
            Question {index + 1}
          </p>

          <p className="mt-1 line-clamp-2 text-sm font-semibold text-[#292524]">
            {question.question}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-lg font-bold text-[#1c1917]">
              {question.score != null
                ? Math.round(question.score)
                : "—"}
            </p>

            <p className="text-[9px] uppercase tracking-wider text-[#a8a29e]">
              Score
            </p>
          </div>

          {open ? (
            <ChevronUp
              size={17}
              className="text-[#a8a29e]"
            />
          ) : (
            <ChevronDown
              size={17}
              className="text-[#a8a29e]"
            />
          )}
        </div>
      </button>

      {open && (
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "auto",
          }}
          className="border-t border-[#ece7dc]"
        >
          <div className="space-y-5 p-5">
            {/* Question */}
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a8a29e]">
                Interview Question
              </p>

              <div className="rounded-xl bg-[#fdfcf9] p-4">
                <p className="text-sm leading-6 text-[#44403c]">
                  {question.question}
                </p>
              </div>
            </div>

            {/* Answer */}
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a8a29e]">
                Your Answer
              </p>

              <div className="rounded-xl border border-[#ece7dc] bg-white p-4">
                {question.answer ? (
                  <p className="whitespace-pre-wrap text-sm leading-6 text-[#57534e]">
                    {question.answer}
                  </p>
                ) : (
                  <p className="text-sm italic text-[#a8a29e]">
                    No answer recorded.
                  </p>
                )}
              </div>
            </div>

            {/* Feedback */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#a8a29e]">
                  AI Feedback
                </p>

                <span className="rounded-full bg-[#f5f0e6] px-2.5 py-1 text-[10px] font-bold text-[#57534e]">
                  {getScoreLabel(score)}
                </span>
              </div>

              <div className="rounded-xl border border-[#ead8cc] bg-[#fffaf7] p-4">
                <p className="text-sm leading-6 text-[#57534e]">
                  {question.feedback ||
                    "No feedback available for this question."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function MockInterviewResult() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [interview, setInterview] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

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

    const questions =
      interview.questions || [];

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
      <section className="min-h-screen bg-transparent px-4 pb-12 pt-23 font-rubik md:pt-30">
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
            className="rounded-3xl border border-white/30 bg-white/70 p-6 shadow-xl backdrop-blur-md md:p-10"
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
              value={`${Math.round(score)}/100`}
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
            className="mt-5 rounded-3xl border border-[#ece7dc] bg-white p-6 shadow-sm md:p-8"
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

            <div className="mt-6 rounded-2xl bg-[#fdfcf9] p-5">
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
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#ece7dc] bg-white p-5 sm:flex-row">
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
              className="rounded-xl bg-[#1c1917] px-5 py-3 text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#c2410c]"
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
      className="rounded-2xl border border-[#ece7dc] bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f0e6]">
          <Icon
            size={16}
            className="text-[#c2410c]"
          />
        </div>

        <p className="text-xl font-bold text-[#1c1917]">
          {value}
        </p>
      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a8a29e]">
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
    <div className="rounded-2xl border border-[#ece7dc] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f0e6]">
          <Icon
            size={16}
            className="text-[#c2410c]"
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