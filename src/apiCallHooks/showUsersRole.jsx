import useAxiosSecure from "./useAxiosSecure";
import useAuth from "../hook/useAuth";
import { useQuery } from "@tanstack/react-query";

export default function showUsersRole() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: role = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      //   console.log(user?.email);
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  return { role, isLoading, isError, refetch };
}
