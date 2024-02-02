import axios from "axios";

export default function useAxiosSecure() {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
  });

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      // console.log(token);
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      alert("error");
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        console.log("Unauthorized", error);
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}
