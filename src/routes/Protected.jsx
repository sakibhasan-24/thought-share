import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const { currentUser, loading } = useSelector((state) => state.user);
  //   console.log(loading, currentUser);
  if (loading) {
    return <div>Loadin sssg...</div>;
  }
  if (currentUser) {
    return children;
  }
  return <Navigate to="/login" />;
}
