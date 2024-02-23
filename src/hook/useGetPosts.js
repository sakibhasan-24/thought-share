import React, { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useSelector } from "react-redux";

export default function useGetPosts() {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    setLoading(true);
    try {
      const res = await axiosPublic(
        `/api/post/get-posts?userId=${currentUser?._id}`
      );
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, posts, getPosts };
}
