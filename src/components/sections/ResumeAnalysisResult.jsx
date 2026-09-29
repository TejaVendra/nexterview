import React, { useEffect, useState, useRef } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  FileText,
  Lightbulb,
  Target,
  X,
  AlertTriangle,
  Compass,
  Feather,
} from "lucide-react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import PageTransition from "../layouts/PageTransition.jsx";
import axiosInstance from "../../axios/axiosInstance";
import AnalysisLoader from "../loaders/AnalysisLoader.jsx";


const INK = "#1a1816";
const PAPER = "#faf8f3";
const PAPER_2 = "#f3efe6";
const RULE = "#e5ddcd";
const CLAY = "#b6532f"; 
const OCHRE = "#c98a2b";
const MOSS = "#5b6b3a";
const MUTED = "#8a8175";


const getScoreInfo = (score) => {
  if (score >= 80)
    return { label: "Excellent", tone: MOSS, soft: "#eef0e3", note: "Polished" };
  if (score >= 60)
    return { label: "Solid", tone: OCHRE, soft: "#f7edd8", note: "Capable" };
  if (score >= 40)
    return { label: "Developing", tone: CLAY, soft: "#f6e4dc", note: "Improving" };
  return { label: "Raw", tone: "#8a2f1e", soft: "#f2ddd7", note: "Needs work" };
};

function useSpringCount(target, duration = 1400, delay = 200) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (target == null) return;
    let start;
    const t = setTimeout(() => {
      const step = (now) => {
        if (!start) start = now;
        const p = Math.min((now - start) / duration, 1);
        // smooth overshoot-free ease
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setValue(Math.round(target * eased));
        if (p < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return value;
}

function ArcGauge({ score }) {
  const safe = Math.max(0, Math.min(100, Number(score) || 0));
  const animated = useSpringCount(safe, 1600, 200);
  const info = getScoreInfo(animated);

  
  const size = 240;
  const cx = size / 2;
  const cy = size / 2 + 10;
  const r = 92;
  const startAngle = 150; 
  const endAngle = 390; 
  const sweep = endAngle - startAngle; 
  const progressAngle = startAngle + (animated / 100) * sweep;

  const polar = (angleDeg, radius) => {
    const a = (angleDeg * Math.PI) / 180;
    return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)];
  };

  const arcPath = (from, to, radius) => {
    const [x1, y1] = polar(from, radius);
    const [x2, y2] = polar(to, radius);
    const large = to - from > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
  };

  // tick marks
  const ticks = Array.from({ length: 25 }, (_, i) => i);
  const tickEls = ticks.map((i) => {
    const angle = startAngle + (i / 24) * sweep;
    const major = i % 6 === 0;
    const [x1, y1] = polar(angle, r + 12);
    const [x2, y2] = polar(angle, r + (major ? 20 : 16));
    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={angle <= progressAngle ? info.tone : RULE}
        strokeWidth={major ? 1.6 : 1}
        strokeLinecap="round"
        style={{
          transition: "stroke 600ms cubic-bezier(0.22,1,0.36,1)",
          transitionDelay: `${i * 18}ms`,
        }}
      />
    );
  });

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size - 10 }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
       
          <path
            d={arcPath(startAngle, endAngle, r)}
            fill="none"
            stroke={RULE}
            strokeWidth={4}
            strokeLinecap="round"
          />
         
          <path
            d={arcPath(startAngle, progressAngle, r)}
            fill="none"
            stroke={info.tone}
            strokeWidth={4}
            strokeLinecap="round"
            style={{
              transition: "stroke 600ms ease-out",
              filter: `drop-shadow(0 0 6px ${info.tone}33)`,
            }}
          />
          {tickEls}

        
          {(() => {
            const [dx, dy] = polar(progressAngle, r);
            return (
              <circle
                cx={dx}
                cy={dy}
                r={5}
                fill={PAPER}
                stroke={info.tone}
                strokeWidth={2.5}
              />
            );
          })()}
        </svg>

        {/* center readout */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
          style={{ paddingTop: 20 }}
        >
          <span
            className="text-[10px] font-semibold uppercase"
            style={{
              color: MUTED,
              letterSpacing: "0.32em",
            }}
          >
            ATS Score
          </span>
          <div className="mt-1 flex items-start">
            <span
              className="font-black tabular-nums leading-none"
              style={{
                color: INK,
                fontSize: 68,
                letterSpacing: "-0.06em",
                fontFamily:
                  '"Fraunces", "Playfair Display", Georgia, serif',
              }}
            >
              {animated}
            </span>
            <span
              className="mt-2 ml-1 text-xs font-bold"
              style={{ color: MUTED }}
            >
              /100
            </span>
          </div>
          <span
            className="mt-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
            style={{
              background: info.soft,
              color: info.tone,
              letterSpacing: "0.14em",
            }}
          >
            {info.label}
          </span>
        </div>
      </div>

      <p
        className="mt-4 max-w-[240px] text-center text-[13px] leading-6 italic"
        style={{ color: MUTED }}
      >
        How well your resume reads to an automated screener.
      </p>
    </div>
  );
}


function MiniScore({ title, score, tone = INK, suffix = "" }) {
  const safe =
    score == null ? null : Math.max(0, Math.min(100, Number(score)));
  const animated = useSpringCount(safe ?? 0, 1100, 200);

  return (
    <div
      className="group relative rounded-xl border p-4 transition-all duration-300"
      style={{
        borderColor: RULE,
        background: PAPER_2,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#fffdf8")}
      onMouseLeave={(e) => (e.currentTarget.style.background = PAPER_2)}
    >
      <div className="flex items-baseline justify-between">
        <span
          className="text-[11px] font-semibold uppercase"
          style={{ color: MUTED, letterSpacing: "0.14em" }}
        >
          {title}
        </span>
        <span
          className="font-black tabular-nums"
          style={{
            color: safe != null ? tone : MUTED,
            fontSize: 20,
            letterSpacing: "-0.03em",
            fontFamily: '"Fraunces", Georgia, serif',
          }}
        >
          {safe != null ? `${animated}${suffix}` : "--"}
        </span>
      </div>

      {safe != null && (
        <div className="relative mt-3 h-[3px] w-full overflow-hidden rounded-full" style={{ background: RULE }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${animated}%`,
              background: tone,
              transition: "background 400ms",
            }}
          />
          {/* notches every 25% */}
          {[25, 50, 75].map((p) => (
            <span
              key={p}
              className="absolute top-0 h-full w-[1px]"
              style={{ left: `${p}%`, background: PAPER }}
            />
          ))}
        </div>
      )}
    </div>
  );
}


function AnalysisItem({ children, type = "positive", index = 0 }) {
  const positive = type === "positive";
  const accent = positive ? MOSS : CLAY;
  const soft = positive ? "#eef0e3" : "#f6e4dc";

  return (
    <div
      className="group flex items-start gap-3 rounded-xl border p-4 transition-all duration-300"
      style={{
        borderColor: RULE,
        background: PAPER,
        animation: `fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both`,
        animationDelay: `${index * 70}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#fffdf8";
        e.currentTarget.style.transform = "translateX(2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = PAPER;
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      <div
        className="mt-[3px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={{ background: soft, color: accent }}
      >
        {positive ? (
          <Check size={13} strokeWidth={3} />
        ) : (
          <X size={13} strokeWidth={3} />
        )}
      </div>
      <p
        className="text-[13.5px] leading-[1.7]"
        style={{ color: "#4a4339" }}
      >
        {children}
      </p>
    </div>
  );
}


function SectionTitle({ icon: Icon, eyebrow, title, description }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <span
          className="h-[1px] w-6"
          style={{ background: RULE }}
        />
        <span
          className="text-[10px] font-bold uppercase"
          style={{ color: MUTED, letterSpacing: "0.24em" }}
        >
          {eyebrow}
        </span>
      </div>
      <div className="mt-3 flex items-start gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: INK, color: PAPER }}
        >
          <Icon size={16} />
        </div>
        <div>
          <h2
            className="text-[22px] leading-tight"
            style={{
              color: INK,
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              className="mt-1 text-[13px] leading-relaxed"
              style={{ color: MUTED }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


function ResumeAnalysisResult() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/resume/analysis");
      setAnalysis(res.data.analysis);
    } catch (err) {
      console.error("Fetch analysis error:", err.response?.data || err);
      if (err.response?.status === 404) setAnalysis(null);
      else
        toast.error(
          err.response?.data?.message || "Failed to load resume analysis"
        );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  if (loading) return <AnalysisLoader />;


  if (!analysis) {
    return (
      <PageTransition>
        <div
          className="flex min-h-screen items-center justify-center px-4"
          style={{ background: PAPER }}
        >
          <div
            className="w-full max-w-md rounded-2xl border p-10 text-center"
            style={{ borderColor: RULE, background: "#fffdf8" }}
          >
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: "#f7edd8" }}
            >
              <AlertTriangle size={24} style={{ color: OCHRE }} />
            </div>
            <h2
              className="mt-5 text-2xl"
              style={{
                color: INK,
                fontFamily: '"Fraunces", Georgia, serif',
                fontWeight: 700,
              }}
            >
              No analysis on file
            </h2>
            <p
              className="mt-2 text-sm leading-6"
              style={{ color: MUTED }}
            >
              You haven't analyzed a resume yet. Upload one and we'll
              give you a full breakdown.
            </p>
            <button
              onClick={() => navigate("/resume-analyzer")}
              className="mt-7 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
              style={{ background: INK, color: PAPER }}
            >
              Analyze Resume
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const atsScore = Number(analysis.atsScore) || 0;
  const overallScore =
    analysis.overallScore != null ? Number(analysis.overallScore) : null;
  const info = getScoreInfo(atsScore);

  return (
    <PageTransition>
      <section
        className="min-h-screen px-4 pb-20 pt-24 md:px-8 md:pt-32"
        style={{
          background: PAPER,
          backgroundImage: `radial-gradient(${RULE} 0.5px, transparent 0.5px)`,
          backgroundSize: "22px 22px",
        }}
      >
        <div className="mx-auto max-w-6xl">
          {/* ============ HEADER ============ */}
          <div className="mb-10">
            <button
              onClick={() => navigate("/resume-analysis")}
              className="group inline-flex cursor-pointer items-center gap-2 text-[13px] font-semibold transition-colors"
              style={{ color: MUTED }}
              onMouseEnter={(e) => (e.currentTarget.style.color = INK)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Analyze another resume
            </button>

            <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Feather size={14} style={{ color: CLAY }} />
                  <span
                    className="text-[10px] font-bold uppercase"
                    style={{ color: CLAY, letterSpacing: "0.28em" }}
                  >
                    Report · {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h1
                  className="mt-3 leading-[0.95] tracking-tight"
                  style={{
                    color: INK,
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontWeight: 700,
                    fontSize: "clamp(2.2rem, 5vw, 4rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Your resume,
                  <br />
                  <span style={{ fontStyle: "italic", color: CLAY }}>
                    annotated.
                  </span>
                </h1>
                <p
                  className="mt-4 max-w-xl text-[14px] leading-relaxed"
                  style={{ color: MUTED }}
                >
                  A close reading of your resume — ATS compatibility,
                  strengths, blind spots, and specific things to fix.
                </p>
              </div>

              <div
                className="inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase"
                style={{
                  borderColor: RULE,
                  color: MUTED,
                  background: "#fffdf8",
                  letterSpacing: "0.12em",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: MOSS }}
                />
                Analysis complete
              </div>
            </div>

            <div
              className="mt-8 h-[1px] w-full"
              style={{
                background: `linear-gradient(to right, ${INK} 60px, ${RULE} 60px)`,
              }}
            />
          </div>

          {/* ============ SCORE + OVERVIEW ============ */}
          <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
            {/* GAUGE CARD */}
            <div
              className="rounded-2xl border p-7"
              style={{
                borderColor: RULE,
                background: "#fffdf8",
                animation:
                  "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both",
              }}
            >
              <ArcGauge score={atsScore} />

              <div className="my-6 h-[1px] w-full" style={{ background: RULE }} />

              <div className="space-y-3">
                <MiniScore
                  title="Overall"
                  score={overallScore}
                  tone={INK}
                />
                <MiniScore
                  title="ATS Fit"
                  score={atsScore}
                  tone={info.tone}
                />
              </div>
            </div>

            {/* AI OVERVIEW */}
            <div
              className="rounded-2xl border p-7 md:p-8"
              style={{
                borderColor: RULE,
                background: "#fffdf8",
                animation:
                  "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both",
              }}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-[1px] w-6"
                      style={{ background: RULE }}
                    />
                    <span
                      className="text-[10px] font-bold uppercase"
                      style={{ color: MUTED, letterSpacing: "0.24em" }}
                    >
                      In Summary
                    </span>
                  </div>
                  <h2
                    className="mt-3 text-[26px] leading-tight"
                    style={{
                      color: INK,
                      fontFamily: '"Fraunces", Georgia, serif',
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    The AI's read
                  </h2>
                </div>
                <Compass
                  size={28}
                  style={{ color: RULE }}
                  className="hidden shrink-0 sm:block"
                />
              </div>

              {/* Drop cap summary */}
              <div
                className="mt-6 rounded-xl border p-5 md:p-6"
                style={{
                  borderColor: RULE,
                  background: PAPER_2,
                }}
              >
                <p
                  className="text-[14.5px] leading-[1.85]"
                  style={{ color: "#3f3a32" }}
                >
                  <span
                    style={{
                      float: "left",
                      fontFamily: '"Fraunces", Georgia, serif',
                      fontSize: 52,
                      lineHeight: "0.9",
                      fontWeight: 700,
                      color: CLAY,
                      marginRight: 10,
                      marginTop: 4,
                    }}
                  >
                    {analysis.summary?.trim()?.charAt(0) ||
                      "N"}
                  </span>
                  {analysis.summary?.trim()?.slice(1) ||
                    "o summary was provided for this resume."}
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <MiniScore
                  title="ATS Compatibility"
                  score={atsScore}
                  tone={info.tone}
                />
                <MiniScore
                  title="Overall Quality"
                  score={overallScore}
                  tone={INK}
                />
              </div>
            </div>
          </div>

          {/* ============ STRENGTHS + WEAKNESSES ============ */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div
              className="rounded-2xl border p-7"
              style={{
                borderColor: RULE,
                background: "#fffdf8",
                animation:
                  "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both",
              }}
            >
              <SectionTitle
                icon={Check}
                eyebrow="What works"
                title="Strengths"
                description="Details your resume is already getting right."
              />
              <div className="space-y-2.5">
                {Array.isArray(analysis.pros) && analysis.pros.length > 0 ? (
                  analysis.pros.map((p, i) => (
                    <AnalysisItem key={i} type="positive" index={i}>
                      {p}
                    </AnalysisItem>
                  ))
                ) : (
                  <p className="text-sm italic" style={{ color: MUTED }}>
                    Nothing notable found.
                  </p>
                )}
              </div>
            </div>

            <div
              className="rounded-2xl border p-7"
              style={{
                borderColor: RULE,
                background: "#fffdf8",
                animation:
                  "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both",
              }}
            >
              <SectionTitle
                icon={X}
                eyebrow="What's holding you back"
                title="Blind spots"
                description="Issues that weaken your resume's impact."
              />
              <div className="space-y-2.5">
                {Array.isArray(analysis.cons) && analysis.cons.length > 0 ? (
                  analysis.cons.map((c, i) => (
                    <AnalysisItem key={i} type="negative" index={i}>
                      {c}
                    </AnalysisItem>
                  ))
                ) : (
                  <p className="text-sm italic" style={{ color: MUTED }}>
                    No major issues.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ============ RECOMMENDATIONS ============ */}
          <div
            className="mt-6 rounded-2xl border p-7 md:p-8"
            style={{
              borderColor: RULE,
              background: "#fffdf8",
              animation:
                "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both",
            }}
          >
            <SectionTitle
              icon={Lightbulb}
              eyebrow="Do this next"
              title="Recommended changes"
              description="Concrete edits, in priority order."
            />
            <div className="grid gap-3 md:grid-cols-2">
              {Array.isArray(analysis.suggestions) &&
              analysis.suggestions.length > 0 ? (
                analysis.suggestions.map((s, i) => (
                  <div
                    key={i}
                    className="group flex gap-4 rounded-xl border p-5 transition-all duration-300"
                    style={{
                      borderColor: RULE,
                      background: PAPER,
                      animation: `fadeUp 0.5s ease-out both`,
                      animationDelay: `${i * 80}ms`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#fffdf8";
                      e.currentTarget.style.borderColor = INK;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = PAPER;
                      e.currentTarget.style.borderColor = RULE;
                    }}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[13px] font-black tabular-nums"
                      style={{
                        background: "#f7edd8",
                        color: OCHRE,
                        fontFamily: '"Fraunces", Georgia, serif',
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p
                      className="text-[13.5px] leading-[1.7]"
                      style={{ color: "#4a4339" }}
                    >
                      {s}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm italic" style={{ color: MUTED }}>
                  No suggestions available.
                </p>
              )}
            </div>
          </div>

          {/* ============ SKILLS ============ */}
          <div
            className="mt-6 rounded-2xl border p-7 md:p-8"
            style={{
              borderColor: RULE,
              background: "#fffdf8",
              animation:
                "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s both",
            }}
          >
            <SectionTitle
              icon={Target}
              eyebrow="Worth adding"
              title="Skills you may be missing"
              description="Terms that would resonate with both ATS and recruiters."
            />
            <div className="flex flex-wrap gap-2">
              {Array.isArray(analysis.missingSkills) &&
              analysis.missingSkills.length > 0 ? (
                analysis.missingSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="cursor-default rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      borderColor: RULE,
                      background: PAPER_2,
                      color: "#4a4339",
                      animation: `popIn 0.4s cubic-bezier(0.22,1,0.36,1) both`,
                      animationDelay: `${i * 50}ms`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = INK;
                      e.currentTarget.style.color = PAPER;
                      e.currentTarget.style.borderColor = INK;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = PAPER_2;
                      e.currentTarget.style.color = "#4a4339";
                      e.currentTarget.style.borderColor = RULE;
                    }}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm italic" style={{ color: MUTED }}>
                  No gaps identified.
                </p>
              )}
            </div>
          </div>

          {/* ============ SECTION BREAKDOWN ============ */}
          {analysis.sectionScores &&
            typeof analysis.sectionScores === "object" &&
            !Array.isArray(analysis.sectionScores) && (
              <div
                className="mt-6 rounded-2xl border p-7 md:p-8"
                style={{
                  borderColor: RULE,
                  background: "#fffdf8",
                  animation:
                    "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both",
                }}
              >
                <SectionTitle
                  icon={FileText}
                  eyebrow="By the numbers"
                  title="Section breakdown"
                  description="Individual scores for each part of your resume."
                />
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(analysis.sectionScores).map(
                    ([section, score]) => (
                      <MiniScore
                        key={section}
                        title={
                          section.charAt(0).toUpperCase() + section.slice(1)
                        }
                        score={Number(score)}
                        tone={INK}
                      />
                    )
                  )}
                </div>
              </div>
            )}

          {/* ============ FOOTER MARK ============ */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <span className="h-[1px] w-8" style={{ background: RULE }} />
            <span
              className="text-[10px] font-bold uppercase"
              style={{ color: MUTED, letterSpacing: "0.32em" }}
            >
              End of report
            </span>
            <span className="h-[1px] w-8" style={{ background: RULE }} />
          </div>
        </div>
      </section>

      {/* ============ FONTS + KEYFRAMES ============ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,900&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </PageTransition>
  );
}

export default ResumeAnalysisResult;