import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productManagementSlice from "./productManagementSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  productManagment: productManagementSlice,
});

export default rootReducer;
