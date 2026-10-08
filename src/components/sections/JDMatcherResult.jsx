import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  X,
  Minus,
  FileSearch,
  Scale,
  Briefcase,
  GraduationCap,
  Tag,
  Lightbulb,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  Compass,
  Feather,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../axios/axiosInstance.js";
import PageTransition from "../layouts/PageTransition.jsx";
import JDMatcherSkeleton from "../loaders/JDMatcherSkeleton.jsx";
import AnalysisNotFound from "../ui/AnalysisNotFound.jsx";



const INK = "#1a1816";
const PAPER = "#faf8f3";
const PAPER_2 = "#f3efe6";
const RULE = "#e5ddcd";
const CLAY = "#b6532f";
const OCHRE = "#c98a2b";
const MOSS = "#5b6b3a";
const MUTED = "#8a8175";



function scoreBand(score) {
  const s = Number(score) || 0;

  if (s >= 80) {
    return {
      label: "Excellent",
      tone: MOSS,
      soft: "#eef0e3",
    };
  }

  if (s >= 60) {
    return {
      label: "Solid",
      tone: OCHRE,
      soft: "#f7edd8",
    };
  }

  if (s >= 40) {
    return {
      label: "Developing",
      tone: CLAY,
      soft: "#f6e4dc",
    };
  }

  return {
    label: "Weak fit",
    tone: "#8a2f1e",
    soft: "#f2ddd7",
  };
}

function verdictBand(verdict = "") {
  const v = String(verdict).toLowerCase();

  if (v === "advance" || v.includes("strong")) {
    return {
      label: "Advance",
      tone: MOSS,
      soft: "#eef0e3",
    };
  }

  if (v === "maybe" || v.includes("consider")) {
    return {
      label: "Maybe",
      tone: OCHRE,
      soft: "#f7edd8",
    };
  }

  if (v === "reject" || v.includes("not a fit")) {
    return {
      label: "Reject",
      tone: CLAY,
      soft: "#f6e4dc",
    };
  }

  return {
    label: "Review",
    tone: INK,
    soft: PAPER_2,
  };
}

function useCountUp(target, duration = 1400, delay = 200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target == null) return;

    let raf;
    let start;

    const t = setTimeout(() => {
      const tick = (now) => {
        if (!start) start = now;

        const p = Math.min((now - start) / duration, 1);

        const eased =
          p === 1
            ? 1
            : 1 - Math.pow(2, -10 * p);

        setValue(Math.round(eased * target));

        if (p < 1) {
          raf = requestAnimationFrame(tick);
        }
      };

      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, delay]);

  return value;
}


function Rule({ w = 24 }) {
  return (
    <span
      className="h-[1px]"
      style={{
        width: w,
        background: RULE,
      }}
    />
  );
}

function Eyebrow({ children, color = MUTED }) {
  return (
    <span
      className="text-[10px] font-bold uppercase"
      style={{
        color,
        letterSpacing: "0.24em",
      }}
    >
      {children}
    </span>
  );
}

function Pill({
  children,
  tone = INK,
  soft = PAPER_2,
  border = RULE,
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase"
      style={{
        color: tone,
        background: soft,
        borderColor: border,
        letterSpacing: "0.14em",
      }}
    >
      {children}
    </span>
  );
}



function DualScore({ atsScore, matchScore }) {
  const atsAnim = useCountUp(
    Number(atsScore) || 0,
    1400,
    200
  );

  const matchAnim = useCountUp(
    Number(matchScore) || 0,
    1400,
    300
  );

  const atsBand = scoreBand(atsScore);
  const matchBand = scoreBand(matchScore);

  return (
    <div
      className="rounded-2xl border"
      style={{
        borderColor: RULE,
        background: "#fffdf8",
      }}
    >
      <div
        className="grid grid-cols-2 divide-x"
        style={{
          borderColor: RULE,
        }}
      >
        {/* ATS */}

        <div className="p-6">
          <div className="flex items-center gap-2">
            <FileSearch
              size={14}
              style={{ color: MUTED }}
            />

            <Eyebrow>ATS Pass</Eyebrow>
          </div>

          <div className="mt-4 flex items-baseline">
            <span
              className="font-black tabular-nums leading-none"
              style={{
                color: INK,
                fontFamily: '"Fraunces", Georgia, serif',
                fontSize: 56,
                letterSpacing: "-0.05em",
              }}
            >
              {atsAnim}
            </span>

            <span
              className="ml-1 text-xs font-bold"
              style={{ color: MUTED }}
            >
              /100
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: atsBand.tone,
              }}
            />

            <span
              className="text-[10px] font-bold uppercase"
              style={{
                color: atsBand.tone,
                letterSpacing: "0.14em",
              }}
            >
              {atsBand.label}
            </span>
          </div>

          <div
            className="mt-4 h-[3px] w-full overflow-hidden"
            style={{
              background: RULE,
            }}
          >
            <div
              className="h-full"
              style={{
                width: `${atsAnim}%`,
                background: atsBand.tone,
              }}
            />
          </div>
        </div>

        {/* MATCH */}

        <div className="p-6">
          <div className="flex items-center gap-2">
            <Scale
              size={14}
              style={{ color: MUTED }}
            />

            <Eyebrow>Overall Fit</Eyebrow>
          </div>

          <div className="mt-4 flex items-baseline">
            <span
              className="font-black tabular-nums leading-none"
              style={{
                color: INK,
                fontFamily: '"Fraunces", Georgia, serif',
                fontSize: 56,
                letterSpacing: "-0.05em",
              }}
            >
              {matchAnim}
            </span>

            <span
              className="ml-1 text-xs font-bold"
              style={{ color: MUTED }}
            >
              /100
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: matchBand.tone,
              }}
            />

            <span
              className="text-[10px] font-bold uppercase"
              style={{
                color: matchBand.tone,
                letterSpacing: "0.14em",
              }}
            >
              {matchBand.label}
            </span>
          </div>

          <div
            className="mt-4 h-[3px] w-full overflow-hidden"
            style={{
              background: RULE,
            }}
          >
            <div
              className="h-full"
              style={{
                width: `${matchAnim}%`,
                background: matchBand.tone,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}



function VerdictBanner({
  verdict,
  verdictExplanation,
}) {
  const band = verdictBand(verdict);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-7 md:p-8"
      style={{
        borderColor: RULE,
        background: "#fffdf8",
      }}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="flex items-center gap-2">
            <Compass
              size={14}
              style={{ color: CLAY }}
            />

            <Eyebrow color={CLAY}>
              The verdict
            </Eyebrow>
          </div>

          <h2
            className="mt-3 text-2xl leading-tight md:text-3xl"
            style={{
              color: INK,
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {verdict || "Analysis complete."}
          </h2>
        </div>

        <Pill
          tone={band.tone}
          soft={band.soft}
          border={band.tone + "33"}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: band.tone,
            }}
          />

          {band.label}
        </Pill>
      </div>

      {verdictExplanation && (
        <>
          <div
            className="my-6 h-[1px] w-full"
            style={{
              background: RULE,
            }}
          />

          <p
            className="max-w-3xl text-[14.5px] leading-[1.85]"
            style={{
              color: "#3f3a32",
            }}
          >
            <span
              style={{
                float: "left",
                fontFamily: '"Fraunces", Georgia, serif',
                fontSize: 48,
                lineHeight: "0.9",
                fontWeight: 700,
                color: CLAY,
                marginRight: 10,
                marginTop: 4,
              }}
            >
              {verdictExplanation.trim().charAt(0)}
            </span>

            {verdictExplanation.trim().slice(1)}
          </p>
        </>
      )}
    </div>
  );
}



function SummarySection({ summary }) {
  if (!summary) return null;

  return (
    <section
      className="mb-6 rounded-2xl border p-6 md:p-7"
      style={{
        borderColor: RULE,
        background: "#fffdf8",
      }}
    >
      <div className="flex items-center gap-2">
        <Rule />

        <Eyebrow>Resume summary</Eyebrow>
      </div>

      <h2
        className="mt-2 text-xl leading-tight md:text-2xl"
        style={{
          color: INK,
          fontFamily: '"Fraunces", Georgia, serif',
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        Overall assessment
      </h2>

      <p
        className="mt-4 max-w-4xl text-[14px] leading-[1.85]"
        style={{
          color: "#4a4339",
        }}
      >
        {summary}
      </p>
    </section>
  );
}


function ScoreTile({
  eyebrow,
  icon: Icon,
  score,
  analysis,
}) {
  const band = scoreBand(score);

  const animated = useCountUp(
    Number(score) || 0,
    1200,
    250
  );

  return (
    <div
      className="rounded-2xl border p-6 md:p-7"
      style={{
        borderColor: RULE,
        background: "#fffdf8",
      }}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background: INK,
              color: PAPER,
            }}
          >
            <Icon size={15} />
          </div>

          <Eyebrow>{eyebrow}</Eyebrow>
        </div>

        <div className="flex items-baseline gap-1">
          <span
            className="font-black tabular-nums leading-none"
            style={{
              color: INK,
              fontFamily: '"Fraunces", Georgia, serif',
              fontSize: 34,
              letterSpacing: "-0.04em",
            }}
          >
            {animated}
          </span>

          <span
            className="text-[10px] font-bold"
            style={{ color: MUTED }}
          >
            /100
          </span>
        </div>
      </div>

      <div
        className="mt-5 h-[3px] w-full overflow-hidden"
        style={{
          background: RULE,
        }}
      >
        <div
          className="h-full"
          style={{
            width: `${animated}%`,
            background: band.tone,
          }}
        />
      </div>

      <p
        className="mt-5 text-[13.5px] leading-[1.75]"
        style={{
          color: "#4a4339",
        }}
      >
        {analysis || "No analysis provided."}
      </p>
    </div>
  );
}



function RequirementRow({
  req,
  index,
}) {
  const importance = (
    req?.importance || "MEDIUM"
  ).toUpperCase();

  const matched = req?.matched === true;

  const importanceTone =
    importance === "HIGH"
      ? CLAY
      : importance === "MEDIUM"
      ? OCHRE
      : MUTED;

  return (
    <div
      className="group grid gap-4 border-b px-5 py-5 md:grid-cols-[120px_1fr_auto] md:items-start md:gap-5 md:px-6"
      style={{
        borderColor: RULE,
        animation:
          "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both",
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div className="flex items-center gap-2 md:block">
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase"
          style={{
            color: importanceTone,
            letterSpacing: "0.18em",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: importanceTone,
            }}
          />

          {importance}
        </span>
      </div>

      <div className="min-w-0">
        <p
          className="text-[14px] font-semibold leading-snug"
          style={{ color: INK }}
        >
          {req?.requirement || "Requirement"}
        </p>

        <p
          className="mt-2 text-[13px] leading-[1.7]"
          style={{
            color: "#4a4339",
          }}
        >
          {req?.evidence || "No evidence provided."}
        </p>
      </div>

      <div className="flex items-center md:justify-end">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase"
          style={{
            color: matched ? MOSS : CLAY,
            background: matched
              ? "#eef0e3"
              : "#f6e4dc",
            borderColor: matched
              ? "#d9dfc6"
              : "#f0d5cb",
            letterSpacing: "0.14em",
          }}
        >
          {matched ? (
            <Check size={11} strokeWidth={3} />
          ) : (
            <X size={11} strokeWidth={3} />
          )}

          {matched ? "Matched" : "Missing"}
        </span>
      </div>
    </div>
  );
}

function RequirementsSection({
  requirements,
}) {
  const items = Array.isArray(requirements)
    ? requirements
    : [];

  const stats = items.reduce(
    (acc, r) => {
      const matched = r?.matched === true;

      const imp = (
        r?.importance || "MEDIUM"
      ).toUpperCase();

      if (matched) acc.matched++;

      if (imp === "HIGH") acc.high++;

      if (imp === "HIGH" && !matched) {
        acc.highMissed++;
      }

      return acc;
    },
    {
      matched: 0,
      high: 0,
      highMissed: 0,
    }
  );

  return (
    <section
      className="overflow-hidden rounded-2xl border"
      style={{
        borderColor: RULE,
        background: "#fffdf8",
      }}
    >
      <div
        className="flex flex-col gap-4 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6"
        style={{
          borderColor: RULE,
        }}
      >
        <div>
          <div className="flex items-center gap-2">
            <Rule />

            <Eyebrow>
              Evidence by requirement
            </Eyebrow>
          </div>

          <h2
            className="mt-2 text-xl leading-tight md:text-2xl"
            style={{
              color: INK,
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            How each requirement was weighed
          </h2>

          <p
            className="mt-1 text-[13px]"
            style={{ color: MUTED }}
          >
            Every concrete ask from the JD, matched
            against your resume.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Pill tone={INK} soft={PAPER_2}>
            {stats.matched} / {items.length} matched
          </Pill>

          {stats.highMissed > 0 && (
            <Pill
              tone={CLAY}
              soft="#f6e4dc"
              border="#f0d5cb"
            >
              {stats.highMissed} HIGH missing
            </Pill>
          )}
        </div>
      </div>

      {items.length > 0 ? (
        <div>
          {items.map((req, i) => (
            <RequirementRow
              key={i}
              req={req}
              index={i}
            />
          ))}
        </div>
      ) : (
        <p
          className="p-8 text-center text-sm italic"
          style={{ color: MUTED }}
        >
          No individual requirements were extracted.
        </p>
      )}
    </section>
  );
}



function SkillsColumn({
  title,
  items,
  tone,
  icon: Icon,
}) {
  return (
    <div
      className="rounded-2xl border p-5 md:p-6"
      style={{
        borderColor: RULE,
        background: "#fffdf8",
      }}
    >
      <div className="flex items-center gap-2">
        <Icon
          size={14}
          style={{ color: tone }}
        />

        <Eyebrow color={tone}>
          {title}
        </Eyebrow>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {items?.length > 0 ? (
          items.map((s, i) => (
            <span
              key={i}
              className="rounded-full border px-2.5 py-1 text-[11.5px] font-medium"
              style={{
                borderColor: RULE,
                background: PAPER_2,
                color: "#4a4339",
                animation:
                  "popIn 0.4s cubic-bezier(0.22,1,0.36,1) both",
                animationDelay: `${i * 40}ms`,
              }}
            >
              {s}
            </span>
          ))
        ) : (
          <span
            className="text-[12px] italic"
            style={{ color: MUTED }}
          >
            None identified.
          </span>
        )}
      </div>
    </div>
  );
}



function KeywordsSection({
  keywords,
}) {
  const matched =
    keywords?.matchedKeywords ?? [];

  const missing =
    keywords?.missingKeywords ?? [];

  return (
    <section
      className="rounded-2xl border p-6 md:p-7"
      style={{
        borderColor: RULE,
        background: "#fffdf8",
      }}
    >
      <div className="flex items-center gap-2">
        <Tag
          size={14}
          style={{ color: MUTED }}
        />

        <Eyebrow>
          ATS keyword scan
        </Eyebrow>
      </div>

      <h2
        className="mt-2 text-xl leading-tight md:text-2xl"
        style={{
          color: INK,
          fontFamily: '"Fraunces", Georgia, serif',
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        What an ATS would pick up
      </h2>

      <p
        className="mt-1 text-[13px]"
        style={{ color: MUTED }}
      >
        Exact terms the job description uses that
        appear or do not appear in your resume.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {/* MATCHED */}

        <div>
          <div className="flex items-center justify-between">
            <Eyebrow color={MOSS}>
              Present in resume
            </Eyebrow>

            <span
              className="text-[11px] font-bold tabular-nums"
              style={{ color: MOSS }}
            >
              {matched.length}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {matched.length > 0 ? (
              matched.map((k, i) => (
                <span
                  key={i}
                  className="rounded-md border px-2 py-1 text-[11.5px] font-medium"
                  style={{
                    borderColor: "#d9dfc6",
                    background: "#eef0e3",
                    color: "#41501f",
                    animation:
                      "popIn 0.4s ease-out both",
                    animationDelay: `${i * 40}ms`,
                  }}
                >
                  {k}
                </span>
              ))
            ) : (
              <span
                className="text-[12px] italic"
                style={{ color: MUTED }}
              >
                None.
              </span>
            )}
          </div>
        </div>

        {/* MISSING */}

        <div>
          <div className="flex items-center justify-between">
            <Eyebrow color={CLAY}>
              Missing from resume
            </Eyebrow>

            <span
              className="text-[11px] font-bold tabular-nums"
              style={{ color: CLAY }}
            >
              {missing.length}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {missing.length > 0 ? (
              missing.map((k, i) => (
                <span
                  key={i}
                  className="rounded-md border px-2 py-1 text-[11.5px] font-medium"
                  style={{
                    borderColor: "#f0d5cb",
                    background: "#f6e4dc",
                    color: "#7c3a20",
                    animation:
                      "popIn 0.4s ease-out both",
                    animationDelay: `${i * 40}ms`,
                  }}
                >
                  {k}
                </span>
              ))
            ) : (
              <span
                className="text-[12px] italic"
                style={{ color: MOSS }}
              >
                Nothing missing — great keyword
                coverage.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}



function SideList({
  eyebrow,
  title,
  items,
  tone,
  icon: Icon,
  empty,
}) {
  const soft =
    tone === MOSS
      ? "#eef0e3"
      : "#f6e4dc";

  return (
    <div
      className="rounded-2xl border p-6 md:p-7"
      style={{
        borderColor: RULE,
        background: "#fffdf8",
      }}
    >
      <div className="flex items-center gap-2">
        <Icon
          size={14}
          style={{ color: tone }}
        />

        <Eyebrow color={tone}>
          {eyebrow}
        </Eyebrow>
      </div>

      <h2
        className="mt-2 text-xl leading-tight md:text-2xl"
        style={{
          color: INK,
          fontFamily: '"Fraunces", Georgia, serif',
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>

      <div className="mt-5 space-y-2.5">
        {items?.length > 0 ? (
          items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border p-4 transition-all duration-300"
              style={{
                borderColor: RULE,
                background: PAPER,
                animation:
                  "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both",
                animationDelay: `${i * 60}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "#fffdf8";
                e.currentTarget.style.transform =
                  "translateX(2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  PAPER;
                e.currentTarget.style.transform =
                  "translateX(0)";
              }}
            >
              <div
                className="mt-[3px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: soft,
                  color: tone,
                }}
              >
                {tone === MOSS ? (
                  <Check
                    size={12}
                    strokeWidth={3}
                  />
                ) : (
                  <X
                    size={12}
                    strokeWidth={3}
                  />
                )}
              </div>

              <p
                className="text-[13.5px] leading-[1.7]"
                style={{
                  color: "#4a4339",
                }}
              >
                {item}
              </p>
            </div>
          ))
        ) : (
          <p
            className="text-[13px] italic"
            style={{ color: MUTED }}
          >
            {empty}
          </p>
        )}
      </div>
    </div>
  );
}



function Suggestions({
  suggestions,
}) {
  const items = Array.isArray(suggestions)
    ? suggestions
    : [];

  return (
    <section
      className="overflow-hidden rounded-2xl border"
      style={{
        borderColor: RULE,
        background: "#fffdf8",
      }}
    >
      <div
        className="flex items-start gap-4 border-b px-6 py-6 md:px-7"
        style={{
          borderColor: RULE,
        }}
      >
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{
            background: INK,
            color: PAPER,
          }}
        >
          <Lightbulb size={16} />
        </div>

        <div>
          <Eyebrow>
            Do this next
          </Eyebrow>

          <h2
            className="mt-1 text-xl leading-tight md:text-2xl"
            style={{
              color: INK,
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Recommended changes for this JD
          </h2>

          <p
            className="mt-1 text-[13px]"
            style={{ color: MUTED }}
          >
            Concrete edits, ordered by impact.
          </p>
        </div>
      </div>

      <div>
        {items.length > 0 ? (
          items.map((s, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 border-b px-6 py-5 transition-colors md:px-7"
              style={{
                borderColor: RULE,
                animation:
                  "fadeUp 0.5s ease-out both",
                animationDelay: `${i * 60}ms`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  PAPER)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "transparent")
              }
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[11px] font-black tabular-nums"
                style={{
                  borderColor: RULE,
                  background: PAPER_2,
                  color: OCHRE,
                  fontFamily:
                    '"Fraunces", Georgia, serif',
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <p
                className="flex-1 pt-1 text-[13.5px] leading-[1.7]"
                style={{
                  color: "#3f3a32",
                }}
              >
                {s}
              </p>

              <ChevronRight
                size={16}
                className="mt-1 shrink-0 transition-all duration-200 group-hover:translate-x-1"
                style={{
                  color: RULE,
                }}
              />
            </div>
          ))
        ) : (
          <p
            className="p-8 text-center text-sm italic"
            style={{ color: MUTED }}
          >
            No suggestions available.
          </p>
        )}
      </div>
    </section>
  );
}



function RecommendedSkills({
  skills,
}) {
  const items = Array.isArray(skills)
    ? skills
    : [];

  return (
    <section
      className="rounded-2xl border p-6 md:p-7"
      style={{
        borderColor: RULE,
        background: "#fffdf8",
      }}
    >
      <div className="flex items-center gap-2">
        <Sparkles
          size={14}
          style={{ color: OCHRE }}
        />

        <Eyebrow color={OCHRE}>
          Worth adding
        </Eyebrow>
      </div>

      <h2
        className="mt-2 text-xl leading-tight md:text-2xl"
        style={{
          color: INK,
          fontFamily: '"Fraunces", Georgia, serif',
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        Skills that would strengthen your fit
      </h2>

      <p
        className="mt-1 text-[13px]"
        style={{ color: MUTED }}
      >
        Only skills genuinely relevant to this
        specific job description.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((skill, i) => (
            <span
              key={i}
              className="group cursor-default rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: RULE,
                background: PAPER_2,
                color: "#4a4339",
                animation:
                  "popIn 0.4s cubic-bezier(0.22,1,0.36,1) both",
                animationDelay: `${i * 50}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  OCHRE;
                e.currentTarget.style.color =
                  PAPER;
                e.currentTarget.style.borderColor =
                  OCHRE;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  PAPER_2;
                e.currentTarget.style.color =
                  "#4a4339";
                e.currentTarget.style.borderColor =
                  RULE;
              }}
            >
              {skill}
            </span>
          ))
        ) : (
          <p
            className="text-[13px] italic"
            style={{ color: MUTED }}
          >
            No additional skills recommended.
          </p>
        )}
      </div>
    </section>
  );
}






function JDMatcherResult() {
  const navigate = useNavigate();

  const [analysis, setAnalysis] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const { data } =
          await axiosInstance.get(
            "/resume-match/analyze/result"
          );

        setAnalysis(
          data?.analysis ?? null
        );
      } catch (err) {
        console.error(
          "JD match fetch error:",
          err
        );

        setAnalysis(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  if (loading) {
    return <JDMatcherSkeleton />;
  }

  if (!analysis) {
    return (
      <AnalysisNotFound/>
    );
  }


  const {
    atsScore,
    matchScore,
    summary,
    skills,
    requirements,
    experience,
    education,
    keywords,
    strengths,
    weaknesses,
    suggestions,
    recommendedSkills,
    verdict,
    verdictExplanation,
  } = analysis;

  const vBand = verdictBand(verdict);

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

        

          <div className="mb-10">
            <button
              onClick={() =>
                navigate('/resume-matches')
              }
              className="group inline-flex cursor-pointer items-center gap-2 text-[13px] font-semibold transition-colors"
              style={{
                color: MUTED,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color =
                  INK)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  MUTED)
              }
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Run another match
            </button>

            <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Feather
                    size={14}
                    style={{
                      color: CLAY,
                    }}
                  />

                  <Eyebrow color={CLAY}>
                    Match Report ·{" "}
                    {new Date().toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </Eyebrow>
                </div>

                <h1
                  className="mt-3 leading-[0.95] tracking-tight"
                  style={{
                    color: INK,
                    fontFamily:
                      '"Fraunces", Georgia, serif',
                    fontWeight: 700,
                    fontSize:
                      "clamp(2.1rem, 5vw, 3.8rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Your resume,
                  <br />

                  <span
                    style={{
                      fontStyle: "italic",
                      color: CLAY,
                    }}
                  >
                    against the job.
                  </span>
                </h1>

                <p
                  className="mt-4 max-w-xl text-[14px] leading-relaxed"
                  style={{
                    color: MUTED,
                  }}
                >
                  Every requirement from the job
                  description, weighed against the
                  evidence in your resume — scored,
                  and explained.
                </p>
              </div>

              <Pill
                tone={vBand.tone}
                soft={vBand.soft}
                border={vBand.tone + "33"}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background:
                      vBand.tone,
                  }}
                />

                {vBand.label}
              </Pill>
            </div>

            <div
              className="mt-8 h-[1px] w-full"
              style={{
                background: `linear-gradient(to right, ${INK} 60px, ${RULE} 60px)`,
              }}
            />
          </div>

    

          <section className="mb-6 grid gap-6 lg:grid-cols-[340px_1fr]">
            <div
              style={{
                animation:
                  "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both",
              }}
            >
              <DualScore
                atsScore={atsScore}
                matchScore={matchScore}
              />
            </div>

            <div
              style={{
                animation:
                  "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both",
              }}
            >
              <VerdictBanner
                verdict={verdict}
                verdictExplanation={
                  verdictExplanation
                }
              />
            </div>
          </section>

 

          <SummarySection
            summary={summary}
          />



          <section className="mb-6 grid gap-6 lg:grid-cols-2">
            <div
              style={{
                animation:
                  "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both",
              }}
            >
              <ScoreTile
                eyebrow="Experience fit"
                icon={Briefcase}
                score={experience?.score}
                analysis={experience?.analysis}
              />
            </div>

            <div
              style={{
                animation:
                  "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both",
              }}
            >
              <ScoreTile
                eyebrow="Education fit"
                icon={GraduationCap}
                score={education?.score}
                analysis={education?.analysis}
              />
            </div>
          </section>

 

          <div
            className="mb-6"
            style={{
              animation:
                "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both",
            }}
          >
            <RequirementsSection
              requirements={requirements}
            />
          </div>



          <section
            className="mb-6 grid gap-6 md:grid-cols-3"
            style={{
              animation:
                "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both",
            }}
          >
            <SkillsColumn
              title="Matching skills"
              items={
                skills?.matchingSkills
              }
              tone={MOSS}
              icon={Check}
            />

            <SkillsColumn
              title="Missing skills"
              items={
                skills?.missingSkills
              }
              tone={CLAY}
              icon={X}
            />

            <SkillsColumn
              title="Additional skills"
              items={
                skills?.additionalSkills
              }
              tone={MUTED}
              icon={Minus}
            />
          </section>

     

          <div
            className="mb-6"
            style={{
              animation:
                "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s both",
            }}
          >
            <KeywordsSection
              keywords={keywords}
            />
          </div>



          <section className="mb-6 grid gap-6 lg:grid-cols-2">
            <div
              style={{
                animation:
                  "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both",
              }}
            >
              <SideList
                eyebrow="What aligns"
                title="Strengths for this role"
                items={strengths}
                tone={MOSS}
                icon={Check}
                empty="No specific strengths identified."
              />
            </div>

            <div
              style={{
                animation:
                  "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s both",
              }}
            >
              <SideList
                eyebrow="What's missing"
                title="Weaknesses for this role"
                items={weaknesses}
                tone={CLAY}
                icon={X}
                empty="No specific weaknesses identified."
              />
            </div>
          </section>

   

          <div
            className="mb-6"
            style={{
              animation:
                "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.6s both",
            }}
          >
            <Suggestions
              suggestions={suggestions}
            />
          </div>


          <div
            style={{
              animation:
                "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.65s both",
            }}
          >
            <RecommendedSkills
              skills={recommendedSkills}
            />
          </div>



          <div className="mt-16 flex items-center justify-center gap-3">
            <Rule w={32} />

            <Eyebrow>
              End of report
            </Eyebrow>

            <Rule w={32} />
          </div>
        </div>
      </section>



      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,900&display=swap');

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </PageTransition>
  );
}

export default JDMatcherResult;