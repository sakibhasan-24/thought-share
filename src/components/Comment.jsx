import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useSingleUser from "../hook/useSingleUser";
import moment from "moment";

export default function Comment({ comment }) {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, getUser, user } = useSingleUser();

  //   console.log(comment?.userId);
  useEffect(() => {
    getUser(comment?.userId);
  }, [comment?.userId]);
  //   console.log(comment?.userId);
  //   console.log(user);
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
    </div>
  );
}
