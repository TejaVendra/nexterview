import React from "react";
import { FileQuestion, ArrowLeft, RotateCcw, LifeBuoy } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AnalysisNotFound() {

  const nav = useNavigate();


  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white/50 px-6 py-16">
  
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.08), transparent 40%), radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.08), transparent 45%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
        }}
      />

      <svg
        className="pointer-events-none absolute left-[8%] top-[18%] h-10 w-10 text-amber-400/40"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M8 20 Q20 6 32 20 T8 20" />
      </svg>
      <svg
        className="pointer-events-none absolute right-[10%] top-[26%] h-8 w-8 text-sky-400/40"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M12 8 L20 32 L28 8 M15 22 L25 22" />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-[16%] left-[14%] h-9 w-9 text-rose-400/40"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="20" cy="20" r="12" />
        <path d="M20 12 L20 24 L28 20" />
      </svg>
      <div className="pointer-events-none absolute bottom-[22%] right-[12%] flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-300/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-300/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-300/60" />
      </div>

      <div className="relative w-full max-w-xl">

        <div className="relative mx-auto w-fit -rotate-[3deg] transition-transform duration-500 hover:rotate-0">
          {/* tape */}
          <div className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[4deg] rounded-sm bg-amber-200/70 shadow-sm backdrop-blur-sm" />
          <div className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-[2deg] rounded-sm bg-amber-100/60" />

          <div className="rounded-lg border border-neutral-200 bg-white px-10 py-8 shadow-[0_1px_0_#fff_inset,0_20px_40px_-20px_rgba(0,0,0,0.15)]">
  
            <svg
              viewBox="0 0 140 140"
              className="h-40 w-40"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
      
              <path
                d="M36 26 Q38 24 44 24 L88 24 Q94 24 96 30 L106 108 Q107 114 100 116 L44 118 Q38 118 36 112 Z"
                className="text-neutral-300"
                strokeWidth="2"
                fill="#fafaf7"
              />
      
              <path
                d="M88 24 L88 42 L106 42"
                className="text-neutral-300"
                strokeWidth="2"
                fill="none"
              />
         
              <path
                d="M50 52 Q64 49 82 52"
                className="text-neutral-200"
                strokeWidth="2.5"
              />
              <path
                d="M52 64 Q66 61 84 64"
                className="text-neutral-200"
                strokeWidth="2.5"
              />
              <path
                d="M54 76 Q64 74 72 76"
                className="text-neutral-200"
                strokeWidth="2.5"
              />

       
              <path
                d="M62 92 Q62 84 70 84 Q78 84 78 92 Q78 98 72 101 L72 106"
                className="text-neutral-400"
                strokeWidth="2.5"
              />
              <circle cx="72" cy="113" r="1.8" className="fill-neutral-400 text-neutral-400" />

        
              <circle
                cx="96"
                cy="96"
                r="20"
                className="text-rose-400"
                strokeWidth="2.5"
                fill="rgba(254, 205, 211, 0.25)"
              />
              <path
                d="M110 110 L124 124"
                className="text-rose-400"
                strokeWidth="3"
              />
        
              <path
                d="M88 88 Q90 84 94 84"
                className="text-white"
                strokeWidth="2.5"
              />
            </svg>
          </div>
        </div>

  
        <div className="mt-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Nothing here yet
          </span>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-neutral-800 sm:text-[2rem]">
            This analysis seems to have wandered off
          </h1>

          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-neutral-500">
            We couldn't find the report you're looking for. It may have been
            deleted, moved, or the link might be slightly off.
          </p>

        
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
            onClick={() => nav('/dashboard')}
              type="button"
              className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 hover:shadow-md active:scale-[0.98]"
            >
              <ArrowLeft
                size={15}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Go back
            </button>

            <button
            onClick={() => nav('/portfolio/result')}
              type="button"
              className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition-all hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.98]"
            >
              <RotateCcw
                size={15}
                className="text-neutral-500 transition-transform duration-500 group-hover:-rotate-180"
              />
              Run again
            </button>
          </div>

          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-1.5 text-xs text-neutral-400 underline-offset-4 transition-colors hover:text-neutral-600 hover:underline"
          >
            <LifeBuoy size={13} />
            Think this is a mistake? Let us know
          </a>
        </div>
      </div>
    </div>
  );
}

export default AnalysisNotFound;