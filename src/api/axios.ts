import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://mpiglobal.org",
});

axiosInstance.interceptors.request.use((config) => {
  //   const token = localStorage.getItem("authToken");
  const token = Cookies.get("authToken");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export const getAxiosErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
  return "An unexpected error occurred.";
};

export default axiosInstance;
