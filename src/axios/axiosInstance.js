import axios from 'axios'

const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL,
    withCredentials:true,

});


// request interceptor
axiosInstance.interceptors.request.use(
    (config) =>{
        const accessToken = localStorage.getItem("access_token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
)

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          }
        );

        const newAccessToken = response.data.accessToken;

        localStorage.setItem(
          "access_token",
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem("access_token");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);



export default axiosInstance;