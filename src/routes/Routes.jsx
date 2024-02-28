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
import AdminRoute from "./AdminRoute";
import CreatePost from "../pages/post/createPost/CreatePost";
import Posts from "../pages/posts/Posts";
import Edit from "../pages/EditPost/Edit";
import Users from "../pages/users/Users";
import PostDetails from "../components/PostDetails";
import CommentsDash from "../pages/comments/CommentsDash";

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
        path: "/posts/:postTitle/:postId",
        element: <PostDetails />,
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

          {
            path: "/dashboard/create-post",
            element: (
              <AdminRoute>
                <CreatePost />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/comments",
            element: <CommentsDash />,
          },
          {
            path: "/dashboard/posts",
            element: (
              <AdminRoute>
                <Posts />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/edit/:id",
            element: (
              <AdminRoute>
                <Edit />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/users",
            element: (
              <AdminRoute>
                <Users />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
