import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import LogoutButton from "../Auth/LogoutButton";
import { Link } from "react-router-dom";

const HeaderStyles = styled.header`
  background-color: #fff;
  padding: 10px 20px;
  border-bottom: 3px solid #ccc;
`;

const Header: React.FC<{
  title?: string;
}> = ({ title }) => {
  const auth = useAuth();
  return (
    <HeaderStyles>
      <Grid
        container
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <h1>{title || "My App"}</h1>
        </Grid>
        <Grid item alignItems={"flex-end"}>
          <h4>Welcome, {auth.user.username}!</h4>
          {auth.user.role === "buyer" && (
            <h5>
              <Link to={"/deposit"}>Available Deposit: {auth.deposit}</Link>
            </h5>
          )}
          <LogoutButton />
        </Grid>
      </Grid>
    </HeaderStyles>
  );
};

export default Header;
