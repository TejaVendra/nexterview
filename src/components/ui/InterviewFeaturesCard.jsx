import React from 'react'

const InterviewFeaturesCard = ({feature}) => {
  return  (
    <div className={`grid grid-rows-2  p-5 text-left rounded-xl ${ feature.id === 1 ? 'bg-[#D7FFEF]' : feature.id === 2 ? 'bg-[#F3F9DD]' : feature.id === 3 ? 'bg-[#FFDDF8]' : 'bg-[#F8DECD]'} shadow-2xl`}>
        <h3 className='text-4xl font-semibold'>{feature.title}</h3>
        <p className='text-base'>{feature.description}</p>
    </div>
  )
}

export default InterviewFeaturesCard
