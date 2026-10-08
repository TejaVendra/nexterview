import React, { useEffect, useMemo, useState } from "react";
import PageTransition from "../components/layouts/PageTransition.jsx";
import {
  BarChart3,
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  ArrowUpRight,
  Clock3,
  Target,
  TrendingUp,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import { useDashboardInteviewsResult } from "../querystack/queries/dashboardQuery.js";


import { useNavigate } from "react-router-dom";

import { GoGraph } from "react-icons/go";


import { useProfile } from "../querystack/queries/profileQuery.js";
import { useDashboardAnalysisScores } from "../querystack/queries/dashboardQuery.js";


function InterviewPerformanceChart({ interviews }) {
  const chartData = useMemo(() => {
    return [...interviews]
      .filter(
        (interview) =>
          typeof interview.score === "number" &&
          interview.status === "COMPLETED"
      )
      .sort(
        (a, b) =>
          new Date(a.updatedAt || a.createdAt) -
          new Date(b.updatedAt || b.createdAt)
      )
      .slice(-7);
  }, [interviews]);



  if (chartData.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50">
          <BarChart3 size={20} className="text-gray-300" />
        </div>

        <p className="mt-4 text-sm font-semibold text-gray-600">
          No completed interviews yet
        </p>

        <p className="mt-1 max-w-xs text-xs leading-5 text-gray-400">
          Complete a mock interview to see your performance
          history here.
        </p>
      </div>
    );
  }



  const width = 760;
  const height = 300;

  const paddingLeft = 48;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 48;

  const graphWidth = width - paddingLeft - paddingRight;

  const graphHeight = height - paddingTop - paddingBottom;



  const getX = (index) => {
    if (chartData.length === 1) {
      return paddingLeft + graphWidth / 2;
    }

    return (
      paddingLeft +
      (index / (chartData.length - 1)) *
        graphWidth
    );
  };

  const getY = (score) => {
    const safeScore = Math.max(
      0,
      Math.min(10, Number(score) || 0)
    );

    return (
      paddingTop +
      graphHeight -
      (safeScore / 10) * graphHeight
    );
  };



  const points = chartData.map((interview, index) => ({
    x: getX(index),
    y: getY(interview.score),
    score: interview.score,
    role: interview.role || "Interview",
    id: interview.id,
  }));



  const linePath = points
    .map((point, index) => {
      return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
    })
    .join(" ");


  const shortRole = (role) => {
    if (!role) return "Interview";

    if (role.length <= 12) {
      return role;
    }

    return `${role.substring(0, 12)}...`;
  };

  return (
    <div className="mt-6 w-full">
      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-50/60 p-3 sm:p-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full"
          preserveAspectRatio="none"
        >
  

          {[0, 2, 4, 6, 8, 10].map((score) => {
            const y = getY(score);

            return (
              <g key={score}>
                {/* Horizontal line */}

                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4 5"
                />

                {/* Y axis label */}

                <text
                  x={paddingLeft - 12}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#9ca3af"
                >
                  {score}
                </text>
              </g>
            );
          })}


          {points.length > 1 && (
            <path
              d={`
                ${linePath}
                L ${points[points.length - 1].x}
                  ${paddingTop + graphHeight}
                L ${points[0].x}
                  ${paddingTop + graphHeight}
                Z
              `}
              fill="url(#performanceGradient)"
              opacity="0.5"
            />
          )}


          <defs>
            <linearGradient
              id="performanceGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#f97316"
                stopOpacity="0.22"
              />

              <stop
                offset="100%"
                stopColor="#f97316"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>


          {points.length > 1 && (
            <path
              d={linePath}
              fill="none"
              stroke="#f97316"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

 

          {points.map((point) => (
            <g key={point.id}>
              {/* Outer circle */}

              <circle
                cx={point.x}
                cy={point.y}
                r="7"
                fill="white"
                stroke="#f97316"
                strokeWidth="3"
              />

              {/* Score */}

              <text
                x={point.x}
                y={point.y - 14}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="#374151"
              >
                {point.score}
              </text>
            </g>
          ))}


          {points.map((point, index) => (
            <text
              key={`label-${point.id}`}
              x={point.x}
              y={height - 18}
              textAnchor="middle"
              fontSize="10"
              fill="#9ca3af"
            >
              {shortRole(point.role)}
            </text>
          ))}
        </svg>
      </div>



      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-500" />

          <span className="text-[11px] text-gray-500">
            Interview score
          </span>
        </div>

        <span className="text-[11px] text-gray-400">
          Scale: 0–10
        </span>
      </div>
    </div>
  );
}


function Dashboard() {
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState("overview");



  const {data:user} = useProfile();

  const {data:scores,isLoading:isGettingScores} = useDashboardAnalysisScores();

 
        const {data:response , isPending:loadingInterviews , error , isError } =  useDashboardInteviewsResult();

        console.log("Dashboard interviews:", response);

        const data = response?.interviews || [];

       
        const interviews =  Array.isArray(data) ? data : []
        
 

        const interviewError = error?.response?.data?.message ||"Failed to load mock interviews.";

     



  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };



  const formatDuration = (duration) => {
    if (!duration) return "—";

    if (duration < 60) {
      return `${duration} min`;
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (minutes === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${minutes} min`;
  };


  const sortedInterviews = useMemo(() => {
    return [...interviews].sort(
      (a, b) =>
        new Date(
          b.updatedAt || b.createdAt
        ) -
        new Date(
          a.updatedAt || a.createdAt
        )
    );
  }, [interviews]);

  

  const totalInterviews = interviews.length;

  const completedInterviews =
    interviews.filter(
      (interview) =>
        interview.status === "COMPLETED"
    ).length;

  const scoredInterviews =
    interviews.filter(
      (interview) =>
        typeof interview.score === "number"
    );

  const averageScore =
    scoredInterviews.length > 0
      ? Number(
          (
            scoredInterviews.reduce(
              (total, interview) =>
                total + interview.score,
              0
            ) /
            scoredInterviews.length
          ).toFixed(1)
        )
      : 0;



  const readiness =
    averageScore > 0
      ? Math.round(
          (averageScore / 10) * 100
        )
      : 0;

 

  const recentInterviews = sortedInterviews.slice(0, 5);

 

  const handleViewResult = (id) => {
    if (!id) return;

    navigate(`/mock-interview/${id}/result`);
  };

  return (
    <PageTransition>
      <section className="min-h-screen px-4 pb-10 pt-23 font-rubik md:pt-30">
        <div className="mx-auto max-w-7xl rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur-md md:p-10">


          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Dashboard
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
                Welcome back ,{user?.name || "User"}
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Track your interview performance,
                resume quality, job readiness, and
                career progress from one place.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50">
                <GoGraph
                  size={17}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-800">
                  Career Progress
                </p>

                <p className="text-[11px] text-gray-500">
                  Keep improving consistently
                </p>
              </div>

            </div>
          </div>

     

          <div className="mb-8 flex overflow-x-auto rounded-4xl border border-gray-100 bg-gray-100 p-2">

            {[
              ["overview", "Overview"],
              ["interviews", "Mock Interviews"],
              ["analyses", "Analyses"],
            ].map(([id, label]) => {
              const active =
                activeView === id;

              return (
                <button
                  key={id}
                  onClick={() =>
                    setActiveView(id)
                  }
                  className={`relative flex-1 whitespace-nowrap rounded-xl px-5 py-3.5 text-sm font-semibold transition-colors ${
                    active
                      ? "text-purple-400 backdrop-blur-2xl"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="dashboard-tab"
                      className="absolute inset-0 rounded-4xl  bg-white/90"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

  

          <AnimatePresence mode="wait">


            {activeView === "overview" && (
              <motion.div
                key="overview"
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.35,
                }}
              >


                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  {/* MOCK INTERVIEWS */}

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
                        <BriefcaseBusiness
                          size={18}
                          className="text-[#1E291B]"
                        />
                      </div>

                      <ArrowUpRight
                        size={16}
                        className="text-gray-500"
                      />
                    </div>

                    <p className="mt-5 text-xs font-medium text-gray-500">
                      Mock Interviews
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-800">
                      {loadingInterviews
                        ? "..."
                        : totalInterviews}
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">
                      Total sessions
                    </p>
                  </motion.div>

                  {/* AVERAGE SCORE */}

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
                        <BarChart3
                          size={18}
                          className="text-[#1E291B]"
                        />
                      </div>

                      <ArrowUpRight
                        size={16}
                        className="text-gray-500"
                      />
                    </div>

                    <p className="mt-5 text-xs font-medium text-gray-500">
                      Average Score
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-800">
                      {loadingInterviews
                        ? "..."
                        : `${averageScore}/10`}
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">
                      Across scored interviews
                    </p>
                  </motion.div>

                  {/* COMPLETED */}

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
                        <Target
                          size={18}
                          className="text-[#1E291B]"
                        />
                      </div>

                      <ArrowUpRight
                        size={16}
                        className="text-gray-500"
                      />
                    </div>

                    <p className="mt-5 text-xs font-medium text-gray-500">
                      Completed
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-800">
                      {loadingInterviews
                        ? "..."
                        : completedInterviews}
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">
                      Finished interviews
                    </p>
                  </motion.div>

                  {/* READINESS */}

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
                        <TrendingUp
                          size={18}
                          className="text-[#1E291B]"
                        />
                      </div>

                      <ArrowUpRight
                        size={16}
                        className="text-gray-500"
                      />
                    </div>

                    <p className="mt-5 text-xs font-medium text-gray-500">
                      Readiness
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-800">
                      {loadingInterviews
                        ? "..."
                        : `${readiness}%`}
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">
                      Based on interview scores
                    </p>
                  </motion.div>
                </div>

           

                <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">

              

                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-start justify-between">

                      <div>
                        <h2 className="text-sm font-bold text-gray-800">
                          Interview Performance
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                          Your recent mock interview scores.
                        </p>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50">
                        <BarChart3
                          size={17}
                          className="text-gray-700"
                        />
                      </div>

                    </div>

                    <InterviewPerformanceChart
                      interviews={interviews}
                    />
                  </div>


                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                      <div>
                        <h2 className="text-sm font-bold text-gray-800">
                          Interview Readiness
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                          Based on your interview performance.
                        </p>
                      </div>

                      <TrendingUp
                        size={18}
                        className="text-blue-600"
                      />
                    </div>

                    <div className="mt-8 flex items-center justify-center">

                      <div
                        className="relative flex h-36 w-36 items-center justify-center rounded-full"
                        style={{
                          background: `conic-gradient(
                            #f97316 ${readiness * 3.6}deg,
                            #ffedd5 ${readiness * 3.6}deg
                          )`,
                        }}
                      >
                        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white">
                          <div className="text-center">

                            <p className="text-3xl font-bold text-gray-800">
                              {loadingInterviews
                                ? "..."
                                : `${readiness}%`}
                            </p>

                            <p className="text-[10px] text-gray-500">
                              Readiness
                            </p>

                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">

                      <span className="text-xs text-gray-500">
                        Interviews completed
                      </span>

                      <span className="text-xs font-semibold text-gray-700">
                        {completedInterviews}
                      </span>

                    </div>

                  </div>
                </div>


                <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                  <div className="mb-5 flex items-center justify-between">

                    <div>
                      <h2 className="text-sm font-bold text-gray-800">
                        Recent Mock Interviews
                      </h2>

                      <p className="mt-1 text-xs text-gray-500">
                        Your latest interview sessions.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setActiveView(
                          "interviews"
                        )
                      }
                      className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      View all
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  {isError && (
                    <div className="rounded-xl bg-red-50 p-4 text-xs text-red-600">
                      {interviewError}
                    </div>
                  )}

                  {!loadingInterviews &&
                    !isError &&
                    recentInterviews.length ===
                      0 && (
                      <div className="rounded-xl border border-dashed border-gray-200 py-12 text-center">

                        <BriefcaseBusiness
                          size={24}
                          className="mx-auto text-gray-300"
                        />

                        <p className="mt-3 text-sm font-semibold text-gray-600">
                          No mock interviews yet
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Complete your first AI
                          mock interview to see
                          your results here.
                        </p>
                      </div>
                    )}

                  <div className="space-y-3">

                    {recentInterviews.map(
                      (interview) => (
                        <div
                          key={interview.id}
                          className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                        >

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
                              <BriefcaseBusiness
                                size={17}
                                className="text-gray-600"
                              />
                            </div>

                            <div>

                              <p className="text-xs font-bold text-gray-800">
                                {interview.role ||
                                  "Mock Interview"}
                              </p>

                              <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-400">

                                <span>
                                  {formatDate(
                                    interview.updatedAt ||
                                      interview.createdAt
                                  )}
                                </span>

                                {interview.duration && (
                                  <>
                                    <span>
                                      •
                                    </span>

                                    <span className="flex items-center gap-1">
                                      <Clock3
                                        size={10}
                                      />

                                      {formatDuration(
                                        interview.duration
                                      )}
                                    </span>
                                  </>
                                )}

                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">

                            <div className="text-right">

                              <p className="text-lg font-bold text-gray-800">
                                {typeof interview.score ===
                                "number"
                                  ? `${interview.score}/10`
                                  : "—"}
                              </p>

                              <p className="text-[9px] text-gray-400">
                                Score
                              </p>

                            </div>

                            <button
                              onClick={() =>
                                handleViewResult(
                                  interview.id
                                )
                              }
                              className="rounded-xl bg-gray-800 px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-black"
                            >
                              View result
                            </button>

                          </div>
                        </div>
                      )
                    )}

                  </div>
                </div>

              </motion.div>
            )}

    

            {activeView === "interviews" && (
              <motion.div
                key="interviews"
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.35,
                }}
              >

                <div className="mb-6">

                  <h2 className="text-2xl font-bold text-gray-800">
                    Mock Interviews
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Review your previous AI-powered
                    interview sessions.
                  </p>

                </div>

                {loadingInterviews ? (
                  <div className="py-16 text-center text-sm text-gray-400">
                    Loading interviews...
                  </div>
                ) : interviews.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center">

                    <BriefcaseBusiness
                      size={30}
                      className="mx-auto text-gray-300"
                    />

                    <p className="mt-4 text-sm font-semibold text-gray-600">
                      No interviews found
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Your completed interviews
                      will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {sortedInterviews.map(
                      (interview) => (
                        <motion.div
                          key={interview.id}
                          whileHover={{
                            y: -4,
                          }}
                          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                        >

                          <div className="flex items-center justify-between">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
                              <BriefcaseBusiness
                                size={18}
                                className="text-[#1E291B]"
                              />
                            </div>

                            <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-600">
                              {interview.status ||
                                "Completed"}
                            </span>
                          </div>

                          <h3 className="mt-5 text-sm font-bold text-gray-800">
                            {interview.role ||
                              "Mock Interview"}
                          </h3>

                          <p className="mt-1 text-[11px] text-gray-400">
                            {formatDate(
                              interview.updatedAt ||
                                interview.createdAt
                            )}
                          </p>

                          <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-4">

                            <div>

                              <p className="text-2xl font-bold text-gray-800">
                                {typeof interview.score ===
                                "number"
                                  ? `${interview.score}/10`
                                  : "—"}
                              </p>

                              <p className="text-[10px] text-gray-400">
                                Interview score
                              </p>

                            </div>

                            <button
                              onClick={() =>
                                handleViewResult(
                                  interview.id
                                )
                              }
                              className="rounded-xl bg-gray-800 px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-black"
                            >
                              View result
                            </button>
                          </div>

                        </motion.div>
                      )
                    )}

                  </div>
                )}

              </motion.div>
            )}


            {activeView === "analyses" && (
              <motion.div
                key="analyses"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Your Analyses
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Quick overview of your career analysis results.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">

              {/* Resume */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <FileText size={18} className="text-[#1E291B]" />

                  <span className="text-2xl font-bold text-gray-800">
                    { isGettingScores ? "-" : scores?.resumeAnalysisScore || 0}
                  </span>
                </div>

                <h3 className="mt-5 text-sm font-bold text-gray-800">
                  Resume Analysis
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  ATS Score
                </p>

                <div className="mt-4 h-1.5 rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-orange-500"
                    style={{ width: scores?.resumeAnalysisScore || 0}}
                  />
                </div>

                <p className="mt-3 text-[11px] text-gray-400">
                  Good resume quality
                </p>

                <button
                  onClick={() => navigate("/resume-analysis/result")}
                  className="mt-5 flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-700 hover:translate-x-1 duration-200"
                >
                  View full result
                  <ChevronRight size={13} />
                </button>
              </div>

              {/* Job Description */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <Target size={18} className="text-[#1E291B]" />

                  <span className="text-2xl font-bold text-gray-800">
                    {isGettingScores ? "-" : scores?.jobMatchScore || 0}
                  </span>
                </div>

                <h3 className="mt-5 text-sm font-bold text-gray-800">
                  Job Match
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Profile match score
                </p>

                <div className="mt-4 h-1.5 rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-orange-500"
                    style={{ width: scores?.jobMatchScore || 0 }}
                  />
                </div>

                <p className="mt-3 text-[11px] text-gray-400">
                  Strong skill alignment
                </p>

                <button
                  onClick={() => navigate("/resume-matches/result")}
                  className="mt-5 flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-700 hover:translate-x-1 duration-200"
                >
                  View full result
                  <ChevronRight size={13} />
                </button>
              </div>

              {/* Portfolio */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <FolderKanban size={18} className="text-[#1E291B]" />

                  <span className="text-2xl font-bold text-gray-800">
                    {isGettingScores ? "-" : scores?.portfolioAnalysisScore || 0}
                  </span>
                </div>

                <h3 className="mt-5 text-sm font-bold text-gray-800">
                  Portfolio Analysis
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Portfolio score
                </p>

                <div className="mt-4 h-1.5 rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-orange-500"
                    style={{ width: scores?.portfolioAnalysisScore || 0 }}
                  />
                </div>

                <p className="mt-3 text-[11px] text-gray-400">
                  Strong project presentation
                </p>

                <button
                  onClick={() => navigate("/portfolio/result")}
                  className="mt-5 flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-700 hover:translate-x-1 duration-200"
                >
                  View full result
                  <ChevronRight size={13} />
                </button>
              </div>

            </div>
              </motion.div>
            )}

  

       

          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}

export default Dashboard;