import React from "react";
import { useAuth } from "./../hooks/useAuth";
import { Link } from "react-router-dom";

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
      <h1>Welcome, {auth.user.username}!</h1>
      <Link to="/logout">Logout</Link>
      <Link to="/products">Product List</Link>
    </div>
  );
};

export default Home;
