import React, { useEffect } from "react";
import useGetComments from "../../hook/useGetComments";
import { useSelector } from "react-redux";
import useGetUsers from "../../hook/useGetUsers";
import useGetPosts from "../../hook/useGetPosts";
// import {FaPeopleGroup} from
import { FaPeopleGroup } from "react-icons/fa6";
import { FaArrowUp, FaCommentAlt, FaEnvelopeOpen } from "react-icons/fa";
import DashBoardContent from "./DashBoardContent";
import { Link } from "react-router-dom";

export default function DashboardContainer() {
  const { lastMonthComments, totalComments, getAllComments, comments } =
    useGetComments();
  //   console.log(comments);

  //   console.log(firstThreeComments);
  const { lastMonthUsers, totalUsers, getUsers, users } = useGetUsers();
  const { totalPosts, totalLastMonthPosts, getPosts, posts } = useGetPosts();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (currentUser?.isAdmin) getAllComments();
  }, []);
  useEffect(() => {
    if (currentUser?.isAdmin) getUsers();
  }, []);
  useEffect(() => {
    if (currentUser?.isAdmin) getPosts();
  }, []);
  //   console.log(comments);
  const firstTwoComments =
    comments?.length > 0 ? comments?.slice(0, 2) : comments;
  const firstTwoPosts = posts?.posts?.slice(0, 2);
  //   console.log(users);
  const firstTwoUsers = users?.slice(0, 2);
  //   console.log(lastMonthComments, totalComments);
  //   console.log(posts.posts);
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6  items-center  justify-center">
        <div className="bg-slate-700 text-white px-4 py-2 rounded-lg w-full">
          <div className="">
            <p className="text-xl font-semibold text-center">total User </p>
            <div className="flex gap-0 items-center justify-center">
              <FaPeopleGroup className="text-4xl w-full text-center " />
              <p className="text-5xl font-bold text-center animate-pulse w-full">
                {totalUsers}
              </p>
            </div>
          </div>
          <p className="text-center font-semibold text-xl">last month</p>

          <div className="text-center font-bold flex items-center justify-center gap-4">
            <p>{lastMonthUsers}</p>
            <FaArrowUp />
          </div>
        </div>
        <div className="bg-orange-700 text-white px-4 py-2 rounded-lg w-full">
          <div className="">
            <p className="text-xl font-semibold text-center">total Comment </p>
            <div className="flex gap-0 items-center justify-center">
              <FaCommentAlt className="text-4xl w-full text-center " />
              <p className="text-5xl font-bold text-center animate-pulse w-full">
                {totalComments}
              </p>
            </div>
          </div>
          <p className="text-center font-semibold text-xl">last month</p>

          <div className="text-center font-bold flex items-center justify-center gap-4">
            <p>{lastMonthComments}</p>
            <FaArrowUp />
          </div>
        </div>
        <div className="bg-green-700 text-white px-4 py-2 rounded-lg w-full">
          <div className="">
            <p className="text-xl font-semibold text-center">total Post </p>
            <div className="flex gap-0 items-center justify-center">
              <FaEnvelopeOpen className="text-4xl w-full text-center " />
              <p className="text-5xl font-bold text-center animate-pulse w-full">
                {totalPosts}
              </p>
            </div>
          </div>
          <p className="text-center font-semibold text-xl">last month</p>

          <div className="text-center font-bold flex items-center justify-center gap-4">
            <p>{totalLastMonthPosts}</p>
            <FaArrowUp />
          </div>
        </div>
      </div>

      {/* posts ,users,comments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center justify-center ">
        {/* post */}

        <div className="bg-slate-200 rounded-lg my-12  h-[150px]">
          <Link
            className="bg-slate-700  text-white px-4 py-2 rounded-lg"
            to="/dashboard/posts"
          >
            See all
          </Link>
          {firstTwoPosts?.length > 0 &&
            firstTwoPosts?.map((post) => (
              <DashBoardContent
                key={post._id}
                content={post}
              ></DashBoardContent>
            ))}
        </div>
        <div className="bg-slate-200 h-[150px] px-4 py-2 rounded-lg">
          <Link
            className="bg-slate-700  text-white px-4 py-2 rounded-lg"
            to="/dashboard/users"
          >
            See all
          </Link>
          {firstTwoUsers?.length > 0 &&
            firstTwoUsers?.map((user) => (
              <div key={user?._id}>
                <div className="flex items-center justify-between gap-4">
                  <h1>{user?.userName}</h1>
                  <img
                    src={user?.profilePicture}
                    className="w-[40px] h-[40px] rounded-full"
                    alt=""
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="bg-slate-200 h-[150px] px-4 py-2 rounded-lg">
          <Link
            className="bg-slate-700  text-white px-4 py-2 rounded-lg"
            to="/dashboard/comments"
          >
            See all
          </Link>
          {firstTwoComments?.length > 0 &&
            firstTwoComments?.map((comment) => (
              <div key={comment?._id} className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h1>{comment?.comment}</h1>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
