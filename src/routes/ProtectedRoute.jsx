import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return children;
  }

  return <Navigate to={"/register"} />;
};

export default ProtectedRoute;
