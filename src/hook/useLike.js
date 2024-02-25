import React from "react";
import useAxiosPublic from "./useAxiosPublic";

export default function useLike() {
  const axiosPublic = useAxiosPublic();

  const handleLikeAction = async (id) => {
    try {
      const res = await axiosPublic.put(`/api/comment/likeAction/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  return { handleLikeAction };
}
