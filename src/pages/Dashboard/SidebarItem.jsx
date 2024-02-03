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
import { useShowPost } from "../../apiCallHooks/showPost";

export default function SidebarItem() {
  const { user } = useAuth();
  const { posts } = useShowPost();

  // console.log(posts.totalPost);
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
            <Link to="/dashboard/create-post">
              <Sidebar.Item icon={HiInbox} label="admin" as={"span"}>
                Create A Post
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard/posts">
              <Sidebar.Item icon={HiInbox} label={posts?.totalPost} as={"span"}>
                Show Posts
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
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
