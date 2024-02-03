import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const axiosSecure = useAxiosSecure();
export const useShowPost = (startIndex) => {
  const {
    data: posts = [],
    refetch,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      // refetch();
      const res = await axiosSecure.get(`/posts?startIndex=${startIndex}`);
      return res.data;
    },
  });

  return { posts, isError, isLoading, refetch };
};
