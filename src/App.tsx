import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./App.css";

import MyRoutes from "./routes/index";

const App = () => {
  return (
    <MuiThemeProvider>
      <MyRoutes />
    </MuiThemeProvider>
  );
};

export default App;
