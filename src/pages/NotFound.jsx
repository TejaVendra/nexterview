import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

import trexAnimation from "../assets/404_animation.json";

function NotFound() {
  const navigate = useNavigate();
  const animationContainer = useRef(null);

  const [seconds, setSeconds] = useState(10);

  // Lottie animation
  useEffect(() => {
    if (!animationContainer.current) return;

    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: trexAnimation,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  // Auto redirect
  useEffect(() => {
    if (seconds <= 0) {
      navigate("/", { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, navigate]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white/50 px-6 py-16 font-rubik">

      {/* Background pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(120,113,108,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full max-w-3xl"
      >

        {/* Decorative corners */}
        <span className="absolute -left-3 -top-3 h-4 w-4 border-l border-t border-stone-300" />
        <span className="absolute -right-3 -top-3 h-4 w-4 border-r border-t border-stone-300" />
        <span className="absolute -bottom-3 -left-3 h-4 w-4 border-b border-l border-stone-300" />
        <span className="absolute -bottom-3 -right-3 h-4 w-4 border-b border-r border-stone-300" />

        <div className="border border-stone-200 bg-white/80 backdrop-blur-sm">

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-stone-200 px-6 py-4 sm:px-10">

            <span className="h-1.5 w-1.5 rounded-full bg-red-800" />

            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-stone-500">
              Error · 404
            </p>

            <span className="h-px flex-1 bg-stone-200" />

            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
              Not found
            </p>

          </div>

          {/* Main */}
          <div className="grid grid-cols-1 items-center gap-8 p-6 sm:p-10 md:grid-cols-[1.1fr_1fr] md:gap-12">

            {/* Left */}
            <div>

              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
                Looks like you wandered off the map
              </p>

              <h1 className="font-serif text-[34px] leading-[1.1] text-stone-900 sm:text-[42px]">
                This page went
                <br />

                <span className="italic text-stone-500">
                  extinct.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-[14px] leading-7 text-stone-600">
                The link you followed may be broken, or the page may
                have been removed. Our little T-Rex is out looking for
                it — he hasn&apos;t had much luck.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">

                <Link
                  to="/"
                  className="group inline-flex items-center gap-2 border border-stone-900 bg-stone-900 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:border-red-900 hover:bg-red-900"
                >
                  <Home
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform group-hover:-translate-y-0.5"
                  />

                  Back to home
                </Link>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="group inline-flex items-center gap-2 border border-stone-300 bg-white px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-600 transition-colors hover:border-stone-800 hover:text-stone-900"
                >
                  <ArrowLeft
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform group-hover:-translate-x-0.5"
                  />

                  Go back
                </button>

              </div>

              {/* Countdown */}
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                Auto-redirect in{" "}

                <span className="text-stone-700">
                  00:{String(seconds).padStart(2, "0")}
                </span>
              </p>

            </div>

            {/* Animation */}
            <div className="relative">

              {/* Soft glow */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full bg-stone-100/70 blur-2xl"
              />

              <div
                ref={animationContainer}
                className="relative mx-auto aspect-square w-full max-w-[360px]"
              />

              <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
                Exhibit: The elusive 404
              </p>

            </div>

          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-stone-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-10">

            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
              Status · 404 not found
            </p>

            <Link
              to="/contact"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500 underline-offset-4 hover:text-stone-900 hover:underline"
            >
              Report a broken link →
            </Link>

          </div>

        </div>
      </motion.div>
    </section>
  );
}

export default NotFound;