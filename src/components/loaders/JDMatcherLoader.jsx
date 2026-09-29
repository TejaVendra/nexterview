import React, { useEffect, useState } from "react";
import {
  Link2,
  FileSearch,
  Scale,
  PenLine,
  Check,
  Feather,
} from "lucide-react";


const INK = "#1a1816";
const PAPER = "#faf8f3";
const PAPER_2 = "#f3efe6";
const RULE = "#e5ddcd";
const CLAY = "#b6532f";
const OCHRE = "#c98a2b";
const MOSS = "#5b6b3a";
const MUTED = "#8a8175";

const steps = [
  {
    tag: "01",
    title: "Pulling the file",
    description: "Loading job description and resume text",
    icon: FileSearch,
    stamp: "Retrieved",
  },
  {
    tag: "02",
    title: "Reading the requirements",
    description: "Deconstructing the JD into concrete asks",
    icon: Link2,
    stamp: "Parsed",
  },
  {
    tag: "03",
    title: "Weighing evidence",
    description: "Matching resume claims against each requirement",
    icon: Scale,
    stamp: "Weighed",
  },
  {
    tag: "04",
    title: "Drafting the report",
    description: "Scoring fit and writing recommendations",
    icon: PenLine,
    stamp: "Filed",
  },
];

function JDMatcherLoader() {
  const [activeStep, setActiveStep] = useState(0);
  const [stamped, setStamped] = useState([]);
  const [elapsed, setElapsed] = useState(0);

  /* advance steps */
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) return prev;
        setStamped((s) => [...s, prev]);
        return prev + 1;
      });
    }, 3600);
    return () => clearInterval(stepInterval);
  }, []);

  /* live timer, feels alive */
  useEffect(() => {
    const tick = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(tick);
  }, []);

  const progress = ((activeStep + (stamped.length > activeStep ? 1 : 0)) /
    steps.length) *
    100;

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto px-5 py-10 sm:px-8"
      style={{
        background: PAPER,
        backgroundImage: `radial-gradient(${RULE} 0.5px, transparent 0.5px)`,
        backgroundSize: "22px 22px",
      }}
    >
      <div className="mx-auto flex min-h-[85vh] max-w-3xl items-center justify-center">
        <div className="w-full">
          {/* ============ MASTHEAD ============ */}
          <div className="mb-10 flex items-center justify-between border-b pb-4" style={{ borderColor: RULE }}>
            <div className="flex items-center gap-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-md"
                style={{ background: INK }}
              >
                <Feather size={14} color={PAPER} />
              </div>
              <span
                className="text-[10px] font-bold uppercase"
                style={{ color: MUTED, letterSpacing: "0.28em" }}
              >
                Match Desk
              </span>
            </div>

            <div
              className="flex items-center gap-2 text-[10px] font-bold uppercase"
              style={{ color: MUTED, letterSpacing: "0.22em" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: CLAY,
                  animation: "blink 1.4s ease-in-out infinite",
                }}
              />
              Working · {mm}:{ss}
            </div>
          </div>

          {/* ============ HEADLINE ============ */}
          <div className="text-center">
            <p
              className="text-[10px] font-bold uppercase"
              style={{ color: CLAY, letterSpacing: "0.3em" }}
            >
              In progress
            </p>
            <h1
              className="mt-3 leading-[1.02]"
              style={{
                color: INK,
                fontFamily: '"Fraunces", Georgia, serif',
                fontWeight: 700,
                fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Reading your resume
              <br />
              <span style={{ fontStyle: "italic", color: CLAY }}>
                against the job.
              </span>
            </h1>
            <p
              className="mx-auto mt-4 max-w-md text-[13px] leading-6"
              style={{ color: MUTED }}
            >
              We're parsing the JD into concrete asks, matching each
              one against your resume, and scoring the fit. No shortcuts.
            </p>
          </div>

          {/* ============ PROGRESS RULE ============ */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="mb-2 flex items-baseline justify-between">
              <span
                className="text-[10px] font-bold uppercase"
                style={{ color: MUTED, letterSpacing: "0.24em" }}
              >
                Progress
              </span>
              <span
                className="tabular-nums text-[11px] font-bold"
                style={{ color: INK }}
              >
                {activeStep + 1} / {steps.length}
              </span>
            </div>
            <div
              className="relative h-[3px] w-full overflow-hidden"
              style={{ background: RULE }}
            >
              <div
                className="absolute left-0 top-0 h-full"
                style={{
                  width: `${progress}%`,
                  background: INK,
                  transition: "width 900ms cubic-bezier(0.22,1,0.36,1)",
                }}
              />
              {/* tick marks */}
              {[25, 50, 75].map((p) => (
                <span
                  key={p}
                  className="absolute top-0 h-full w-[1px]"
                  style={{ left: `${p}%`, background: PAPER }}
                />
              ))}
            </div>
          </div>

          {/* ============ DOSSIER ============ */}
          <div
            className="mx-auto mt-8 max-w-2xl rounded-2xl border"
            style={{
              borderColor: RULE,
              background: "#fffdf8",
              boxShadow: "0 12px 32px -20px rgba(26,24,22,0.18)",
            }}
          >
            {/* dossier header strip */}
            <div
              className="flex items-center justify-between border-b px-5 py-3"
              style={{ borderColor: RULE }}
            >
              <span
                className="text-[10px] font-bold uppercase"
                style={{ color: MUTED, letterSpacing: "0.24em" }}
              >
                Case File · JD Match
              </span>
              <span
                className="text-[10px] font-bold uppercase tabular-nums"
                style={{ color: MUTED, letterSpacing: "0.18em" }}
              >
                #{String(new Date().getFullYear()).slice(2)}-
                {String(activeStep + 1).padStart(3, "0")}
              </span>
            </div>

            {/* rows */}
            <div className="divide-y" style={{ borderColor: RULE }}>
              {steps.map((step, index) => {
                const Icon = step.icon;
                const completed = index < activeStep;
                const active = index === activeStep;

                return (
                  <div
                    key={step.tag}
                    className="relative flex items-start gap-4 px-5 py-5 transition-colors duration-500"
                    style={{
                      background: active ? PAPER_2 : "transparent",
                    }}
                  >
                    {/* left rail: tag number */}
                    <div className="w-8 shrink-0 pt-0.5">
                      <span
                        className="text-[11px] font-black tabular-nums"
                        style={{
                          color: active || completed ? INK : RULE,
                          fontFamily: '"Fraunces", Georgia, serif',
                          letterSpacing: "0.02em",
                          transition: "color 500ms",
                        }}
                      >
                        {step.tag}
                      </span>
                    </div>

                    {/* icon block */}
                    <div
                      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-500"
                      style={{
                        borderColor:
                          completed || active ? INK : RULE,
                        background:
                          completed ? INK : active ? "#fffdf8" : PAPER,
                      }}
                    >
                      {completed ? (
                        <Check size={16} strokeWidth={2.6} color={PAPER} />
                      ) : (
                        <Icon
                          size={16}
                          color={active ? INK : MUTED}
                          strokeWidth={active ? 2.2 : 1.6}
                        />
                      )}

                      {/* active pulse ring */}
                      {active && (
                        <span
                          className="pointer-events-none absolute -inset-[3px] rounded-[10px] border"
                          style={{
                            borderColor: CLAY,
                            animation: "halo 2.2s ease-out infinite",
                          }}
                        />
                      )}
                    </div>

                    {/* text */}
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex items-center gap-2">
                        <p
                          className="text-[14px] font-semibold transition-colors duration-500"
                          style={{
                            color:
                              active || completed ? INK : MUTED,
                          }}
                        >
                          {step.title}
                        </p>

                        {/* status word */}
                        {completed && (
                          <span
                            className="text-[10px] font-bold uppercase"
                            style={{
                              color: MOSS,
                              letterSpacing: "0.18em",
                              animation:
                                "fadeSlide 0.4s ease-out both",
                            }}
                          >
                            · {step.stamp}
                          </span>
                        )}
                        {active && (
                          <span
                            className="text-[10px] font-bold uppercase"
                            style={{
                              color: CLAY,
                              letterSpacing: "0.18em",
                            }}
                          >
                            · In progress
                          </span>
                        )}
                      </div>

                      <p
                        className="mt-1 text-[12.5px] leading-6 transition-colors duration-500"
                        style={{
                          color: active ? "#4a4339" : MUTED,
                        }}
                      >
                        {step.description}
                      </p>

                      {/* active skeleton shimmer — hand-drawn feel */}
                      {active && (
                        <div className="mt-3 space-y-1.5">
                          <div
                            className="h-[3px] rounded-full"
                            style={{
                              width: "72%",
                              background: `linear-gradient(90deg, ${RULE} 0%, ${PAPER_2} 40%, ${RULE} 80%)`,
                              backgroundSize: "200% 100%",
                              animation: "shimmer 2.2s linear infinite",
                            }}
                          />
                          <div
                            className="h-[3px] rounded-full"
                            style={{
                              width: "48%",
                              background: `linear-gradient(90deg, ${RULE} 0%, ${PAPER_2} 40%, ${RULE} 80%)`,
                              backgroundSize: "200% 100%",
                              animation:
                                "shimmer 2.2s linear infinite 0.3s",
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* right column: timestamp-like detail */}
                    <div className="hidden shrink-0 pt-1 sm:block">
                      <span
                        className="text-[10px] font-bold uppercase tabular-nums"
                        style={{ color: MUTED, letterSpacing: "0.16em" }}
                      >
                        {completed ? "✓" : active ? "···" : "—"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* dossier footer */}
            <div
              className="flex items-center justify-between border-t px-5 py-3"
              style={{ borderColor: RULE }}
            >
              <span
                className="text-[10px] uppercase"
                style={{ color: MUTED, letterSpacing: "0.2em" }}
              >
                Confidential · AI analysis
              </span>
              <div className="flex items-center gap-1.5">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background:
                        i <= activeStep ? INK : RULE,
                      transition: "background 500ms",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ============ FOOTNOTE ============ */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <p
              className="text-center text-[11.5px] italic"
              style={{ color: MUTED }}
            >
              Depends on JD length and resume detail. Usually 10–20 seconds.
            </p>
            <div className="flex items-center gap-2">
              <span
                className="h-[1px] w-6"
                style={{ background: RULE }}
              />
              <span
                className="text-[9px] font-bold uppercase"
                style={{ color: MUTED, letterSpacing: "0.3em" }}
              >
                Please hold
              </span>
              <span
                className="h-[1px] w-6"
                style={{ background: RULE }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============ KEYFRAMES ============ */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes halo {
          0%   { opacity: 0.9; transform: scale(1); }
          100% { opacity: 0;   transform: scale(1.18); }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(-4px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

export default JDMatcherLoader;