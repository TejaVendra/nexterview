import React from "react";

const Hero = () => {
  return (
    <main className="min-h-fit flex  justify-center px-6 py-6">
      <div className="max-w-5xl text-center">

        <h1 className="
          text-4xl
          md:text-6xl
          xl:text-7xl
          font-bold
          leading-tight
        ">
          Ace Your Next Interview with
          <span className="text-blue-700">
            {" "}AI-Powered Practice
          </span>
        </h1>

        <p className="
          mt-6
          text-base
          md:text-lg
          text-gray-600
          max-w-3xl
          mx-auto
        ">
          Practice real interview questions, receive
          instant feedback, and improve your confidence
          before the actual interview.
        </p>

        <div className="
          mt-8
          flex
          flex-col
          items-center
          justify-center
          gap-4
        ">
          <a
            href="#"
            className="
                 group
                relative
                inline-flex
                items-center
                justify-center
                px-8
                py-4
                bg-blue-700
                text-white
                rounded-full
                font-semibold
                overflow-hidden
                transition-all
                duration-300
                hover:bg-blue-800
            "
            >
            <span className=" transition-transform
                            duration-300
                                group-hover:-translate-x-3"
                        >
                            Get Started
                    </span>

            <span
                className="
                    absolute
                    right-6
                    opacity-0
                    translate-x-3
                    transition-all
                    duration-300
                    group-hover:opacity-100
                    group-hover:translate-x-0
                "
            >
                →
            </span>
            </a>

          <span className="text-gray-600 text-sm md:text-base">
            Start for free. No credit card required.
          </span>
        </div>

      </div>
    </main>
  );
};

export default Hero;