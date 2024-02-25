import React, { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

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

  const handleDeleteuser = async (id) => {
    setLaoding(true);
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
        const res = await axiosPublic.delete(`/api/users/delete/${id}`);
        if (res.data) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
        const remainingUsers = users.filter((user) => user._id !== id);
        setUsers(remainingUsers);
      }
    });
    try {
    } catch (error) {
      console.log(error);
    } finally {
      setLaoding(false);
    }
  };

  return { loading, getUsers, users, handleDeleteuser };
}
