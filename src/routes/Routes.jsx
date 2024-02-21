import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Projects from "../pages/projects/Projects";
import Login from "../pages/Login/Login";
import Signup from "../pages/SignUp/Signup";

import Profile from "../pages/Dashboard/Profile";
import Dashboard from "../pages/Dashboard/Dashboard";
import Protected from "./Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>Something went Wrong</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/projects",
        element: <Projects />,
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
            <Dashboard></Dashboard>
          </Protected>
        ),
        children: [
          {
            path: "/dashboard/profile",
            element: <Profile></Profile>,
          },
        ],
      },
    ],
  },
]);

export default router;
