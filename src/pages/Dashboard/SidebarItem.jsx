import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Sidebar } from "flowbite-react";
import useAuth from "../../hook/useAuth";
import { Link } from "react-router-dom";

export default function SidebarItem() {
  const { user } = useAuth();
  return (
    <div className="p-2 rounded-lg m-6">
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to="/dashboard/profile">
              <Sidebar.Item icon={HiUser}>Profile</Sidebar.Item>
            </Link>
            <Link to="/dashboard/profile">
              <Sidebar.Item icon={HiViewBoards} label="Admin" labelColor="dark">
                {user?.displayName}
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard/comment">
              <Sidebar.Item icon={HiInbox} label="3">
                comment
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard/users">
              <Sidebar.Item href="#" icon={HiUser}>
                Users
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard/add-post">
              <Sidebar.Item icon={HiShoppingBag}>make a post</Sidebar.Item>
            </Link>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              see request
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
