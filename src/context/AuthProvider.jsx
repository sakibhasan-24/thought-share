import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../apiCallHooks/useAxiosPublic";
import useAxiosSecure from "../apiCallHooks/useAxiosSecure";
export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export default function AuthProvider({ children }) {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [logInUser, setLogInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (displayName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };
  const userLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const value = {
    loading,
    user,
    logInUser,
    createUser,
    googleLogIn,
    updateUser,
    userLogIn,
    userLogOut,
  };

  useEffect(() => {
    const clearMemory = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setLoading(false);
        setUser(currentUser);
        const email = { email: currentUser?.email };
        // console.log(userEmail);
        const res = await axiosPublic.post("/jwt", email);
        // console.log(res);
        localStorage.setItem("token", res.data.token);
        // console.log(currentUser);
        // console.log(res.data.token);
      } else {
        console.log("no current User");
        localStorage.removeItem("token");
        setLoading(false);
        setUser(null);
      }
    });
    return () => clearMemory();
  }, [axiosPublic]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
