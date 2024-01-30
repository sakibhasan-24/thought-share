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
              <Sidebar.Item icon={HiUser} as={"span"}>
                Profile
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard/profile">
              <Sidebar.Item
                icon={HiViewBoards}
                as={"span"}
                label="Admin"
                labelColor="dark"
              >
                {user?.displayName}
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard/comment">
              <Sidebar.Item icon={HiInbox} label="3" as={"span"}>
                comment
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard/users">
              <Sidebar.Item href="#" icon={HiUser} as={"span"}>
                Users
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard/add-post">
              <Sidebar.Item icon={HiShoppingBag} as={"span"}>
                make a post
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
