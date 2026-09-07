import { toast } from "react-toastify"
import axiosInstance from "../axios/axiosInstance.js";
import axios from "axios";
import { auth } from "../database/firebase.js";

export const uploadProfile = async (image) =>{
      try {

        if(!image){
             toast.error("Please select the image");
             return;
        }

        const { data } = await axiosInstance.get('/auth/user/get-signature');

        console.log(data);

        const formData  = new FormData();

        formData.append("file",image);
        formData.append("api_key", data.apiKey);
        formData.append("timestamp", data.timestamp);
        formData.append("signature", data.signature);
        formData.append("folder", "profile-pictures");

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`,
            formData
        );

        console.log(response);

        const imageUrl = response.data.secure_url;
        const public_id = response.data.public_id;

        const backendResponse = await axiosInstance.post('/auth/user/update/profile',{
            photoURL : imageUrl,
            public_id : public_id
        });

        return backendResponse.data;
        
      } catch (error) {

        console.error(error);
        toast.error("Image upload failed");
        
      }
}

export const logout = async() =>{
    const response = await axiosInstance.post("/auth/user/logout");

    return response.data;

}

export const verifyAccount = async() =>{

  const response = await axios.post("/auth/user/authenticate");
}