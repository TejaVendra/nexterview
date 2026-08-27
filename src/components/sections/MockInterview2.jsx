import React, { useState } from "react";
import { options } from "../../data/roles.js";


function MockInterview2() {
   console.log(options)
  return (
   <div>
            {/* Roles */}
               <div className="mt-12">
                   {
                    options.map((option,index) => (
                     <div key={index} className="p-2">
                         <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-semibold">{option.title}</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {
                              option.types.map((type,index) =>(
                                 <button key={index}
                                 className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-green-600 cursor-pointer  transition-all duration-300 hover:-translate-y-1 active:scale-95"
                                 >{type}</button>
                              ))
                            }
                        </div>
                     </div>
                    ))
                   }
               </div>
       
               {/* Continue */}
               <div className="mt-10 flex justify-center">
                 <button
                  
                 >
                   Continue
                 </button>
               </div>
            </div>
  )
}

export default MockInterview2;
