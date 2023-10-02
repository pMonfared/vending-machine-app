import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";

import { persistor, store } from "./store"; // Import the Redux store and persistor
import "./index.css";
import App from "./App"; // Import your main application component

const rootElement = document.getElementById("root"); // Get the root element in the HTML
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Provide the Redux store to the application */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Add Redux-Persist gate */}
        <BrowserRouter>
          {/* Set up routing with BrowserRouter */}
          <Routes>
            {/* Define routes using the Routes component */}
            <Route path="/*" element={<App />} />{" "}
            {/* Define a route for your main App component */}
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
