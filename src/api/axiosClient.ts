import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://english-learning-backend-production.up.railway.app/api",
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response.data.message === "Invalid token.") {
      localStorage.removeItem("token");
    }
    return response.data;
  },
  (error) => {
    if (error.response?.data?.message === "Invalid token.") {
      localStorage.removeItem("token");
    }
    return Promise.reject(error.response?.data);
  }
);

export default axiosClient;
