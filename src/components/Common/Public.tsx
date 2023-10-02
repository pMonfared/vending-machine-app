import React, { Link } from "react-router-dom";

const Public = () => {
  return (
    <div>
      <h1>This is Public page</h1>
      <h2>
        <Link to="/login">You can login here!</Link>
      </h2>
    </div>
  );
};

export default Public;
