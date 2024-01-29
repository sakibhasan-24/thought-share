import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
export const AuthContext = createContext();

const auth = getAuth(app);
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (displayName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };
  const value = {
    loading,
    user,
    createUser,
    updateUser,
  };

  useEffect(() => {
    const clearMemory = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoading(true);
        setUser(currentUser);
        // console.log(currentUser);
      } else {
        console.log("no current User");
        setLoading(false);
        setUser(null);
      }
    });
    return () => clearMemory();
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
