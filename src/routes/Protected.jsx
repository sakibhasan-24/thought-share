import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { Spinner } from "flowbite-react";

export default function Protected({ children }) {
  const location = useLocation();
  const { user, loading } = useAuth();
  // console.log(user);
  // console.log(loading);
  if (loading) {
    return <Spinner />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
}
