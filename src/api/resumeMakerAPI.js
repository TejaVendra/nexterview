import axiosInstance from "../axios/axiosInstance.js";


export const getResumeMaker = async () => {
  return await axiosInstance.get("/resume-maker");
};


export const saveResumeMaker = async (resume) => {
  return await axiosInstance.put(
    "/resume-maker",
    resume
  );
};