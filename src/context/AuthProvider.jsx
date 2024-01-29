import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../apiCallHooks/useAxiosPublic";
export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export default function AuthProvider({ children }) {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
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
  const value = {
    loading,
    user,
    createUser,
    googleLogIn,
    updateUser,
    userLogIn,
  };

  useEffect(() => {
    const clearMemory = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setLoading(true);
        setUser(currentUser);
        const res = await axiosPublic.post("/jwt", currentUser);
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
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
