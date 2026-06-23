import React from 'react'
import { motion } from 'motion/react'
import { outcomes } from '../../data/outcomes.js'
const Outcomes = () => {
  return (
    <motion.section  initial={{opacity:0,y:30,scale:0.9545}} whileInView={{opacity:1,y:0,scale:1}} transition={{duration:0.6}} viewport={{amount:0.3 , once:true}} className='pt-10'>
         <div className="flex flex-col text-center justify-center rounded-2xl shadow-2xl lg:w-[70%] w-[90%] mx-auto p-20 bg-white/30 ">
             <h3 className='text-5xl font-semibold'>Outcomes You'll Achieve</h3>
             <div className="flex flex-col lg:flex-row text-center justify-evenly gap-10 lg:gap-0 items-center pt-15">
                 {outcomes.map((outcome) =>(
                   <div className="flex flex-col">
                     <p className='text-7xl font-bold text-[#9900FF]'>{outcome.effect}</p>
                     <p className='text-base'>{outcome.description}</p>
                 </div>
                 ))}
             </div>
         </div>
    </motion.section>
  )
}

export default Outcomes