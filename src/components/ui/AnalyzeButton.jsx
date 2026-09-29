
import React from "react";
import { ArrowUpRight, ScanSearch } from "lucide-react";

function AnalyzeButton({ onClick, loading = false , file=null}) {
  return (
    <button
      onClick={onClick}
      disabled={loading || !file}
      className="
        group
        relative
        flex
        h-13
        items-center
        gap-3
        overflow-hidden
        rounded-xl
        border
        border-[#d8d8d5]
        bg-white
        px-4
        pr-3
        text-left
        shadow-[0_2px_8px_rgba(0,0,0,0.04)]
        transition-all
        duration-300
        hover:border-[#bdbdb8]
        hover:shadow-[0_8px_22px_rgba(0,0,0,0.08)]

        active:translate-y-0
        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >

      {/* -----------------------------------------------
          HOVER SCAN
      ------------------------------------------------ */}

      <span
        className="
          pointer-events-none
          absolute
          inset-y-0
          -left-16
          w-12
          skew-x-[-20deg]
          bg-gradient-to-r
          from-transparent
          via-[#c96d3b]/10
          to-transparent
          opacity-0
          transition-all
          duration-700
          group-hover:left-[120%]
          group-hover:opacity-100
        "
      />

      <span
        className="
          relative
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-[#e5e5e2]
          bg-[#fafaf9]
          transition-all
          duration-300

          group-hover:border-[#c96d3b]/30
          group-hover:bg-[#c96d3b]/[0.06]
        "
      >

        {loading ? (
          <span
            className="
              h-3.5
              w-3.5
              animate-spin
              rounded-full
              border-2
              border-[#d4d4d0]
              border-t-[#c96d3b]
            "
          />
        ) : (
          <ScanSearch
            size={15}
            strokeWidth={1.8}
            className="
              text-[#555550]
              transition-colors
              duration-300
              group-hover:text-[#c96d3b]
            "
          />
        )}

      </span>


      <span className="relative flex min-w-0 flex-col">

        <span
          className="
            text-[13px]
            font-semibold
            tracking-[-0.01em]
            text-[#20201e]
          "
        >
          {loading
            ? "Analyzing"
            : "Analyze"}
        </span>

        {!loading && (
          <span
            className="
              mt-1
              hidden
              md:block
              text-[9px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-[#999994]
            "
          >
            AI-powered review
          </span>
        )}

      </span>


      {!loading && (
        <span
          className="
            relative
            ml-2
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-[#20201e]
            text-white
            transition-all
            duration-300

            group-hover:bg-[#c96d3b]
            group-hover:translate-x-0.5
          "
        >
          <ArrowUpRight
            size={14}
            strokeWidth={2}
          />
        </span>
      )}

      {/* -----------------------------------------------
          LOADING DOTS
      ------------------------------------------------ */}

      {loading && (
        <span className="ml-1 flex gap-1">

          <span
            className="
              h-1
              w-1
              animate-bounce
              rounded-full
              bg-[#c96d3b]
              [animation-delay:-0.3s]
            "
          />

          <span
            className="
              h-1
              w-1
              animate-bounce
              rounded-full
              bg-[#c96d3b]
              [animation-delay:-0.15s]
            "
          />

          <span
            className="
              h-1
              w-1
              animate-bounce
              rounded-full
              bg-[#c96d3b]
            "
          />

        </span>
      )}

    </button>
  );
}

export default AnalyzeButton;
