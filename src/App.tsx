import React from "react";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import MyRoutes from "./routes/index";

const App = () => {
  const auth = useAuth();

  return (
    <>
      {auth.user ? (
        <div>
          <h2>Logged in as {auth.user.username}</h2>
          <button onClick={auth.logout}>Logout</button>
        </div>
      ) : (
        <Router>
          <MyRoutes />
        </Router>
      )}
    </>
  );
};

export default App;
