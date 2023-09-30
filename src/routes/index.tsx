import React, { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} /> */}
    </Routes>
  );
};

export default MyRoutes;
