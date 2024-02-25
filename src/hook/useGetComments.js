import React, { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

export default function useGetComments() {
  const [comments, setComments] = useState([]);
  const axiosPublic = useAxiosPublic();

  const getComments = async (postId) => {
    try {
      const res = await axiosPublic(`/api/comment/getComments/${postId}`);
      //   console.log(res.data);
      setComments(res.data.comments);
    } catch (error) {
      console.log(error);
    }
  };
  return { comments, getComments };
}
