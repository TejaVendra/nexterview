import React from 'react'
import PageTransition from '../components/layouts/PageTransition'

function ResumeMaker() {
  return (
   <PageTransition>
     <section className='pt-23 md:pt-30 min-h-screen font-rubik'>
        <div className="p-5">
           <div className="flex justify-between items-center">
             <h2 className='text-2xl md:text-3xl xl:text-4xl font-semibold '>Resume Maker</h2>
             <p className='text-red-400 text-[10px] pr-5 md:text-[15px]'>- select the templete to start building</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2">
                
           </div>
        </div>
    </section>
   </PageTransition>
  )
}

export default ResumeMaker
