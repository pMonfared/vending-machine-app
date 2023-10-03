import * as React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const logoutHandle = () => {
    auth.logout();
    navigate("/");
  };
  return <Button onClick={() => logoutHandle()}>Logout</Button>;
};

export default LogoutButton;
