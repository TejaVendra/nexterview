import React from 'react'
import logo from '../../assets/logo.png'
import {motion} from 'motion/react'
const Navbar = () => {
  return (

    <nav className='w-[95%] mx-auto fixed top-3  left-0 right-0 z-50'>
        <div className='flex justify-between items-center bg-white/20 backdrop-blur-md   max-h-20 h-15 sm:h-18 rounded-full shadow-lg border-white border-4'>
           
                <a href="/"><img className='h-30 w-30 sm:h-35 sm:w-35 md:h-40 md:w-40 lg:h-50 lg:w-50 ml-5 sm:ml-10' src={logo} alt="Logo"/> </a>   
            
            <a href=''
                     className=' font-semibold text-white bg-blue-700 rounded-full py-2 px-3 sm:py-3 sm:px-5 mr-3 sm:mr-5 shadow-inner cursor-pointer hover:bg-blue-800 transition duration-500'>
                   Get Started
            </a> 
        </div>
    </nav>

  )
}

export default Navbar