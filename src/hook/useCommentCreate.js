import React, { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useSelector } from "react-redux";

export default function useCommentCreate() {
  const axiosPublic = useAxiosPublic();
  const [laoding, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const createComment = async (postId) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post("/api/comment/create", {
        postId,
        userName: currentUser?.userName,
        userId: currentUser?._id,
        comment,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setComment("");
    }
  };
  return { comment, laoding, createComment, setComment };
}
