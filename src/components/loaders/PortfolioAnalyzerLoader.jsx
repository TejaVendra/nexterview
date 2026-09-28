import React, { useEffect, useState } from "react";
import {
  Globe2,
  ScanSearch,
  BrainCircuit,
  FileCheck2,
  Check,
  Loader2,
} from "lucide-react";

const steps = [
  {
    title: "Connecting to portfolio",
    description: "Opening and loading your website",
    icon: Globe2,
  },
  {
    title: "Scanning portfolio",
    description: "Reviewing projects, skills and experience",
    icon: ScanSearch,
  },
  {
    title: "Evaluating content",
    description: "Analyzing technical depth and presentation",
    icon: BrainCircuit,
  },
  {
    title: "Building your report",
    description: "Preparing personalized recommendations",
    icon: FileCheck2,
  },
];

function PortfolioAnalyzerLoader() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          return prev;
        }

        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const progress =
    ((activeStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 z-9999 min-h-screen overflow-y-auto bg-white px-5 py-10 sm:px-8">

      <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">

        <div className="w-full">

    

          <div className="mb-8 flex items-center justify-center gap-2">

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900">
              <ScanSearch
                size={14}
                className="text-white"
              />
            </div>

            <span className="text-sm font-medium tracking-wide text-neutral-500">
              Portfolio Analysis
            </span>

          </div>


   

          <div className="text-center">

            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Analyzing your portfolio
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-neutral-500">
              We're reviewing your projects, technical skills,
              experience and overall presentation.
            </p>

          </div>



          <div className="mx-auto mt-10 max-w-xl">

            <div className="mb-3 flex items-center justify-between">

              <span className="text-xs font-medium text-neutral-500">
                Analysis progress
              </span>

              <span className="text-xs font-semibold text-neutral-900">
                {Math.round(progress)}%
              </span>

            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">

              <div
                className="h-full rounded-full bg-neutral-900 transition-all duration-1000 ease-out"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>



          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-6">

            <div className="space-y-2">

              {steps.map((step, index) => {

                const Icon = step.icon;

                const completed =
                  index < activeStep;

                const active =
                  index === activeStep;

                return (
                  <div
                    key={step.title}
                    className={`
                      relative flex items-center gap-4
                      rounded-xl p-3.5
                      transition-all duration-500
                      ${
                        active
                          ? "bg-neutral-50"
                          : "bg-transparent"
                      }
                    `}
                  >

              

                    <div
                      className={`
                        relative flex h-10 w-10
                        shrink-0 items-center justify-center
                        rounded-xl border
                        transition-all duration-500
                        ${
                          completed
                            ? "border-neutral-900 bg-neutral-900"
                            : active
                            ? "border-neutral-300 bg-white"
                            : "border-neutral-200 bg-white"
                        }
                      `}
                    >

                      {completed ? (
                        <Check
                          size={17}
                          strokeWidth={2.5}
                          className="text-white"
                        />
                      ) : active ? (
                        <Icon
                          size={18}
                          className="text-neutral-900"
                        />
                      ) : (
                        <Icon
                          size={17}
                          className="text-neutral-300"
                        />
                      )}

                      {active && (
                        <span className="absolute inset-0 rounded-xl border border-neutral-400 animate-pulse" />
                      )}

                    </div>


                

                    <div className="min-w-0 flex-1">

                      <p
                        className={`
                          text-sm font-medium
                          transition-colors
                          ${
                            active || completed
                              ? "text-neutral-900"
                              : "text-neutral-400"
                          }
                        `}
                      >
                        {step.title}
                      </p>

                      <p
                        className={`
                          mt-0.5 text-xs
                          transition-colors
                          ${
                            active
                              ? "text-neutral-500"
                              : "text-neutral-400"
                          }
                        `}
                      >
                        {step.description}
                      </p>

                    </div>


           

                    <div className="shrink-0">

                      {completed ? (
                        <span className="text-[11px] font-medium text-neutral-500">
                          Done
                        </span>
                      ) : active ? (
                        <Loader2
                          size={16}
                          className="animate-spin text-neutral-700"
                        />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-200" />
                      )}

                    </div>

                  </div>
                );
              })}

            </div>

          </div>




          <div className="mt-7 text-center">

            <p className="text-xs text-neutral-400">
              This may take a few moments depending on your
              portfolio size and complexity.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PortfolioAnalyzerLoader;