import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const axiosSecure = useAxiosSecure();

export const useShowUser = () => {
  const {
    data: users,
    error,
    loading,
    reFetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");

      return res.data;
    },
  });
  return { users, error, loading, reFetch };
};
