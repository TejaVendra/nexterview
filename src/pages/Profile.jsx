import React from 'react'
import PersonalInformation from '../components/sections/PersonalInformation'
import Settings from '../components/sections/Settings'


function Profile() {

  
  return (
    <section className='pt-23 md:pt-30 px-4 pb-10 font-rubik min-h-screen'>
         <div className="max-w-7xl mx-auto rounded-3xl bg-white/70 backdrop-blur-md shadow-xl border border-white/20 p-6 md:p-10">
               <h2 className='font-semibold text-2xl'>Profile</h2>

               <div className="border-t p-2">
                  
               </div>
               <div className="flex gap-3 items-center justify-center">
                   <button className='px-4 py-3 bg-gray-200 rounded-sm'>Persoanl Information</button>
                   <button className='px-4 py-3 bg-gray-200 rounded-sm'>Settings</button>
               </div>
               {/* renders the compoenent based on selection */}
            
               <Settings/>
         </div>

    </section>
  )
}

export default Profile