import React, { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";
import ProductList from "../pages/Product/ProductList";
import CreateProduct from "../pages/Product/CreateProduct";
import Layout from "../components/Common/Layout";
import Public from "../components/Common/Public";
import RequireAuth from "../components/Auth/RequireAuth";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* protect routes */}
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<CreateProduct />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MyRoutes;
