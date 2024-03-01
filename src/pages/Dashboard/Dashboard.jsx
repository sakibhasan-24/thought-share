import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import useLogOut from "../../hook/useLogOut";
import { logOutSuccess } from "../../redux/store/userSlice";
import DashboardContainer from "./DashboardContainer";
import useGetUsers from "../../hook/useGetUsers";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { getUsers, users } = useGetUsers();
  let count = 0;
  useEffect(() => {
    const fetchData = async () => {
      await getUsers();
      users?.map((user) => user.adminRequest === true && count++);
      if (count > 0) {
        Swal.fire({
          icon: "warning",
          title: "You have " + count + " admin request",
        });
      }
    };
    fetchData();
  }, [count]);
  console.log(users);
  console.log(count);
  const handleRoute = (route) => {
    // console.log(route);
    if (location.pathname === route) return true;
  };
  const { currentUser } = useSelector((state) => state.user);
  const { logOut } = useLogOut();
  const handleLogOut = async (id) => {
    try {
      const res = await logOut(id);
      dispatch(logOutSuccess(res));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-3 sm:grid-cols-8  md:grid-cols-12">
      <div className=" col-span-1 sm:col-span-2 md:col-span-3">
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {currentUser && currentUser?.isAdmin && (
                <Sidebar.Item icon={HiChartPie} as={"div"}>
                  <Link
                    className={`${"bg-gray-900 text-white px-4 py-2 rounded-md"}`}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </Sidebar.Item>
              )}
              <Sidebar.Item
                icon={HiViewBoards}
                label={currentUser?.isAdmin ? "Admin" : "User"}
                labelColor="dark"
                as={"div"}
              >
                <Link
                  className={`${
                    handleRoute(`/dashboard/profile`) &&
                    "bg-gray-400 px-4 py-2 rounded-md"
                  }`}
                  to="/dashboard/profile"
                >
                  Profile
                </Link>
              </Sidebar.Item>
              {currentUser && currentUser?.isAdmin === false && (
                <Sidebar.Item icon={HiInbox} as={"div"}>
                  <Link
                    className={`${
                      handleRoute(`/dashboard/request`) &&
                      "bg-gray-400 px-4 py-2 rounded-md"
                    }`}
                    to="/dashboard/request"
                  >
                    make request
                  </Link>
                </Sidebar.Item>
              )}
              {currentUser && currentUser?.isAdmin && (
                <Sidebar.Item icon={HiInbox} as={"div"}>
                  <Link
                    className={`${
                      handleRoute(`/dashboard/posts`) &&
                      "bg-gray-400 px-4 py-2 rounded-md"
                    }`}
                    to="/dashboard/posts"
                  >
                    Posts
                  </Link>
                </Sidebar.Item>
              )}
              {currentUser && currentUser?.isAdmin && (
                <Sidebar.Item icon={HiUser} as={"div"}>
                  <Link
                    className={`${
                      handleRoute(`/dashboard/users`) &&
                      "bg-gray-400 px-4 py-2 rounded-md"
                    }`}
                    to="/dashboard/users"
                  >
                    Users
                  </Link>
                </Sidebar.Item>
              )}
              <Sidebar.Item icon={HiInbox} as={"div"}>
                <Link
                  className={`${
                    handleRoute(`/dashboard/comments`) &&
                    "bg-gray-400 px-4 py-2 rounded-md"
                  }`}
                  to="/dashboard/comments"
                >
                  Comments
                </Link>
              </Sidebar.Item>

              {currentUser && currentUser?.isAdmin && (
                <Sidebar.Item icon={HiShoppingBag} as={"div"}>
                  <Link
                    className={`${
                      handleRoute(`/dashboard/create-post`) &&
                      "bg-gray-400 px-4 py-2 rounded-md"
                    }`}
                    to="/dashboard/create-post"
                  >
                    Create A post
                  </Link>
                </Sidebar.Item>
              )}
              {currentUser && currentUser?.isAdmin && (
                <Sidebar.Item icon={HiShoppingBag} as={"div"}>
                  <Link
                    className={`${
                      handleRoute(`/dashboard/users`) &&
                      "bg-gray-400 px-4 py-2 rounded-md"
                    }`}
                    to="/dashboard/users"
                  >
                    check-Request
                  </Link>
                </Sidebar.Item>
              )}
              <Sidebar.Item
                icon={HiArrowSmRight}
                className="cursor-pointer "
                onClick={() => handleLogOut(currentUser?._id)}
                as={"div"}
              >
                Sign Out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div className="col-span-3 sm:col-span-6 md:col-span-9">
        <Outlet />
      </div>
    </div>
  );
}
