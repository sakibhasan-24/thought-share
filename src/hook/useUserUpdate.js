import { useDispatch, useSelector } from "react-redux";
import useAxiosPublic from "./useAxiosPublic";
import {
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailed,
} from "../redux/store/userSlice";
import { useState } from "react";
const axiosPublic = useAxiosPublic();

export default function useUserUpdate() {
  const { currentUser } = useSelector((state) => state.user);
  const [updateMessage, setUpdateMessage] = useState("");
  const dispatch = useDispatch();
  const updateUser = async (userData) => {
    // console.log(userData);
    if (Object.keys(userData).length === 0) {
      setUpdateMessage("Nothing to update");
    }
    dispatch(userUpdateStart());
    try {
      console.log(currentUser?._id);
      const res = await axiosPublic.put(
        `/api/users/update/${currentUser?._id}`,
        userData
      );
      dispatch(userUpdateSuccess(res.data));
      updateMessage("update ");
      return res.data;
    } catch (error) {
      dispatch(userUpdateFailed());
    } finally {
      dispatch(userUpdateFailed());
    }
  };
  return { updateUser, updateMessage };
}
