import React from "react";
import { Link, Outlet } from "react-router-dom";

import SidebarItem from "./SidebarItem";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4 ">
      <div className="md:col-span-1 lg:col-span-2 ">
        <SidebarItem />
      </div>
      <div className="md:col-span-3 lg:col-span-6">
        <Outlet />
      </div>
    </div>
  );
}
