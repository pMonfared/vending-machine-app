import React, { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";
import ProductList from "../pages/Product/ProductList";
import CreateProduct from "../pages/Product/CreateProduct";
import UpdateProduct from "../pages/Product/UpdateProduct";
import Layout from "../components/Common/Layout";
import Public from "../components/Common/Public";
import RequireAuth from "../components/Auth/RequireAuth";
import Deposit from "../pages/User/Deposit";

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
          <Route path="/products/edit/:id" element={<UpdateProduct />} />
          <Route path="/deposit" element={<Deposit />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MyRoutes;
