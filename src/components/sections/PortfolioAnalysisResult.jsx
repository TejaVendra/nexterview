import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Code2,
  BriefcaseBusiness,
  FolderKanban,
  FileText,
  Presentation,
  Target,
  Lightbulb,
  Wrench,
  ChevronRight,
  Sparkles,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

import { getPortfolioAnalysis } from "../../api/portfolioAPI.js";
import AnalysisNotFound from "../ui/AnalysisNotFound.jsx";
import PortfolioAnalysisSkeleton from "../loaders/PortfolioAnalysisSkeleton.jsx";
import { useNavigate } from "react-router-dom";


function useCountUp(target, duration = 1200, delay = 200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target == null) return;

    let raf;
    let start;

    const timeout = setTimeout(() => {
      const tick = (now) => {
        if (!start) start = now;

        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);

        const eased =
          progress === 1
            ? 1
            : 1 - Math.pow(2, -10 * progress);

        setValue(Math.round(eased * target));

        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        }
      };

      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, delay]);

  return value;
}

function scoreTone(score) {
  if (score >= 80) {
    return {
      text: "text-neutral-950",
      bar: "bg-neutral-900",
      label: "Strong",
      dot: "bg-neutral-900",
    };
  }

  if (score >= 60) {
    return {
      text: "text-neutral-700",
      bar: "bg-neutral-700",
      label: "Solid",
      dot: "bg-neutral-700",
    };
  }

  if (score >= 40) {
    return {
      text: "text-neutral-600",
      bar: "bg-neutral-500",
      label: "Developing",
      dot: "bg-neutral-500",
    };
  }

  return {
    text: "text-neutral-500",
    bar: "bg-neutral-400",
    label: "Needs work",
    dot: "bg-neutral-400",
  };
}



function PortfolioAnalysisResult() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  const nav = useNavigate();

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await getPortfolioAnalysis();
        setAnalysis(response.data.analysis);
      } catch (error) {
        console.error(
          "Failed to fetch portfolio analysis:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  if (loading) {
    return <PortfolioAnalysisSkeleton />;
  }

  if (!analysis) {
    return <AnalysisNotFound />;
  }

  const categories = [
    {
      title: "Projects",
      score: analysis.projectScore,
      icon: FolderKanban,
      description: "Quality, complexity and practical value",
    },
    {
      title: "Technical Skills",
      score: analysis.technicalScore,
      icon: Code2,
      description: "Technical depth demonstrated",
    },
    {
      title: "Impact",
      score: analysis.impactScore,
      icon: Target,
      description: "Results and real-world value",
    },
    {
      title: "Experience",
      score: analysis.experienceScore,
      icon: BriefcaseBusiness,
      description: "Professional experience and contributions",
    },
    {
      title: "Presentation",
      score: analysis.presentationScore,
      icon: Presentation,
      description: "Clarity and professionalism",
    },
    {
      title: "Documentation",
      score: analysis.documentationScore,
      icon: FileText,
      description: "Project explanations and documentation",
    },
    {
      title: "Career Relevance",
      score: analysis.careerRelevanceScore,
      icon: ArrowUpRight,
      description: "Alignment with your career direction",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]/50 px-4 pt-23 md:pt-25 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">


        <Header
          overallScore={analysis.overallScore}
        />

   

        <section className="mb-10 grid gap-5 lg:grid-cols-[320px_1fr]">

          <ScoreHero
            score={analysis.overallScore}
          />

          <SummaryCard
            summary={analysis.summary}
          />

        </section>



        <section className="mb-10">

          <SectionHeading
            eyebrow="01 — Breakdown"
            title="How your portfolio performs"
            subtitle="A category-by-category view of the evidence found in your portfolio."
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {categories.map((category, index) => (
              <ScoreCard
                key={category.title}
                {...category}
                delay={index * 80}
              />
            ))}

          </div>

        </section>


   

        <section className="mb-10 grid gap-5 lg:grid-cols-2">

          <InsightCard
            title="What's working"
            subtitle="Strengths identified in your portfolio"
            icon={CheckCircle2}
            items={analysis.strengths}
            type="positive"
          />

          <InsightCard
            title="What needs attention"
            subtitle="Areas that could hold your portfolio back"
            icon={AlertCircle}
            items={analysis.weaknesses}
            type="negative"
          />

        </section>



        <ImprovementPlan
          suggestions={analysis.suggestions}
        />



        <section className="grid gap-5 lg:grid-cols-2">

          <SkillSection
            title="Skills to strengthen"
            subtitle="Relevant skills that are not sufficiently demonstrated yet."
            icon={Wrench}
            items={analysis.missingSkills}
            tone="dark"
          />

          <SkillSection
            title="Recommended skills"
            subtitle="Skills that could make your portfolio more complete."
            icon={Code2}
            items={analysis.recommendedSkills}
            tone="light"
          />

        </section>



        <div className="mt-12 flex flex-col items-center gap-2 border-t border-neutral-200 pt-6 text-center">

          <div className="flex items-center gap-2 text-xs text-neutral-400">

            <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />

            <span>
              Analysis generated from your submitted portfolio
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}


function Header({ overallScore }) {
  const tone = scoreTone(overallScore);
  const nav = useNavigate();

  const animated = useCountUp(
    overallScore,
    1400,
    200
  );

  return (
    <header className="mb-10">

      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">

         <button
              onClick={() => nav('/portfolio')}

              className="group inline-flex items-center gap-2 text-md font-semibold text-gray-500 transition duration-200 cursor-pointer hover:text-black"
            >
              <ArrowLeft
                size={20}
                className="transition-transform group-hover:-translate-x-1"
              />

              Analyze another Portfolio 
            </button>


        <div
          className="
            flex
            items-center
            gap-2
            border
            border-neutral-200
            bg-white
            px-3
            py-2
          "
        >

          <span
            className={`h-1.5 w-1.5 rounded-full ${tone.dot}`}
          />

          <span className="text-xs font-medium text-neutral-600">
            {tone.label}
          </span>

          <span className="text-xs text-neutral-300">
            /
          </span>

          <span className="font-mono text-xs font-semibold text-neutral-900">
            {animated}
          </span>

        </div>

      </div>


      <h1
        className="
          max-w-3xl
          text-3xl
          font-semibold
          leading-tight
          tracking-[-0.035em]
          text-neutral-950
          sm:text-5xl
        "
      >
        Your portfolio,
        <br className="sm:hidden" />{" "}
        <span className="text-neutral-400">
          reviewed in detail.
        </span>
      </h1>


      <p
        className="
          mt-4
          max-w-2xl
          text-sm
          leading-7
          text-neutral-500
        "
      >
        A structured review of your projects, technical skills,
        presentation, impact and career relevance across 7
        categories.
      </p>

    </header>
  );
}



function SectionHeading({
  eyebrow,
  title,
  subtitle,
}) {
  return (
    <div className="mb-5">

      <span
        className="
          mb-2
          block
          font-mono
          text-[10px]
          font-medium
          uppercase
          tracking-[0.18em]
          text-neutral-400
        "
      >
        {eyebrow}
      </span>

      <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-1.5 max-w-2xl text-sm text-neutral-500">
          {subtitle}
        </p>
      )}

    </div>
  );
}


function ScoreHero({ score }) {
  const animated = useCountUp(score, 1400, 300);

  const radius = 53;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (animated / 100) * circumference;

  const tone = scoreTone(score);

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-neutral-200
        bg-neutral-900
        p-7
      "
    >

      <div className="relative">

        <div className="flex items-start justify-between">

          <div>

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-neutral-500
              "
            >
              Overall score
            </p>

            <div className="mt-4 flex items-end gap-2">

              <span
                className="
                  text-6xl
                  font-semibold
                  leading-none
                  tracking-tight
                  text-white
                  tabular-nums
                "
              >
                {animated}
              </span>

              <span className="mb-1.5 text-sm text-neutral-500">
                / 100
              </span>

            </div>

          </div>


          {/* DONUT */}

          <div className="relative h-24 w-24">

            <svg
              viewBox="0 0 130 130"
              className="-rotate-90"
            >

              <circle
                cx="65"
                cy="65"
                r={radius}
                fill="none"
                stroke="#262626"
                strokeWidth="7"
              />

              <circle
                cx="65"
                cy="65"
                r={radius}
                fill="none"
                stroke="#ffffff"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{
                  transition:
                    "stroke-dashoffset 0.1s linear",
                }}
              />

            </svg>

            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
              "
            >
              <span className="text-[10px] font-medium text-neutral-400">
                SCORE
              </span>
            </div>

          </div>

        </div>


        <div className="mt-8 border-t border-neutral-800 pt-5">

          <p className="text-xs leading-6 text-neutral-500">
            Overall quality based on the evidence and
            information presented throughout your portfolio.
          </p>

        </div>


        <div className="mt-5 flex items-center gap-2">

          <span
            className={`h-1.5 w-1.5 rounded-full ${
              score >= 70
                ? "bg-white"
                : "bg-neutral-500"
            }`}
          />

          <span className="text-xs font-medium text-neutral-300">
            {tone.label}
          </span>

        </div>

      </div>

    </div>
  );
}



function SummaryCard({ summary }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-neutral-200
        bg-white
        p-7
      "
    >

      <div className="flex items-start justify-between gap-5">

        <div>

          <p className="text-sm font-semibold text-neutral-900">
            Overall assessment
          </p>

          <p className="mt-1 text-xs text-neutral-400">
            What your portfolio communicates at a glance
          </p>

        </div>


        <div
          className="
            hidden
            shrink-0
            items-center
            gap-2
            border
            border-neutral-200
            px-3
            py-1.5
            sm:flex
          "
        >

          <span className="h-1.5 w-1.5 bg-neutral-900" />

          <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
            Review
          </span>

        </div>

      </div>


      <div className="my-6 h-px bg-neutral-100" />


      <p
        className="
          max-w-3xl
          text-[15px]
          leading-7
          text-neutral-700
        "
      >
        {summary}
      </p>

    </div>
  );
}



function ScoreCard({
  title,
  score,
  icon: Icon,
  description,
  delay = 0,
}) {
  const tone = scoreTone(score);

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => setMounted(true),
      delay + 100
    );

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="
        group
        rounded-xl
        border
        border-neutral-200
        bg-white
        p-5
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-neutral-300
        hover:shadow-[0_12px_30px_-18px_rgba(0,0,0,0.25)]
      "
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted
          ? "translateY(0)"
          : "translateY(6px)",
        transition:
          "opacity 400ms ease, transform 400ms ease",
      }}
    >

      <div className="flex items-start justify-between">

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-neutral-200
            bg-neutral-50
            transition-colors
            duration-300
            group-hover:bg-neutral-900
          "
        >

          <Icon
            size={16}
            className="
              text-neutral-600
              transition-colors
              duration-300
              group-hover:text-white
            "
          />

        </div>


        <div className="text-right">

          <span
            className={`
              text-xl
              font-semibold
              tabular-nums
              ${tone.text}
            `}
          >
            {score}
          </span>

          <span className="text-xs text-neutral-300">
            /100
          </span>

        </div>

      </div>


      <h3 className="mt-5 text-sm font-semibold text-neutral-900">
        {title}
      </h3>


      <p
        className="
          mt-1
          min-h-[40px]
          text-xs
          leading-5
          text-neutral-500
        "
      >
        {description}
      </p>


      <div className="mt-5 h-1 overflow-hidden bg-neutral-100">

        <div
          className={`h-full ${tone.bar}`}
          style={{
            width: mounted
              ? `${score}%`
              : "0%",

            transition:
              `width 900ms cubic-bezier(0.22, 1, 0.36, 1) ${
                delay + 150
              }ms`,
          }}
        />

      </div>

    </div>
  );
}



function InsightCard({
  title,
  subtitle,
  icon: Icon,
  items,
  type,
}) {
  const positive = type === "positive";

  return (
    <div
      className="
        rounded-2xl
        border
        border-neutral-200
        bg-white
        p-6
      "
    >

      <div className="flex items-start gap-3">

        <div
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            ${
              positive
                ? "border-neutral-200 bg-neutral-50"
                : "border-neutral-200 bg-neutral-50"
            }
          `}
        >

          <Icon
            size={16}
            className="text-neutral-700"
          />

        </div>


        <div>

          <div className="flex items-center gap-2">

            <h2 className="text-base font-semibold text-neutral-900">
              {title}
            </h2>

            <span
              className="
                border
                border-neutral-200
                px-2
                py-0.5
                text-[10px]
                font-semibold
                text-neutral-500
              "
            >
              {items?.length || 0}
            </span>

          </div>

          <p className="mt-1 text-xs text-neutral-500">
            {subtitle}
          </p>

        </div>

      </div>


      <div className="mt-6 space-y-2">

        {items?.map((item, index) => (

          <div
            key={index}
            className="
              group
              flex
              gap-3
              border
              border-transparent
              bg-neutral-50
              p-4
              transition-all
              duration-200
              hover:border-neutral-200
              hover:bg-white
            "
          >

            <div className="mt-1 shrink-0">

              {positive ? (
                <CheckCircle2
                  size={14}
                  className="text-neutral-700"
                />
              ) : (
                <AlertCircle
                  size={14}
                  className="text-neutral-500"
                />
              )}

            </div>


            <p
              className="
                flex-1
                text-sm
                leading-6
                text-neutral-700
              "
            >
              {item}
            </p>

          </div>

        ))}


        {(!items || items.length === 0) && (
          <p
            className="
              bg-neutral-50
              p-4
              text-center
              text-xs
              text-neutral-400
            "
          >
            Nothing identified here.
          </p>
        )}

      </div>

    </div>
  );
}



function ImprovementPlan({ suggestions }) {
  return (
    <section
      className="
        mb-10
        overflow-hidden
        rounded-2xl
        border
        border-neutral-200
        bg-white
      "
    >

      <div
        className="
          flex
          items-start
          gap-4
          border-b
          border-neutral-100
          px-6
          py-6
          sm:px-7
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-neutral-900
          "
        >

          <Lightbulb
            size={17}
            className="text-white"
          />

        </div>


        <div>

          <p
            className="
              mb-1
              font-mono
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-neutral-400
            "
          >
            Next steps
          </p>

          <h2 className="text-lg font-semibold text-neutral-900">
            Recommended improvements
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Practical changes that can strengthen your portfolio.
          </p>

        </div>

      </div>


      <div className="divide-y divide-neutral-100">

        {suggestions?.map(
          (suggestion, index) => (

            <div
              key={index}
              className="
                group
                flex
                items-start
                gap-4
                px-6
                py-5
                transition-colors
                duration-200
                hover:bg-neutral-50
                sm:px-7
              "
            >

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-neutral-200
                  bg-white
                  font-mono
                  text-[10px]
                  font-semibold
                  text-neutral-500
                  transition-all
                  group-hover:border-neutral-900
                  group-hover:bg-neutral-900
                  group-hover:text-white
                "
              >
                {String(index + 1).padStart(2, "0")}
              </div>


              <p
                className="
                  flex-1
                  pt-1
                  text-sm
                  leading-6
                  text-neutral-700
                "
              >
                {suggestion}
              </p>


              <ChevronRight
                size={16}
                className="
                  mt-1
                  shrink-0
                  text-neutral-300
                  transition-all
                  duration-200
                  group-hover:translate-x-1
                  group-hover:text-neutral-700
                "
              />

            </div>

          )
        )}


        {(!suggestions ||
          suggestions.length === 0) && (
          <p className="p-6 text-center text-sm text-neutral-400">
            No suggestions available.
          </p>
        )}

      </div>

    </section>
  );
}



function SkillSection({
  title,
  subtitle,
  icon: Icon,
  items,
  tone = "dark",
}) {
  const dark = tone === "dark";

  return (
    <div
      className="
        rounded-2xl
        border
        border-neutral-200
        bg-white
        p-6
      "
    >

      <div className="flex items-start gap-3">

        <div
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-neutral-200
            ${
              dark
                ? "bg-neutral-900"
                : "bg-neutral-50"
            }
          `}
        >

          <Icon
            size={16}
            className={
              dark
                ? "text-white"
                : "text-neutral-700"
            }
          />

        </div>


        <div>

          <h2 className="text-base font-semibold text-neutral-900">
            {title}
          </h2>

          <p
            className="
              mt-1
              max-w-md
              text-xs
              leading-5
              text-neutral-500
            "
          >
            {subtitle}
          </p>

        </div>

      </div>


      <div className="mt-6 flex flex-wrap gap-2">

        {items?.length > 0 ? (

          items.map((item, index) => (

            <span
              key={index}
              className="
                rounded-lg
                border
                border-neutral-200
                bg-neutral-50
                px-3
                py-1.5
                text-xs
                font-medium
                text-neutral-600
                transition-all
                duration-200
                hover:border-neutral-900
                hover:bg-neutral-900
                hover:text-white
              "
            >
              {item}
            </span>

          ))

        ) : (

          <p className="text-sm text-neutral-400">
            Nothing specific identified.
          </p>

        )}

      </div>

    </div>
  );
}

export default PortfolioAnalysisResult;