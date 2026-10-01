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


export const getBetterContext = async (text, type) => {
  const response = await axiosInstance.post(
    "/resume-maker/context",
    {
      text,
      type,
    }
  );

  return response.data.generatedText;
};

