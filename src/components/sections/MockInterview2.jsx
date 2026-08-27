
import React, { useState } from "react";
function MockInterview2() {


  const interviewTypes = [
    "Technical",
    "Behivour",
    "HR",
    "Programming",
  ];

  const experinceTypes = [
    "Fresher",
    "1-2 Years",
    "2-5 Years",
    "5+ Years",
  ];

  const durations=[
    "5 Minutes",
    "10 Minutes",
    "20 Minutes",
    "45 Minutes",

  ];

  return (
   <div>
            {/* Roles */}
               <div className="mt-12">
                 <div className="flex items-center justify-between mb-6">
                    <h3>Inteview Type</h3>
                 </div>
       
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  
                 </div>
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
