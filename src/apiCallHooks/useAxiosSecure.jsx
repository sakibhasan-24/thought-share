import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
export default function useAxiosSecure() {
  axiosSecure.interceptors.request.use(
    (config) => {
      // console.log("request send", config);
      const token = localStorage.getItem("token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (response) => {
      // console.log("response send", response);
      return response;
    },
    (error) => {
      const token = localStorage.getItem("token");
      if (
        !token ||
        error.response.status === 401 ||
        error.response.status === 403
      ) {
        // console.log("Unauthorized", error);
        // localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}
