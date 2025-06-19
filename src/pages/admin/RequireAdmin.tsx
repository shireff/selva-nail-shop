import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../store/store";

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, currentUser } = useSelector(
    (state: RootState) => state.user
  );
  const location = useLocation();

  const notAllowed = !isAuthenticated || currentUser?.role !== "admin";


  if (notAllowed) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
