import React, { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import Swal from "sweetalert2";

export default function useGetComments() {
  const [comments, setComments] = useState([]);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [laoding, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const getComments = async (postId) => {
    try {
      const res = await axiosPublic(`/api/comment/getComments/${postId}`);
      //   console.log(res.data);
      setComments(...comments, res.data.comments);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllComments = async (id) => {
    setLoading(true);
    try {
      const res = await axiosPublic(`/api/comment/getAllComments/${id}`);
      setLastMonthComments(res?.data?.lastMonthComments);
      setTotalComments(res?.data?.totalComments);
      setComments(...comments, res?.data.comments);
      // console.log(totalComments, lastMonthComments);
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteComment = async (id) => {
    setLoading(true);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",

        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (res) => {
        if (res.isConfirmed) {
          const res = await axiosPublic.delete(
            `/api/comment/delete/comment/${id}`
          );

          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          const remainingComments = comments.filter(
            (comment) => comment._id !== id
          );
          // console.log(remainingComments);
          setComments(remainingComments);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    comments,
    getComments,
    setComments,
    getAllComments,
    handleDeleteComment,
    lastMonthComments,
    totalComments,
  };
}
