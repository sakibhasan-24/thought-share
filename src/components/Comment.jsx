import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSingleUser from "../hook/useSingleUser";
import moment from "moment";
import { CiHeart } from "react-icons/ci";
import { Button, Textarea } from "flowbite-react";
import useAxiosPublic from "../hook/useAxiosPublic";

export default function Comment({
  comment,
  handleLike,
  handleEditComment,
  handleDeleteComment,
}) {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, getUser, user } = useSingleUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment?.comment);
  const axiosPublic = useAxiosPublic();
  //   console.log(comment);
  useEffect(() => {
    getUser(comment?.userId);
  }, [comment?.userId]);

  const handleSaveComment = async () => {
    try {
      // setIsEditing(false)
      const res = await axiosPublic.put(
        `/api/comment/edit/comment/${comment?._id}`,
        { comment: editedComment }
      );
      if (res.data.success) {
        handleEditComment(comment?._id, editedComment);
      }
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
  };
  return (
    <div className="my-6 border-b-2 p-2">
      <div className="flex items-center gap-1 space-x-2 font-semibold text-slate-600">
        <img
          src={user?.profilePicture}
          className="object-cover h-10 w-10 rounded-full"
          alt="img"
        />
        <p>
          {user ? user?.userName : "UNKNOWn"}
          <span className="text-xs ml-2">
            {moment(comment?.createdAt).fromNow()}
          </span>
        </p>
      </div>
      <p className="sm:ml-10 p-2 text-slate-700 font-semibold text-xs">
        {comment?.comment}
      </p>
      <div>
        <button className="font-bold text-xl text-center self-center">
          <CiHeart
            onClick={() => handleLike(comment._id)}
            className={`text-slate-400  
            ${
              currentUser &&
              comment?.likes?.includes(currentUser._id) &&
              "!text-red-500 !font-bold !text-2xl"
            }
            `}
          />
        </button>
        <div className=" flex  items-center space-x-2 gap-2 font-xs">
          <p className="text-xs font-semibold ">
            {comment?.numberOfLikes}
            <span className="ml-1">
              {comment?.numberOfLikes <= 1 ? "like" : "likes"}
            </span>
          </p>
          {/* <p className="font-semibold text-xs hover:text-green-600 hover:underline cursor-pointer">
            edit
          </p> */}
          {currentUser?._id && comment?.userId === currentUser._id ? (
            <>
              <p
                className="cursor-pointer"
                onClick={() => setIsEditing(!isEditing)}
              >
                <span>edit</span>
              </p>
              {isEditing && (
                <>
                  <Textarea
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  ></Textarea>
                  <div className="flex items-center justify-end gap-2">
                    <Button onClick={() => setIsEditing(false)}>cancel</Button>
                    <Button onClick={handleSaveComment}>Save</Button>
                  </div>
                </>
              )}
            </>
          ) : (
            ""
          )}
          {(currentUser?.isAdmin || currentUser?._id === comment?.userId) && (
            <p
              onClick={() => handleDeleteComment(comment?._id)}
              className="text-red-600 hover:underline cursor-pointer"
            >
              delete
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
