
import axiosInstance from "../axios/axiosInstance.js";

export const postResumeMatch = async(formData) =>{
    return await axiosInstance.post("/resume-match/analyze",formData);
}