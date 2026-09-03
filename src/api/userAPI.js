import { toast } from "react-toastify"
import axiosInstance from "../axios/axiosInstance.js";
import axios from "axios";

export const uploadProfile = async (image) =>{
      try {

        if(!image){
             toast.error("Please select the image");
             return;
        }

        const {data} = await axiosInstance.get('/auth/user/get-signature');

        const formdata  = new FormData();

        formdata.append("file",image);
        formData.append("api_key", data.apiKey);
        formData.append("timestamp", data.timestamp);
        formData.append("signature", data.signature);
        formData.append("folder", "profile-pictures");

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`,
            formData
        );

        const imageUrl = response.data.secure_url;
        const public_id = response.data.public_id;

        await axiosInstance.post('/auth/user/update/profile',{
            photoUrl : imageUrl,
            public_id : public_id
        });

        toast.success("Profile picture uploaded successfully");
        
      } catch (error) {

        console.error(error);
        toast.error("Image upload failed");
        
      }
}