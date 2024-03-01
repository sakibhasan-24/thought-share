import React, { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useSelector } from "react-redux";

export default function useAdminRequest() {
  const axiosPublic = useAxiosPublic();
  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const adminRequest = async () => {
    // console.log(currentUser._id);
    setLoading(true);
    try {
      const res = await axiosPublic.put(
        `/api/users/adminRequest/${currentUser._id}`,
        {
          adminRequest: true,
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRequest = async (action, id) => {
    setLoading(true);
    // console.log(data);
    try {
      const res = await axiosPublic.put(`/api/users/requestHandle`, {
        action,
        userId: id,
      });
      console.log(res.data.user);
      return res.data.user;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, adminRequest, handleRequest };
}
