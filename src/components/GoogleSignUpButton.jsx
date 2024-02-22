import { useState } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/store/userSlice";
import { useDispatch } from "react-redux";
import useAxiosPublic from "../hook/useAxiosPublic";
export default function GoogleSignUpButton() {
  const dispatch = useDispatch();

  const axiosPublic = useAxiosPublic();
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // console.log(result.user);
      // save in db

      const res = await axiosPublic.post("/api/users/google", {
        userName: result?.user.displayName,
        email: result?.user.email,
        profilePicture: result?.user.photoURL,
      });
      dispatch(loginSuccess(res.data));
      console.log(res);
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleGoogleSignUp}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
      type="button"
    >
      {loading ? "Loading..." : "Sign up with Google"}
    </button>
  );
}
