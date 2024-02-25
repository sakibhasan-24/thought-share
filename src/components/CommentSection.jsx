import { Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useCommentCreate from "../hook/useCommentCreate";
import useGetComments from "../hook/useGetComments";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  //   const [comment, setComment] = useState("");
  const { loading, createComment, setComment, comment } = useCommentCreate();
  const { comments, getComments } = useGetComments();
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const comments = await createComment(postId);
    if (comments) {
      setComment("");
    }
  };
  useEffect(() => {
    getComments(postId);
  }, [postId]);
  //   console.log(comments);
  return (
    <div className="max-w-3xl mx-auto w-full">
      <div>
        {currentUser ? (
          <>
            <p className="bg-slate-400 text-teal-500 font-semibold px-4 rounded-lg text-center">
              Comment As : {currentUser?.userName}
            </p>
            <p className="text-center text-slate-600 font-semibold">
              Go to{" "}
              <Link className="text-blue-500" to="/dashboard/profile">
                Profile
              </Link>
            </p>
            <form onSubmit={handleSubmitComment}>
              <Textarea
                rows={3}
                className="w-full"
                maxLength={600}
                onChange={(e) => setComment(e.target.value)}
              ></Textarea>
              <p>{600 - comment.length} words is remaining</p>
              <input
                type="submit"
                value={"comment"}
                className="w-1/4 cursor-pointer hover:bg-slate-600 bg-slate-700 text-white py-2 px-4 rounded-lg mt-4"
              />
            </form>
          </>
        ) : (
          <p>
            You must need to sign in for comment <Link to="/login">Login</Link>
          </p>
        )}
      </div>
      {/* show all comments on this post */}
      <div>
        {comments?.length === 0 ? (
          <p className="text-xs text-slate-700 font-bold">No comments yet</p>
        ) : (
          <>
            <div className="my-6">
              comments:{" "}
              <span className="bg-teal-500 px-2 py-1 rounded-md text-slate-100 ">
                {comments.length}
              </span>
            </div>
            {comments?.map((comment) => (
              <Comment key={comment?._id} comment={comment} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
