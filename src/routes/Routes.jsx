import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/ErrorPage/Error";
import Main from "./main";
import Home from "../pages/Home/Home";
import About from "../pages/Home/About/About";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Registration/Login";
import Signup from "../pages/Registration/Signup";
import Profile from "../pages/Dashboard/Profile";
import CreatePost from "../pages/Post/CreatePost";
import Posts from "../pages/Post/Posts";
import Edit from "../pages/Dashboard/Edit";
import Users from "../pages/Dashboard/Users";
import Protected from "./Protected";
import ApplyForm from "../pages/Dashboard/premiumUser/ApplyForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "create-post",
            element: <CreatePost />,
          },
          {
            path: "posts",
            element: <Posts />,
          },
          {
            path: "edit/:id",
            element: <Edit />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "apply",
            element: <ApplyForm />,
          },
        ],
      },
    ],
  },
]);

export default router;
