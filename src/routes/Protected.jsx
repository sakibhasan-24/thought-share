import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const { currentUser, loading } = useSelector((state) => state.user);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (currentUser) {
    children;
  }
  return <Navigate to="/login" />;
}
