import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const axiosSecure = useAxiosSecure();
export const useShowPost = () => {
  const {
    data: posts = [],
    refetch,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/posts");
      return res.data;
    },
  });
  return { posts, isError, isLoading, refetch };
};
