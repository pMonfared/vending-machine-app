// Import necessary dependencies from Redux and related libraries
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

// Import the root reducer for your Redux store
import rootReducer from "./../reducers";

// Configuration for Redux-Persist
const persistConfig = {
  key: "root", // Key for the persisted state in storage
  storage, // Storage engine for persistence (usually local storage)
};

// Create a persisted reducer by wrapping the root reducer with Redux-Persist
const appPersistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: appPersistedReducer, // Set the persisted reducer as the store's root reducer
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development mode
  middleware: [thunk], // Apply Redux Thunk middleware for handling asynchronous actions
});

// Create a persisted store using Redux-Persist
export const persistor = persistStore(store);

// Define types for Redux store operations
export type AppDispatch = typeof store.dispatch; // Type for dispatching actions
export type RootState = ReturnType<typeof store.getState>; // Type for the root state of the store
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
