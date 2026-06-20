import React from "react";
import logo from '../../assets/logo.png'
import {motion} from 'motion/react'
const Hero = () => {
  return (
    <main className="min-h-fit flex justify-center">
      <div className="max-w-5xl text-center">

        <motion.h1 initial={{opacity:0 , y:30}} animate={{opacity:1 , y:0}} transition={{duration:1}}
        className="
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
        </motion.h1>

        <motion.p initial={{opacity:0 , x:-30}} animate={{opacity:1,x:0}} transition={{duration:1}} className="
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
        </motion.p>

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
                border-2 border-white
            "
            >
            <span className=" transition-transform
                            duration-300
                                group-hover:-translate-x-3
                                "
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

        <motion.div initial={{opacity:0 , y:50}} animate={{opacity:1,y:0}} transition={{duration:1}} className="flex justify-center pt-10">
           <div className="bg-gray-500 h-[150px] w-60 sm:h-[200px] sm:w-80 lg:h-70 lg:w-120 rounded-2xl">
            <video className="" src="" autoPlay loop ></video>
           </div>
        </motion.div>

      </div>
    </main>
  );
};

export default Hero;