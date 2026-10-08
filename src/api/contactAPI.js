import axiosInstance from "../axios/axiosInstance.js";

export const sendContactMessage = async ({ name, email, message }) => {
  const response = await axiosInstance.post("/contact/send", {
    name,
    email,
    message,
  });

  return response.data;
};