import React from "react";
import { useAuth } from "./../hooks/useAuth";
import { Link } from "react-router-dom";
import Header from "../components/Common/Header";

// Home component that displays different content based on user authentication
const Home = () => {
  const auth = useAuth(); // Custom hook to access authentication state

  // If the user is not logged in, display a message and a link to the login page
  if (!auth.user) {
    return (
      <div>
        <h1>You are not logged in.</h1>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  // If the user is logged in, display a welcome message and links to other pages
  return (
    <div>
      <Header title={`Hi, ${auth.user.username}! `} />
    </div>
  );
};

export default Home;
