import axiosInstance from "../axios/axiosInstance.js";

export const getMockInterview = async (interviewId) => {

    const response = await axiosInstance.get(
        `/interview/${interviewId}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

export const startMockInterview = async (interviewId) => {
    const response = await axiosInstance.post(
        `/interview/${interviewId}/start`,
        {},
        {
            withCredentials: true,
        }
    );

    return response.data;
};


export const pauseMockInterview = async (interviewId) => {

        const response =
            await axiosInstance.post(
                `/interview/${interviewId}/pause`,
                {},
                {
                    withCredentials: true,
                }
            );

        return response.data;
    };




export const getInterviewResult = async (id) => {


  return await axiosInstance.get(
    `/interview/mock-interview/${id}/result`
  );;
};





