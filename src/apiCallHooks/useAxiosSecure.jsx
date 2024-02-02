import axios from "axios";

export default function useAxiosSecure() {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
  });

  axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  (error) => {
    return Promise.reject(error);
  };

  axiosSecure.interceptors.response.use((response) => {
    return response;
  }),
    (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        alert("your are 401");
      }
      return Promise.reject(error);
    };

  return axiosSecure;
}
