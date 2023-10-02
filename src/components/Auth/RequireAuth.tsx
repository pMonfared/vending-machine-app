import React, { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./../../hooks/useAuth";

const RequireAuth = () => {
  const auth = useAuth();
  const token = auth.token;
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
