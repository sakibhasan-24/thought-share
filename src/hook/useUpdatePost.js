import React, { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useSelector } from "react-redux";

export default function useUpdatePost() {
  const axiosPublic = useAxiosPublic();
  const [postLoading, setPostLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const updatePost = async (id, data) => {
    setPostLoading(true);
    try {
      const res = await axiosPublic.put(
        `/api/post/updatePost/${id}/${currentUser?._id}`,
        data
      );
      //   console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    }
  };
  return { postLoading, updatePost };
}
