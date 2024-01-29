import React, { createContext, useState } from "react";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const { user, setUser } = useState(null);
  const { loading, setLaoding } = useState(true);

  const value = {
    loading,
    user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
