
function GlobalLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="
        fixed inset-0 z-50
        flex flex-col items-center justify-center gap-4
        bg-white backdrop-blur-sm
        text-blue-500
      "
    >
      {/* Logo Container */}
      <div className="relative w-24 h-24">
        
        {/* Logo */}
        <div
          className="
            relative
            flex items-center justify-center
            w-full h-full
            animate-[twitter-pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]
          "
        >
          <img
            src="/nexterview_logo.svg"
            alt="Nexterview"
              className="
                relative z-10
                w-full h-full
                object-contain
               
            "
          />
        </div>

        {/* Rotating Border */}
        <div
          className="
            absolute -inset-1
            rounded-full
            border-4 border-black
            opacity-1
            animate-[fade-rotate_2s_ease-in-out_infinite]
          "
          style={{
            borderTopColor: "transparent",
            borderRightColor: "transparent",
          }}
        />
      </div>

      {/* Loading Dots */}
      <div className="flex items-center gap-1">
        <span
          className="
            w-1.5 h-1.5
            rounded-full
            bg-blue-500
            opacity-40
            animate-[dot-pulse_1.4s_ease-in-out_infinite]
          "
        />

        <span
          className="
            w-1.5 h-1.5
            rounded-full
            bg-blue-500
            opacity-40
            animate-[dot-pulse_1.4s_ease-in-out_0.2s_infinite]
          "
        />

        <span
          className="
            w-1.5 h-1.5
            rounded-full
            bg-blue-600
            opacity-40
            animate-[dot-pulse_1.4s_ease-in-out_0.4s_infinite]
          "
        />
      </div>

      {/* Screen Reader Text */}
      <span className="sr-only">
        Loading, please wait...
      </span>

      {/* Custom Animations */}
      <style>{`
      

        @keyframes fade-rotate {
          0% {
            transform: rotate(0deg);
            opacity: 0;
          }

          50% {
            opacity: 0.3;
          }

          100% {
            transform: rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes dot-pulse {
          0%, 80%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }

          40% {
            transform: scale(1.3);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default GlobalLoader;