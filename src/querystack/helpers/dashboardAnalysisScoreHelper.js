import axiosInstance from "../../axios/axiosInstance.js";

export const dashboardAnalysisScoreHelper = async() =>{
    const response = await axiosInstance.get('/dashboard/analysis/score');

    return response.data;
}

export const getInterviews = async() =>{
    const response = await axiosInstance.get('/interview/user/mockinterviews');

    return response.data;
}