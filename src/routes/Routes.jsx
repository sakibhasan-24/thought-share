import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/ErrorPage/Error";
import Main from "./main";
import Home from "../pages/Home/Home";
import About from "../pages/Home/About/About";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Registration/Login";
import Signup from "../pages/Registration/Signup";
import Profile from "../pages/Dashboard/Profile";

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
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default router;
