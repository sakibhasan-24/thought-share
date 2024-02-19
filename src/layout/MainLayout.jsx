import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../pages/header/Header";

export default function MainLayout() {
  return (
    <div>
      <div className="max-w-full p-4">
        <Header />
      </div>
      <div className="max-w-6xl mx-auto p-4 my-6">
        <Outlet />
      </div>
    </div>
  );
}
