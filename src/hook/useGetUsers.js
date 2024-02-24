import React, { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useSelector } from "react-redux";

export default function useGetUsers() {
  const axiosPublic = useAxiosPublic();
  const { cureentUser } = useSelector((state) => state.user);
  const [loading, setLaoding] = useState(false);
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    setLaoding(true);
    try {
      const res = await axiosPublic.get("/api/users/getUsers");
      //   console.log(res.data.users);
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLaoding(false);
    }
  };

  return { loading, getUsers, users };
}
