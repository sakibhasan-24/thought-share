import { Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useCommentCreate from "../hook/useCommentCreate";
import useGetComments from "../hook/useGetComments";
import Comment from "./Comment";
import useLike from "../hook/useLike";
import useAxiosPublic from "../hook/useAxiosPublic";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  //   const [comment, setComment] = useState("");
  const { loading, createComment, setComment, comment } = useCommentCreate();
  const { comments, getComments, setComments } = useGetComments();

  const axiosPublic = useAxiosPublic();
  const { handleLikeAction } = useLike();
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const comments = await createComment(postId);
    if (comments) {
      setComment("");
    }
  };
  //   console.log(comments);
  useEffect(() => {
    getComments(postId);
  }, [postId]);

  const handleLike = async (id) => {
    if (!currentUser) {
      return;
    }
    const res = await handleLikeAction(id);
    // console.log(res.success);
    if (res.success) {
      //   console.log(res.comment.likes);
      //   console.log(res.comment?.likes);
      setComments(
        comments.map((comment) =>
          comment._id === id
            ? {
                ...comment,
                likes: res.comment?.likes,
                numberOfLikes: res.comment?.likes?.length,
              }
            : comment
        )
      );
    }
  };
  //   console.log(comments);
  const handleEditComment = async (id, editedComment) => {
    try {
      const res = await axiosPublic.put(`api/comment/edit/comment/${id}`, {
        comment: editedComment,
      });
      if (res.success) {
        setComments(
          comments.map((comment) =>
            comment._id === id
              ? {
                  ...comment,
                  comment: editedComment,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-3xl mx-auto w-full">
      <div>
        {currentUser && comments.length !== undefined ? (
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
        {!comments || comments?.length === 0 ? (
          <p className="text-xs text-slate-700 font-bold">No comments yet</p>
        ) : (
          <>
            <div className="my-6">
              comments:{" "}
              <span className="bg-teal-500 px-2 py-1 rounded-md text-slate-100 ">
                {comments.length}
              </span>
            </div>
            {comments &&
              comments?.map((comment) => (
                <Comment
                  key={comment?._id}
                  comment={comment}
                  handleLike={handleLike}
                  handleEditComment={handleEditComment}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
}
