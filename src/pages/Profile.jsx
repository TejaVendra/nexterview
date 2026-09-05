import React from 'react'
import PersonalInformation from '../components/sections/PersonalInformation'
import Settings from '../components/sections/Settings'
import { useState } from 'react'
import {AnimatePresence , motion} from 'framer-motion';
import { CiSettings } from "react-icons/ci";
import { FaUser } from "react-icons/fa6";
function Profile() {

  const[toggle,setToggle] = useState(false);

  
  return (
    <section className='pt-23 md:pt-30 px-4 pb-10 font-rubik min-h-screen'>
         <div className="max-w-7xl mx-auto rounded-3xl bg-white/70 backdrop-blur-md shadow-xl border border-white/20 p-6 md:p-10">
               <h2 className='font-semibold text-2xl'>Profile</h2>

               <div className="border-t p-2">
                  
               </div>
    

            
          <div className="relative flex w-full max-w-[430px] min-w-0 rounded-4xl bg-gray-100 p-1 shadow-sm">
            
            {/* Sliding background */}
            <div
              className={`
                absolute inset-y-1 left-1
                w-[calc(50%-4px)]
                rounded-4xl
                bg-white/70 backdrop-blur-sm
                shadow-sm
                transition-transform duration-300 ease-in-out
                ${toggle ? "translate-x-full" : "translate-x-0"}
              `}
            />

            {/* Personal Information */}
            <button
              onClick={() => setToggle(false)}
              className={`
                relative z-10
                flex min-w-0 flex-1
                items-center justify-center
                gap-1.5 sm:gap-2
                rounded-4xl
                px-2 sm:px-4
                py-2.5
                text-sm sm:text-base
                font-semibold
                transition-colors duration-300
                ${
                  !toggle
                    ? "text-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              <FaUser className="shrink-0" size={16} />

              <span className="truncate">
                <span className="hidden xs:inline">Personal Information</span>
                <span className="xs:hidden">Personal</span>
              </span>
            </button>

            {/* Settings */}
            <button
              onClick={() => setToggle(true)}
              className={`
                relative z-10
                flex min-w-0 flex-1
                items-center justify-center
                gap-1.5 sm:gap-2
                rounded-4xl
                px-2 sm:px-4
                py-2.5
                text-sm sm:text-base
                font-semibold
                transition-colors duration-300
                ${
                  toggle
                    ? "text-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              <CiSettings className="shrink-0" size={19} />

              <span className="truncate">
                Settings
              </span>
            </button>
          </div>


               {/* renders the compoenent based on selection */}

               <AnimatePresence mode="wait">
                   { toggle ? (
                    <motion.div
                    key="Settings" 
                     initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    >
                     <Settings/>
                    </motion.div>
                   ) : (
                    <motion.div
                    key="personal information"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <PersonalInformation/>
                    </motion.div>
                   )}
               </AnimatePresence>

               
            
         </div>

    </section>
  )
}

export default Profile