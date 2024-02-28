import React, { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function useGetPosts() {
  const axiosPublic = useAxiosPublic();
  //   const [showMoreButton, setShowMoreButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalLastMonthPosts, setTotalLastMonthPosts] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    setLoading(true);
    try {
      const res = await axiosPublic(`/api/post/get-posts`);
      // console.log(res);
      setTotalPosts(res?.data?.totalPosts);
      setTotalLastMonthPosts(res?.data?.lastMonthPosts);
      setPosts(res.data);
      if (res.data.posts.length < 9) setShowMoreButton(false);
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
      // console.log(startIndex);
      const res = await axiosPublic(
        `/api/post/get-posts?startIndex=${startIndex}&limit=${12}`
      );
      //   console.log(res.data);
      setPosts((prev) => ({
        ...prev,
        posts: [...prev.posts, ...res?.data?.posts],
      }));
      setShowMoreButton(false);
      if (res.data.posts.length < 2) setShowMoreButton(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getPostsSearch = async (search) => {
    setLoading(true);
    try {
      const res = await axiosPublic(`/api/post/get-posts?searchTerm=${search}`);
      setPosts(res?.data?.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeletePost = async (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          //   console.log(postId, currentUser?._id);
          const res = await axiosPublic.delete(
            `/api/post/deletePost/${postId}/${currentUser?._id}`
          );
          if (res.data.success) {
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          }

          setPosts((prev) => ({
            ...prev,
            posts: prev.posts.filter((post) => post._id !== postId),
          }));
          if (posts?.posts?.length < 9) setShowMoreButton(false);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return {
    loading,
    posts,
    getPosts,
    showMoreButton,
    handleShowAllPosts,
    handleDeletePost,
    totalPosts,
    totalLastMonthPosts,
    getPostsSearch,
  };
}
