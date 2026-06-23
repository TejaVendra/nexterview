import React from 'react'
import { interviewFeatures } from '../../data/interviewFeatures'
import InterviewFeaturesCard from '../ui/InterviewFeaturesCard'
import { motion } from 'motion/react'

const InterviewFeatures = () => {
  return (
    <motion.section initial={{opacity:0,y:30,scale:0.9545}} whileInView={{opacity:1,y:0,scale:1}} transition={{duration:0.6}} viewport={{amount:0.3 , once:true}} className=''>
      <div className="flex flex-col text-center justify-center items-center py-10 w-[90%] xl:w-[80%] mx-auto">
        <h3 className='text-6xl font-semibold' >Interview Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10">
                {interviewFeatures.map((feature,key) =>(
                  <InterviewFeaturesCard feature={feature} key={key}/>
                ))}
        </div>
      </div>
    </motion.section>
  )
}

export default InterviewFeatures
