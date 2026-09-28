
import React, { useEffect, useState } from "react";
import {
  FileText,
  ScanSearch,
  ClipboardCheck,
  Check,
  ArrowUpRight,
} from "lucide-react";

function ResumeAnalysisLoader() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      icon: FileText,
      number: "01",
      label: "Reading your resume",
      description: "Extracting structure and content",
      duration: 1800,
    },
    {
      icon: ScanSearch,
      number: "02",
      label: "Evaluating your profile",
      description: "Reviewing skills and experience",
      duration: 2600,
    },
    {
      icon: ClipboardCheck,
      number: "03",
      label: "Building your report",
      description: "Preparing personalized feedback",
      duration: 1800,
    },
  ];

  // =========================================================
  // STEP ANIMATION
  // =========================================================

  useEffect(() => {
    let timeout;
    let currentStep = activeStep;

    const advance = () => {
      if (currentStep < steps.length - 1) {
        timeout = setTimeout(() => {
          currentStep += 1;
          setActiveStep(currentStep);
          advance();
        }, steps[currentStep].duration);
      }
    };

    advance();

    return () => clearTimeout(timeout);
  }, []);

  // =========================================================
  // PROGRESS ANIMATION
  // =========================================================

  useEffect(() => {
    const total = steps.reduce(
      (sum, step) => sum + step.duration,
      0
    );

    const elapsed = steps
      .slice(0, activeStep)
      .reduce((sum, step) => sum + step.duration, 0);

    const currentDuration =
      steps[activeStep]?.duration || 1;

    const startProgress = (elapsed / total) * 100;

    const endProgress =
      ((elapsed + currentDuration) / total) * 100;

    const start = performance.now();

    let raf;

    const tick = (now) => {
      const elapsedTime = now - start;

      const t = Math.min(
        elapsedTime / currentDuration,
        1
      );

      const eased = 1 - Math.pow(1 - t, 3);

      setProgress(
        startProgress +
          (endProgress - startProgress) * eased
      );

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [activeStep]);

  const currentStep = steps[activeStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-white text-[#18181b]">

      <div className="pointer-events-none absolute inset-0">

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#18181b 1px, transparent 1px), linear-gradient(90deg, #18181b 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full border border-[#c96d3b]/[0.07]" />

        <div className="absolute -bottom-48 -left-48 h-[520px] w-[520px] rounded-full border border-[#18181b]/[0.04]" />

      </div>
      <div className="relative w-full max-w-xl px-6">

        <div className="mb-12 flex items-center justify-between">

  

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e4e4e7] bg-[#fafafa]">

              <span className="text-sm font-bold tracking-tight text-[#18181b]">
                R
              </span>

            </div>

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717a]">
                Resume Analyzer
              </p>

              <p className="mt-0.5 text-xs text-[#a1a1aa]">
                Intelligent profile review
              </p>

            </div>

          </div>


          <div className="flex items-center gap-2">

            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c96d3b]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#71717a]">
              Processing
            </span>

          </div>

        </div>

        <div className="relative mx-auto mb-12 flex h-44 w-44 items-center justify-center">


          <div className="absolute inset-1 rounded-[28px] border border-[#e4e4e7]" />

          <div className="absolute inset-5 rounded-[22px] border border-[#f0f0f1]" />


          <div className="relative h-32 w-24 -rotate-2 rounded-sm border border-[#dedee1] bg-white shadow-[10px_14px_35px_rgba(24,24,27,0.08)]">


            <div className="flex items-center justify-between border-b border-[#eeeeef] px-3 py-3">

              <div className="h-1.5 w-9 rounded-full bg-[#27272a]" />

              <div className="h-1.5 w-1.5 rounded-full bg-[#c96d3b]" />

            </div>


            <div className="space-y-2.5 px-3 py-4">

              <div className="h-1.5 w-full rounded-full bg-[#e4e4e7]" />

              <div className="h-1.5 w-[82%] rounded-full bg-[#e4e4e7]" />

              <div className="h-1.5 w-[94%] rounded-full bg-[#e4e4e7]" />

              <div className="h-2" />

              <div className="h-1.5 w-[65%] rounded-full bg-[#d4d4d8]" />

              <div className="h-1.5 w-full rounded-full bg-[#e4e4e7]" />

              <div className="h-1.5 w-[88%] rounded-full bg-[#e4e4e7]" />

              <div className="h-2" />

              <div className="h-1.5 w-[58%] rounded-full bg-[#d4d4d8]" />

              <div className="h-1.5 w-[90%] rounded-full bg-[#e4e4e7]" />

            </div>


            <div className="absolute left-0 right-0 top-0 h-px bg-[#c96d3b] animate-scan-line" />

          </div>


          <div className="absolute -right-1 top-8 flex h-8 w-8 items-center justify-center rounded-full border border-[#e4e4e7] bg-white shadow-sm animate-float">

            <ArrowUpRight
              size={14}
              strokeWidth={1.7}
              className="text-[#c96d3b]"
            />

          </div>

          <div className="absolute -bottom-1 -left-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#e4e4e7] bg-white shadow-sm">

            <div className="h-1.5 w-1.5 rounded-full bg-[#18181b]" />

          </div>

        </div>


        <div className="text-center">

          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c96d3b]">

            Step {currentStep.number} / 03

          </p>

          <h2 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.045em] text-[#18181b] sm:text-[40px]">

            {currentStep.label}

          </h2>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#71717a]">

            {currentStep.description}

          </p>

        </div>


        <div className="mt-10">

          <div className="mb-3 flex items-end justify-between">

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a1a1aa]">
              Analysis progress
            </span>

            <span className="font-mono text-xs font-semibold text-[#52525b]">

              {Math.round(progress)
                .toString()
                .padStart(2, "0")}
              %

            </span>

          </div>

          <div className="relative h-[2px] w-full bg-[#e4e4e7]">



            <div
              className="absolute left-0 top-0 h-full bg-[#18181b] transition-[width] duration-200 ease-out"
              style={{
                width: `${progress}%`,
              }}
            />


            <div
              className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-white bg-[#c96d3b] shadow-[0_1px_5px_rgba(24,24,27,0.15)] transition-[left] duration-200"
              style={{
                left: `calc(${progress}% - 5px)`,
              }}
            />

          </div>

        </div>


        <div className="mt-10">

          <div className="grid grid-cols-3 gap-2">

            {steps.map((step, index) => {

              const isDone = index < activeStep;

              const isActive = index === activeStep;

              return (
                <div
                  key={step.number}
                  className="relative"
                >

                  {/* Connector */}

                  {index < steps.length - 1 && (
                    <div className="absolute left-[calc(100%+4px)] top-4 hidden h-px w-2 bg-[#e4e4e7] sm:block" />
                  )}

                  {/* Card */}

                  <div
                    className={`
                      min-h-[92px]
                      rounded-xl
                      border
                      p-3
                      transition-all
                      duration-500

                      ${
                        isActive
                          ? "border-[#d4d4d8] bg-[#fafafa] shadow-[0_8px_30px_rgba(24,24,27,0.06)]"
                          : isDone
                          ? "border-[#e4e4e7] bg-[#fafafa]"
                          : "border-[#eeeeef] bg-white"
                      }
                    `}
                  >


                    <div className="flex items-start justify-between">

                      <span
                        className={`
                          font-mono
                          text-[10px]
                          font-semibold

                          ${
                            isActive
                              ? "text-[#c96d3b]"
                              : isDone
                              ? "text-[#71717a]"
                              : "text-[#a1a1aa]"
                          }
                        `}
                      >
                        {step.number}
                      </span>


                      {isDone && (
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#18181b]">

                          <Check
                            size={9}
                            strokeWidth={3}
                            className="text-white"
                          />

                        </div>
                      )}


                      {isActive && (
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c96d3b]" />
                      )}

                    </div>


                    <div className="mt-5">

                      <p
                        className={`
                          text-[11px]
                          font-semibold
                          leading-4

                          ${
                            isActive
                              ? "text-[#27272a]"
                              : isDone
                              ? "text-[#71717a]"
                              : "text-[#a1a1aa]"
                          }
                        `}
                      >
                        {step.label}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>



        <div className="mt-9 flex items-center justify-center gap-3">

          <div className="h-px w-8 bg-[#e4e4e7]" />

          <p className="text-[10px] uppercase tracking-[0.18em] text-[#a1a1aa]">
            Usually takes a few seconds
          </p>

          <div className="h-px w-8 bg-[#e4e4e7]" />

        </div>

      </div>


      <style>{`

        @keyframes scan-line {

          0% {
            transform: translateY(0);
            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          90% {
            opacity: 1;
          }

          100% {
            transform: translateY(128px);
            opacity: 0;
          }

        }

        @keyframes float {

          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }

        }

        .animate-scan-line {
          animation: scan-line 2.2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 2.5s ease-in-out infinite;
        }

      `}</style>

    </div>
  );
}

export default ResumeAnalysisLoader;
