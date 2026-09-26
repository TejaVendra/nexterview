import axiosInstance from "../axios/axiosInstance.js";



export const postResumeAnalysis = async (data) =>{
         return await axiosInstance.post("resume/analysis",data);
}