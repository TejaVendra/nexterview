import React from 'react'
import logo from '../../assets/logo.png'
import {motion} from 'motion/react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";
const Navbar = () => {

  const { user , authLoader } = useSelector((state) => state.auth)
  return (

    <nav className='w-[95%] mx-auto fixed top-3  left-0 right-0 z-50'>
        <div className='flex justify-between items-center bg-white/20 backdrop-blur-md   max-h-20 h-15 sm:h-18 rounded-full shadow-lg border-white border-4'>
           
       <Link
        to="/"
        className="flex items-center shrink-0 transition-transform duration-300 hover:scale-105 pl-7"
      >
        <img
          className="h-7 w-auto object-contain sm:h-11 md:h-12"
          src={logo}
          alt="Logo"
        />
      </Link>
            
            <Link href='/signup'
                     className=' font-semibold text-white bg-blue-700 rounded-full py-2 px-3 sm:py-3 sm:px-5 mr-3 sm:mr-5 shadow-inner cursor-pointer hover:bg-blue-800 transition duration-500'>
                   {user ? <CgProfile/> : 'Get Started'}
            </Link> 
        </div>
    </nav>

  )
}

export default Navbar