import React, { useEffect } from "react";
import useGetPosts from "../../hook/useGetPosts";
import PostCard from "../../components/PostCard";
import { Link } from "react-router-dom";
import SearchBox from "../../components/SearchBox";
import Projects from "../projects/Projects";

export default function Home() {
  const { posts, getPosts } = useGetPosts();
  // console.log(posts);
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-12 lg:px-28">
        <h1 className="text-4xl my-2 font-semibold">
          Welcome to my{" "}
          <span className="text-amber-500 text-6xl "> Thought</span>
          Share Blog
        </h1>
        <p className=" text-xl text-center text-slate-700">
          Where I am sharing my thought,my projects,my analysis.based on my
          blogs always there is a section for your comment also you cen send me
          email
        </p>
      </div>
      <div className="my-6 px-20">
        <SearchBox />
      </div>
      {/* projects */}
      <div className="my-20">
        <h1 className="text-4xl text-orange-900 font-bold text-center">
          Posts
        </h1>
        <div className="grid grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts?.posts?.map((post) => (
            <PostCard key={post?._id} post={post} />
          ))}
        </div>
        <Link
          to={`/search`}
          className="text-xl font-semibold text-teal-700 hover:underline text-center"
        >
          view All
        </Link>
      </div>
    </div>
  );
}
