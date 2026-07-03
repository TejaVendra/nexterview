import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaEye  } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
export const Signin = () => {
   const [showPassword,setShowPassword] = useState(false);
   const nav = useNavigate();
  return (
    <section className='min-h-screen bg-white/50 p-5 rounded-b-[150px]  shadow-2xl'>
     <div className="flex justify-center items-center min-h-screen font-rubik">
        <div className="w-sm sm:w-md p-10 bg-white rounded-lg shadow-2xl flex flex-col">
               <h3 className='text-3xl font-semibold'>Sign In</h3>
               <p className='text-gray-600'>Enter your email and password to sign in.</p>


              <div className="flex flex-col gap-4 pt-5">
                 <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input className='border rounded-lg p-2 outline-none' type="text" name='email' />
                  </div>
               
                    <div className="flex flex-col">
                            <div className="flex justify-between ">
                                <label htmlFor="email">Password</label>
                                <p className=''><a className='hover:underline' href="">Forgot Password?</a></p>
                            </div>
                           <div className="relative w-full">
                                    <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="w-full border rounded-lg p-2 pr-10 outline-none"
                                    />

                                    {showPassword ? (
                                    <RiEyeCloseLine
                                       size={20}
                                       onClick={() => setShowPassword(false)}
                                       className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                    />
                                    ) : (
                                    <FaEye
                                       size={20}
                                       onClick={() => setShowPassword(true)}
                                       className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                    />
                                    )}
                           </div>
                            
                    </div>

                     <div className="flex flex-col pt-3">
                     
                          <button className='bg-blue-800 p-2 text-white font-bold text-lg rounded-lg cursor-pointer'>Sign In</button>
                    </div>
                


                   <div className="flex items-center gap-3">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <p className="text-sm text-gray-500">or</p>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <div className="flex flex-col">
                       <button className='flex justify-center items-center p-2 border  text-md text-gray-600 rounded-lg cursor-pointer gap-1 hover:bg-pink-100 transition-colors duration-200'>
                          <div className=""><FcGoogle size={23}/></div>
                          <div className="">CONTINUE WITH GOOGLE</div>
                       </button>
                    </div>

                    <div className="flex flex-col text-sm text-center">
                        <p className='text-gray-400'>Don't have an account? <span onClick={() => nav('/signup')} className='text-gray-900 font-semibold cursor-pointer'>Sign Up</span></p>
                    </div>

                    
              </div>

        </div>
     </div>
    </section>
  )
}
