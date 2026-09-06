import axiosInstance from "../../axios/axiosInstance.js"

export const getProfile = async () =>{
    const response = await axiosInstance.get(`/auth/user/profile`);
    return response.data.user;
}

export const updateName = async (name) => {
    const response = await axiosInstance.post("/auth/user/update/name",
        {name}
    );
    return response.data;
}

export const deleteUser = async () => {
    const response = await axiosInstance.delete("/auth/user/delete");
    
    return response.data;
}