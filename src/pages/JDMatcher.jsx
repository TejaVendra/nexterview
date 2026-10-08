import React from "react";
import ResumeUploader from "../components/ui/ResumeUpload.jsx";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import PageTransition from "../components/layouts/PageTransition.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { postResumeMatch } from "../api/resumeMatchAPI.js";
import { useNavigate} from 'react-router-dom'
import AnalyzeButton from "../components/ui/AnalyzeButton.jsx";
import JDMatcherLoader from "../components/loaders/JDMatcherLoader.jsx";

function JDMatcher() {

  const [file,setFile] = useState(null);
  const [loading,setLoading] = useState(false);
  const [description,setDescription] = useState("");
  const nav = useNavigate();

  const handleSumbit = async() =>{

    if(!file){
      toast.error("Please select the PDF");
      return;
    }
    if(!description){
      toast.error("Please paste the job description");
      return;
    }


    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume-2",file);
      formData.append("description", description);

      const response = await postResumeMatch(formData);

      window.location.href ='/resume-matches/result'

      
    }catch(error){
        console.error("Error in jd matcher ",error);
        toast.error(error.response?.data?.message ||
          "Failed to analyze resume")
    }finally{
      setLoading(false);
    }


    

  }
  return (
    <>
    {loading&& <JDMatcherLoader/>}
     <PageTransition>
      <section className="pt-25 md:pt-30 px-4 pb-10 font-rubik min-h-screen">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-6 md:p-10">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Resume & JD Matcher
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Upload your resume and paste a job description to instantly analyze
            ATS compatibility, matching skills, missing keywords, and receive
            AI-powered suggestions.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Resume Upload */}
          <div className="md:bg-white rounded-2xl md:shadow-lg border md:p-6 border-gray-100">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-1">
              <IoDocumentTextOutline  size={22}/> Upload Resume
            </h3>

            <ResumeUploader onFileSelect={(selectedFile) => setFile(selectedFile)} />
          </div>

          {/* Job Description */}
          <div className="md:bg-white rounded-2xl md:shadow-lg border md:p-6 border-gray-100">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-1">
              <TfiWrite /> Job Description
            </h3>

            <textarea
            onChange={(e) => setDescription(e.target.value)}
              rows={16}
              placeholder="Paste the complete job description here..."
              className="w-full rounded-xl border border-gray-300 p-4 resize-none outline-none transition focus:shadow-lg"
            />
          </div>

        </div>

        {/* Analyze Button */}
        <div className="flex justify-center mt-10">
          <AnalyzeButton file={file} loading={loading} onClick={handleSumbit} />
        </div>

      </div>
    </section>
    </PageTransition>
    </>
   
  );
}

export default JDMatcher;