import React from "react";
import {
  ArrowRight,
  Check,
  FileText,
  LayoutTemplate,
  PencilLine,
  Sparkles,
  Download,
  Lightbulb,
  Target,
  BriefcaseBusiness,
  GraduationCap,
  FolderKanban,
  Award,
  AlertCircle,
} from "lucide-react";

import PageTransition from "../components/layouts/PageTransition";
import { useNavigate } from "react-router-dom";

function ResumeMakerGuide() {
  const navigate = useNavigate();

  const sections = [
    {
      icon: BriefcaseBusiness,
      title: "Experience",
      description:
        "Add your work experience with clear responsibilities, achievements and measurable results.",
      tips: [
        "Start with your most recent experience",
        "Focus on achievements instead of only responsibilities",
        "Use numbers whenever possible",
      ],
    },
    {
      icon: FolderKanban,
      title: "Projects",
      description:
        "Show the projects that demonstrate your technical ability and problem-solving skills.",
      tips: [
        "Mention what you actually built",
        "Include technologies used",
        "Add GitHub or live links when available",
      ],
    },
    {
      icon: GraduationCap,
      title: "Education",
      description:
        "Keep your education information concise and easy for recruiters to scan.",
      tips: [
        "Add your degree and institution",
        "Include relevant specialization",
        "Add GPA or grade when useful",
      ],
    },
    {
      icon: Award,
      title: "Skills & Certifications",
      description:
        "Highlight skills relevant to the type of role you are targeting.",
      tips: [
        "Prioritize relevant technical skills",
        "Avoid adding skills you cannot explain",
        "Add meaningful certifications",
      ],
    },
  ];

  return (
    <PageTransition>
      <section className="min-h-screen px-4 pb-16 pt-24 font-rubik md:px-6 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white/50 shadow-sm">

            <div className="relative px-6 py-14 text-center md:px-12 md:py-20">
              <div className="pointer-events-none absolute left-10 top-10 h-24 w-24 rounded-full border border-gray-100" />
              <div className="pointer-events-none absolute bottom-10 right-10 h-32 w-32 rounded-full border border-gray-100" />

              <div className="relative">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-lg">
                  <FileText size={25} />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                  Resume Maker
                </p>

                <h1 className="mx-auto mt-3 font-nosifer max-w-3xl text-4xl font-black tracking-tight text-gray-900 md:text-6xl">
                  Build a resume that
                  <span className="relative mx-2 inline-block">
                    tells your <span className="text-red-500">story</span>.
                  </span>
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
                  Your information is already saved. Choose a template,
                  review your details, improve your content with AI, and
                  download your finished resume.
                </p>

                <button
                  onClick={() => navigate("/resume-editor")}
                  className="
                    group
                    mt-8
                    inline-flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-black
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-black/10
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-gray-800
                  "
                >
                  Start Building
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

              </div>
            </div>
          </div>


          <section className="mt-8">

            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                How it works
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
                From your data to a finished resume
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                You don't need to fill everything again. Your existing resume
                information becomes the foundation of your new resume.
              </p>
            </div>


            <div className="grid gap-4 md:grid-cols-4">

              <StepCard
                number="01"
                icon={LayoutTemplate}
                title="Choose a template"
                description="Pick the resume design that fits your style and target role."
              />

              <StepCard
                number="02"
                icon={FileText}
                title="Review your data"
                description="Your saved profile, experience, education and projects are loaded automatically."
              />

              <StepCard
                number="03"
                icon={PencilLine}
                title="Edit & improve"
                description="Change anything you want and use AI to improve your wording."
              />

              <StepCard
                number="04"
                icon={Download}
                title="Download"
                description="Preview the final resume and download it as a polished document."
              />

            </div>

          </section>



          <section className="mt-8 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                <Target size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Before you start
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  A few simple rules can make your resume much stronger.
                </p>
              </div>

            </div>


            <div className="mt-7 grid gap-3 md:grid-cols-2">

              <Rule
                title="Keep it relevant"
                description="Focus on information that supports the type of job you're targeting."
              />

              <Rule
                title="Show results"
                description="Whenever possible, explain what changed because of your work."
              />

              <Rule
                title="Keep descriptions concise"
                description="Recruiters should understand your contribution without reading large paragraphs."
              />

              <Rule
                title="Use real information"
                description="AI can improve your wording, but your achievements and experience should remain truthful."
              />

              <Rule
                title="Prioritize your strongest work"
                description="Your best projects and most relevant experience should receive the most attention."
              />

              <Rule
                title="Check before downloading"
                description="Review dates, links, spelling and contact information before exporting."
              />

            </div>

          </section>


          <section className="mt-8">

            <div className="mb-6">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                Resume content
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
                What makes each section useful?
              </h2>

            </div>


            <div className="grid gap-4 md:grid-cols-2">

              {sections.map((section, index) => (
                <ContentCard
                  key={index}
                  {...section}
                />
              ))}

            </div>

          </section>



          <section className="mt-8 overflow-hidden rounded-[2rem] border border-gray-200 bg-[#f5f3ee]">

            <div className="grid items-center gap-8 p-7 md:grid-cols-[1fr_auto] md:p-10">

              <div>

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                    <Sparkles size={18} />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                    AI Writing Assistant
                  </span>

                </div>

                <h2 className="mt-5 text-2xl font-bold text-gray-900 md:text-3xl">
                  Don't know how to phrase something?
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
                  Write your experience or project in your own words first.
                  Then use the AI button to make it clearer, more concise
                  and professional without changing the meaning.
                </p>

              </div>


              <div className="hidden md:block">

                <div className="relative w-64 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                    <PencilLine size={14} />
                    Your text
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Built a website using React and made it responsive.
                  </p>

                  <div className="my-4 h-px bg-gray-100" />

                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                    <Sparkles size={14} />
                    Improved
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-800">
                    Developed a responsive web application using React,
                    improving accessibility and user experience.
                  </p>

                </div>

              </div>

            </div>

          </section>



          <section className="mt-8 rounded-[2rem] border border-gray-100 bg-white p-8 text-center shadow-sm md:p-12">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
              <Lightbulb size={21} className="text-gray-700" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900 md:text-3xl">
              Ready to build your resume?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Your information is already there. Choose a template and
              start shaping it into your next opportunity.
            </p>

            <button
              onClick={() => navigate("/resume-editor")}
              className="
                group
                mt-7
                inline-flex
                items-center
                gap-3
                rounded-xl
                bg-black
                px-7
                py-3.5
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-gray-800
              "
            >
              Open Resume Maker

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

          </section>

        </div>
      </section>
    </PageTransition>
  );
}



function StepCard({
  number,
  icon: Icon,
  title,
  description,
}) {
  return (
    <div
      className="
        group
        relative
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-gray-200
        hover:shadow-lg
      "
    >

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-colors duration-300 group-hover:bg-black group-hover:text-white">
          <Icon size={18} />
        </div>

        <span className="text-xs font-black text-gray-300">
          {number}
        </span>

      </div>

      <h3 className="mt-6 text-base font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>

    </div>
  );
}



function Rule({ title, description }) {
  return (
    <div className="group flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all duration-200 hover:border-gray-200 hover:bg-white">

      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
        <Check size={13} className="text-gray-700" strokeWidth={3} />
      </div>

      <div>

        <h3 className="text-sm font-semibold text-gray-800">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          {description}
        </p>

      </div>

    </div>
  );
}


function ContentCard({
  icon: Icon,
  title,
  description,
  tips,
}) {
  return (
    <div className="group rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-colors duration-300 group-hover:bg-black group-hover:text-white">
          <Icon size={19} />
        </div>

        <div>

          <h3 className="font-bold text-gray-900">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            {description}
          </p>

        </div>

      </div>


      <div className="mt-5 space-y-2.5">

        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex items-start gap-2.5"
          >
            <Check
              size={15}
              className="mt-1 shrink-0 text-gray-500"
            />

            <p className="text-xs leading-5 text-gray-600">
              {tip}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default ResumeMakerGuide;