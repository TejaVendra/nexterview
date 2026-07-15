import React from 'react'
import { Link } from 'react-router-dom'

function GetStarted() {
  return (
    <div>
         <Link href='/signup'
                     className=' font-semibold text-white bg-blue-700 rounded-full py-2 px-3 sm:py-3 sm:px-5 mr-3 sm:mr-5 shadow-inner cursor-pointer hover:bg-blue-800 transition duration-500'>
                    Get Started
            </Link> 
    </div>
  )
}

export default GetStarted;
