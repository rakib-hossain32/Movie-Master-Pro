import React from "react";
import AuthContext from "./AuthContext";
import { useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const authInfo = {
    user,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
