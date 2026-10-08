import React from 'react'
import Navbar from '../components/sections/Navbar.jsx'
import Hero from '../components/sections/Hero.jsx'
import CoreFeatures from '../components/sections/CoreFeatures.jsx'
import InterviewFeatures from '../components/sections/InterviewFeatures.jsx'
import Outcomes from '../components/sections/Outcomes.jsx'
import Faqs from '../components/sections/Faqs.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'


function Home() {
  return (
    <div className='pt-30'>
    <Hero/>
    <CoreFeatures/>
    <InterviewFeatures/>
    <Outcomes/>
    <Testimonials/>
    <Faqs/>
   
    
    </div>
   
    
  )
}

export default Home