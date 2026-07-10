import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaHandHolding  } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { auth } from '../../database/firebase';
import { provider } from '../../database/firebase';
import { signInWithPopup , sendPasswordResetEmail } from 'firebase/auth';

export const Signin = () => {
   const [showPassword,setShowPassword] = useState(false);
   const [email,setEmail] = useState("");
   const [emailError,setEmailError] = useState("");
   const [password,setPassword] = useState("");
   const [passwordError,setPasswordError] = useState("");


   const handleEmail = (e) =>{
       setEmail(e.target.value);
       if(e.target.value.trim()){
         setEmailError("");
       }
   }
   const handlePassword = (e) =>{
       setPassword(e.target.value);
       if(e.target.value.trim()){
         setPasswordError("");
       }
   }
   
   const handleSubmit = (e) =>{
      e.preventDefault();
      let isValid = true;

      if(!email){
         setEmailError("Email is required");
         isValid = false;
      }
      if(!password){
         setPasswordError("Password is required");
         isValid = false;
      }

      if(isValid){
         console.log('====================================');
         console.log("Form submitted");
         console.log('====================================');

      }
   }

   const handleforgotpassword = async () =>{
      if(!email){
         alert("Please enter your email.");
    return;
      }
      try {
         const response = await sendPasswordResetEmail(auth,email);
         console.log(response)
         
      } catch (error) {
         console.error(error.code, error.message);

         switch (error.code) {
            case "auth/user-not-found":
            alert("No account found with this email.");
            break;

            case "auth/invalid-email":
            alert("Please enter a valid email.");
            break;

            default:
            alert(error.message);
         }
         
      }
   }

   const handlegooglesubmit = async() =>{
      try {

         const response = await signInWithPopup(auth,provider);
         if(response.user){
            nav('/')
            console.log(response.user)
         }
         
      } catch (error) {
         console.error(error)
      }
   }
   const nav = useNavigate();
  return (
    <section className='min-h-screen bg-white/50 p-5 rounded-b-[150px]  shadow-2xl'>
     <div   className="flex justify-center items-center min-h-screen font-rubik">
        <div  className="w-sm sm:w-md p-10 bg-white rounded-lg shadow-2xl flex flex-col">
               <h3 className='text-3xl font-semibold'>Sign In</h3>
               <p className='text-gray-600'>Enter your email and password to sign in.</p>


              <div className="flex flex-col gap-4 pt-5">
               <form onSubmit={handleSubmit} className="">
                    <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={handleEmail} className='border rounded-lg p-2 outline-none' type="text" name='email' />
                     {emailError && <div className="flex justify-left items-center text-red-600 text-sm">
                     <IoMdInformationCircleOutline />
                     <p className=''>{emailError}</p>
                     </div>}
                  </div>
               
                    <div className="flex flex-col pt-2">
                            <div className="flex justify-between ">
                                <label htmlFor="password">Password</label>
                                <p onClick={handleforgotpassword} className=''><span className='hover:underline'>Forgot Password?</span></p>
                            </div>
                           <div className="relative w-full">
                                    <input
                                    value={password}
                                    onChange={handlePassword}
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
                             {passwordError && <div className="flex justify-left items-center text-red-600 text-sm">
                     <IoMdInformationCircleOutline />
                     <p className=''>{passwordError}</p>
                     </div>}
                    </div>

                     <div className="flex flex-col pt-3">
                     
                          <button className='bg-blue-800 p-2 text-white font-bold text-lg rounded-lg cursor-pointer'>Sign In</button>
                    </div>
                
               </form>


                   <div className="flex items-center gap-3">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <p className="text-sm text-gray-500">or</p>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <div className="flex flex-col">
                       <button onClick={handlegooglesubmit} className='flex justify-center items-center p-2 border  text-md text-gray-600 rounded-lg cursor-pointer gap-1 hover:bg-pink-100 transition-colors duration-200'>
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
