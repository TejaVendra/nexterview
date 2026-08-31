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
    

               <div className="relative flex w-[430px] bg-gray-100 p-1 rounded-xl shadow">

                        {/* Sliding background */}
                        <div
                          className={`absolute top-0 bottom-0 left-0 right-0
                            w-[calc(50%-2px)]
                            rounded-lg bg-white/40 backdrop-blur-md shadow-sm
                            transition-transform duration-300 ease-in-out
                            ${toggle ? "translate-x-[calc(100%+4px)]" : "translate-x-0"}
                          `}
                        />

                        {/* Personal Information */}
                        <button
                          onClick={() => setToggle(false)}
                          className={`relative z-10 w-1/2
                            flex items-center justify-center gap-2
                            px-5 
                            text-base font-semibold rounded-lg
                            transition-colors duration-300
                            ${!toggle ? "text-purple-600" : "text-gray-500"}
                          `}
                        >
                          <FaUser size={17} />
                          <span>Personal Information</span>
                        </button>

                        {/* Settings */}
                        <button
                          onClick={() => setToggle(true)}
                          className={`relative z-10 w-1/2
                            flex items-center justify-center gap-2
                            px-5 
                            text-base font-semibold rounded-lg
                            transition-colors duration-300
                            ${toggle ? "text-purple-600" : "text-gray-500"}
                          `}
                        >
                          <CiSettings size={19} />
                          <span>Settings</span>
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