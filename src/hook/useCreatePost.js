import React, { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useSelector } from "react-redux";

export default function useCreatePost() {
  const axiosPublic = useAxiosPublic();
  const [postLoading, setPostLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  //   console.log(currentUser);
  const createPost = async (data) => {
    // console.log(data);
    setPostLoading(true);
    try {
      const res = await axiosPublic.post("/api/post/create-post", data);
      //   console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    }
  };
  return { createPost, postLoading };
}
