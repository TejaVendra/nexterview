import React, { useState } from 'react'
import { roles } from '../data/roles.js'


function MockInterview() {
  const [selectedRole,setSelectedRole] = useState("");
  
  return (
    <section className='pt-30 p-5 font-rubik'>
          <div className="min-h-screen">
                <div className="flex justify-between items-center">
                   <h2 className='text-2xl md:text-3xl xl:text-4xl font-semibold bg-linear-to-r from-[#A5FFB8] to-[#50F573] rounded-full p-1 md:p-3 '>Roles</h2>
                   <span className='text-red-400 text-[10px] pr-5 md:text-[15px]'>- select role to continue</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;

              return (
               <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`
                relative
                w-full
                h-14 md:h-16
                flex items-center justify-center
                rounded-full
                text-sm font-medium
                border
                transition-all duration-300
                cursor-pointer
                active:scale-95
                ${
                  isSelected
                    ? "bg-black/20 text-white border-green-300 shadow-lg shadow-green-200 scale-105"
                    : "bg-linear-to-r from-[#F3F3F3] to-[#C1E0E4] text-gray-800 border-white shadow-sm hover:scale-105 hover:shadow-lg hover:from-[#E7F7F9] hover:to-[#B7DDE3] hover:border-cyan-200"
                }
              `}
            >
              {isSelected && (
                <span className="hidden md:block absolute left-4 text-green-800">✓</span>
              )}

              <span>{role.role}</span>
            </button>
              );
            })}
          </div>

          <div className="flex justify-center md:justify-end pt-5 ">
            <button
             className='bg-blue-500 text-white font-semibold hover:bg-blue-600 animation-all duration-300 cursor-pointer p-4 rounded-full py-3 px-7'
             
             >Continue
            </button>
          </div>
            
          </div>
    </section>
  )
}

export default MockInterview