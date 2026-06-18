import React from 'react'
import Navbar from '../components/sections/Navbar'
import Hero from '../components/sections/Hero'
import CoreFeatures from '../components/sections/CoreFeatures'
import InterviewFeatures from '../components/sections/InterviewFeatures'
import Outcomes from '../components/sections/Outcomes'
import Faqs from '../components/sections/Faqs'
import Footer from '../components/sections/Footer'

function Home() {
  return (
    <div className=''>
    <Hero/>
    <CoreFeatures/>
    <InterviewFeatures/>
    <Outcomes/>
    <Faqs/>
    <Footer/>
    
    </div>
   
    
  )
}

export default Home