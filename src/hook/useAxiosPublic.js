import axios from "axios";
export default function useAxiosPublic() {
  const axiosPublic = axios.create({
    // baseURL: "https://thought-share.vercel.app",
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });
  return axiosPublic;
}
