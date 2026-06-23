import React from 'react'
import { TestimonialCard } from '../ui/TestimonialCard.jsx'
import { testimonials } from '../../data/testimonials.js'
import { motion } from 'motion/react'
const infiniteTestimonialsLeft = [...testimonials.slice(0, 11), ...testimonials.slice(0, 11)]
const infiniteTestimonialsRight = [...testimonials.slice(11, 21), ...testimonials.slice(11, 21)]

const maskStyle = {
  maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
}

function Testimonials() {
  return (
    <motion.section  initial={{opacity:0,y:30,scale:0.9545}} whileInView={{opacity:1,y:0,scale:1}} transition={{duration:0.6}} viewport={{amount:0.3 , once:true}}  className='pt-20 flex justify-center items-center'>
      <div className="w-full">
        <div className="text-center">
          <h3 className="text-5xl md:text-6xl font-semibold">
           <span className='text-gray-500'> Trusted by </span>Thousands of Candidates
          </h3>
          <p className="mt-4 text-base text-gray-600">
            See how job seekers improved their resumes,
            practiced interviews, and landed better opportunities.
          </p>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="overflow-hidden pt-8 p-5" style={maskStyle}>
          <div className="flex animate-scroll-left gap-3 w-max">
            {infiniteTestimonialsLeft.map((testimonial, key) => (
              <TestimonialCard key={key} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="overflow-hidden pt-8 p-5" style={maskStyle}>
          <div className="flex animate-scroll-right gap-3 w-max">
            {infiniteTestimonialsRight.map((testimonial, key) => (
              <TestimonialCard key={key} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Testimonials