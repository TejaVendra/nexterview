import axiosInstance from "../axios/axiosInstance";

export const getMockInterview = async (interviewId) => {

    const response = await axiosInstance.get(
        `http://localhost:3100/interview/${interviewId}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

export const startMockInterview = async (interviewId) => {
    const response = await axiosInstance.post(
        `http://localhost:3100/interview/${interviewId}/start`,
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
                `http://localhost:3100/interview/${interviewId}/pause`,
                {},
                {
                    withCredentials: true,
                }
            );

        return response.data;
    };


export const getInterviews = async() =>{
    const response = await axiosInstance.get('/interview/user/mockinterviews');

    return response.data;
}

export const getInterviewResult = async (id) => {


  return await axiosInstance.get(
    `/interview/mock-interview/${id}/result`
  );;
};





