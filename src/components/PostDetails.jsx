import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../hook/useAxiosPublic";
import { Spinner } from "flowbite-react";
import CommentSection from "./CommentSection";
import PostCard from "./PostCard";

export default function PostDetails() {
  const { postTitle, postId } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [recentPosts, setRecentPosts] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const res = await axiosPublic(`/api/post/get-posts?postId=${postId}`);
        setPost(res?.data?.posts);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [postId]);
  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const res = await axiosPublic(`/api/post/get-posts?limit=3`);
        // console.log(res?.data?.posts);
        setRecentPosts(res?.data?.posts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, []);
  // console.log(recentPosts);
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div className="flex flex-col p-3 my-4">
      <h1 className="text-3xl font-semibold text-slate-700  text-center max-w-xl mx-auto">
        {post[0]?.title}
      </h1>
      <Link
        to={`/search?category=${post[0]?.title}`}
        className="mt-5 self-center bg-slate-600 rounded-md p-2 text-white"
      >
        <button>{post[0]?.category}</button>
      </Link>
      <div className="w-3/4 mx-auto min-h-screen">
        <img
          src={post[0]?.blogImage}
          alt="image"
          className="object-cover w-full p-3 mt-5 max-h-[600px] shadow-lg"
        />
      </div>
      <div className="flex items-center justify-between text-xs my-2 font-semibold border-b border-slate-700">
        <span>{new Date(post[0]?.createdAt).toLocaleDateString()}</span>
        <span>{(post[0]?.content.length / 1000).toFixed(0)} min read</span>
      </div>
      <div
        className="max-w-2xl mx-auto p-4 post"
        dangerouslySetInnerHTML={{ __html: post[0]?.content }}
      ></div>
      {/* commnet section */}
      <CommentSection postId={post[0]?._id} />
      <div className="">
        {/* recent posts */}
        <p className="text-3xl font-semibold text-center text-slate-900">
          Recenet Posts
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-center gap-4">
          {/* fetch recent Posts */}

          {recentPosts &&
            recentPosts?.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </div>
  );
}
