import axiosInstance from "../axios/axiosInstance.js";

export const getAssemblyToken = async () => {
    const response = await axiosInstance.get(
        "/interview/get/token"
    );

    return response.data.token;
};
