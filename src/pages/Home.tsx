import React from "react";
import { useAuth } from "./../hooks/useAuth";
import { Link } from "react-router-dom";

const Home = () => {
  const auth = useAuth();

  if (!auth.user) {
    return (
      <div>
        <h1>You are not logged in.</h1>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {auth.user.username}!</h1>
      <Link to="/logout">Logout</Link>
    </div>
  );
};

export default Home;
