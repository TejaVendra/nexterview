import React from 'react'
import Rating from '@mui/material/Rating'
export const TestimonialCard = ({testimonial}) => {
  return (
    <div className='flex flex-col w-85 shrink-0  bg-white/30 backdrop-blur-md shadow-md p-5 cursor-pointer transition-all hover:scale-110 hover:z-30 rounded-3xl duration-300'>
         <div className="flex gap-4">
             <div className={`flex h-12 w-12 rounded-full ${testimonial.avatarColor} justify-center items-center `}>{testimonial.shortName}</div>
             <div className="flex flex-col">
                  <h5>{testimonial.name}</h5>
                  <Rating name='half-rating' defaultValue={testimonial.rating} precision={0.5} readOnly/>
             </div>
         </div>
         <p className='text-base'>{testimonial.review}</p>    
    </div>
  )
}
