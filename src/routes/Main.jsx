import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../pages/Header/Header";

export default function Main() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
