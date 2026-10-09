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

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Do not refresh repeatedly
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        // Use plain axios to avoid the instance's interceptors
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;

        if (!newAccessToken) {
          throw new Error("Access token missing from refresh response");
        }

        localStorage.setItem("access_token", newAccessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        // Retry the original failed request
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem("access_token");

        // Let your auth context handle the logged-out state
        window.dispatchEvent(new Event("auth:logout"));

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;