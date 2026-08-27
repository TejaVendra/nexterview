import React, { useState } from "react";
import { roles } from "../../data/roles.js";
function MockInterview1() {
      const [selectedRole, setSelectedRole] = useState("");
  return (
     <div>
         {/* Roles */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl md:text-2xl font-semibold">
                  Select a Role
                </h3>
    
                <span className="text-sm text-red-500">
                  * Required
                </span>
              </div>
    
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {roles.map((role) => {
                  const isSelected = selectedRole === role.id;
    
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`group relative rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 active:scale-95 ${
                        isSelected
                          ? "border-cyan-500 bg-cyan-500 text-white shadow-xl"
                          : "border-gray-200 bg-white hover:border-cyan-300 hover:shadow-lg"
                      }`}
                    >
                    
    
                      <p className="font-semibold">{role.role}</p>
                    </button>
                  );
                })}
              </div>
            </div>
    
            {/* Continue */}
            <div className="mt-10 flex justify-center">
              <button
                disabled={!selectedRole}
                className={`rounded-xl px-10 py-3 font-semibold text-white transition-all duration-300 ${
                  selectedRole
                    ? "bg-black/90 hover:bg-black active:scale-95 shadow-lg cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </div>
         </div>
  )
}

export default MockInterview1