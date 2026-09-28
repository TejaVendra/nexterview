import axiosInstance from "../axios/axiosInstance.js";

export const postPortfolioAnalysis = async(url) =>{
    return await axiosInstance.post("/portfolio/analyze",{url});
}


export const getPortfolioAnalysis = async() =>{
    return await axiosInstance.get("/portfolio/analyze/result");
}