import React from "react";
import { Link, Outlet } from "react-router-dom";

import SidebarItem from "./SidebarItem";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-8 gap-4 ">
      <div className="col-span-2 ">
        <SidebarItem />
      </div>
      <div className="col-span-6">
        <Outlet />
      </div>
    </div>
  );
}
