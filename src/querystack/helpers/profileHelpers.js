import axiosInstance from "../../axios/axiosInstance.js"

export const getProfile = async (email) =>{
    const response = await axiosInstance.get(`/auth/user/${email}`);
    return response.data.user;
}