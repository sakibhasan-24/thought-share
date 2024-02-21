import React from "react";
import useAxiosPublic from "./useAxiosPublic";

export default function useLogIn() {
  const axiosPublic = useAxiosPublic();

  const logIn = async (email, password) => {
    // console.log(email, password);
    const response = await axiosPublic.post("/api/users/login", {
      email,
      password,
    });
    return response.data;
  };

  return { logIn };
}
