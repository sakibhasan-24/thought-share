import React from "react";
import { Outlet } from "react-router-dom";
import Home from "../pages/Home/Home";

export default function Main() {
  return (
    <div>
      <div>
        <Home />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
