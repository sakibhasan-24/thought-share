import React, { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useSelector } from "react-redux";

export default function useGetPosts() {
  const axiosPublic = useAxiosPublic();
  //   const [showMoreButton, setShowMoreButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(true);
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
  const handleShowAllPosts = async () => {
    setLoading(true);
    try {
      const startIndex = posts?.posts?.length;
      console.log(startIndex);
      const res = await axiosPublic(
        `/api/post/get-posts?userId=${
          currentUser?._id
        }&startIndex=${startIndex}&limit=${12}`
      );
      //   console.log(res.data);
      setPosts((prev) => ({
        ...prev,
        posts: [...prev.posts, ...res.data.posts],
      }));
      setShowMoreButton(false);
      if (res.data.posts.length < 2) setShowMoreButton(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, posts, getPosts, showMoreButton, handleShowAllPosts };
}
