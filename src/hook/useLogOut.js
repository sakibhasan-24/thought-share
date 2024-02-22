import React from "react";
import useAxiosPublic from "./useAxiosPublic";

export default function useLogOut() {
  const axiosPublic = useAxiosPublic();
  const logOut = async (id) => {
    try {
      const res = await axiosPublic(`/api/users/logout/${id}`);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  };
  return { logOut };
}
