import axiosInstance from "../../axios/axiosInstance.js";


export const createMockInterview = async(interviewData) =>{
    const response = await axiosInstance.post('/interview/create-mock-interview',interviewData);

    return response.data;
}