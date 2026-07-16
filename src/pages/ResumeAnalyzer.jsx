import React from 'react'
import ResumeUpload from '../components/ui/ResumeUpload'
import { resumeSuggestions } from '../data/resumesuggestions'
import { FaAngleDoubleRight } from "react-icons/fa";

function ResumeAnalyzer() {
  return (
    <section className='pt-25 font-rubik'>
          <div className="min-h-screen p-5">
            <div className="">
              <h2 className='text-2xl md:text-3xl xl:text-4xl font-semibold'>Resume Analysis</h2>
            </div>

            <div className="pt-8">
                  <ResumeUpload/>
            </div>
            <div className="flex justify-center md:justify-end md:pr-30 pt-8">
              <button className='bg-blue-400 px-8 py-2 text-xl font-semibold text-white transition-colors duration-300 cursor-pointer hover:bg-blue-600 rounded-full'>Start</button>
            </div>
           <div className="pt-8">
            <h3 className="text-2xl font-semibold mb-4">
              Resume Improvement Suggestions
            </h3>

            <ul className="space-y-3">
              {resumeSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 rounded-lg bg-green-50 px-4 py-3 transition hover:bg-green-100"
                >
                  <FaAngleDoubleRight className="text-green-600 flex-shrink-0" />

                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
          </div>
    </section>
  )
}

export default ResumeAnalyzer
