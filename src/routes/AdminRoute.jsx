import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { currentUser, loading } = useSelector((state) => state.user);
  const location = useLocation();
  if (loading) return <h1>Loading...</h1>;
  if (currentUser?.isAdmin) return children;
  return <Navigate to="/login" state={{ from: location }} replace />;
}
