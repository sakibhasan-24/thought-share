import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Link
      to={`/posts/${post.title}/${post._id}`}
      className="shadow-lg shadow-black-300 rounded-md p-4 hover:bg-slate-100 duration-300 hover:scale-75"
    >
      <div className=" ">
        <img
          className="h-[250px] rounded-md object-cover"
          src={post?.blogImage}
          alt="blogimage"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold line-clamp-1">{post?.title}</h1>
        <span className="text-slate-800 text-xs">{post?.category}</span>
      </div>
      <div className="my-4 flex items-center justify-center">
        <button className="bg-slate-900 rounded-lg text-white px-4 py-2 font-bold cursor-pointer">
          Show Details
        </button>
      </div>
    </Link>
  );
}
