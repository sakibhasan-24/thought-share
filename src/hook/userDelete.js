import React from "react";
import useAxiosPublic from "./useAxiosPublic";

export default function userDelete() {
  const axiosPublic = useAxiosPublic();
  const deleteUser = async (id) => {
    try {
      const res = await axiosPublic.delete(`/api/users/delete/${id}`);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  };
  return { deleteUser };
}
