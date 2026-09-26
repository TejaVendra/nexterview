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