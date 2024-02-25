import React, { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

export default function useSingleUser() {
  const axiosPublic = useAxiosPublic();
  //

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const getUser = async (id) => {
    setLoading(true);
    // console.log(id);
    try {
      const res = await axiosPublic(`/api/users/getUser/${id}`);
      //   console.log(id);
      //   console.log(res);
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getUser, user };
}
