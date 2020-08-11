import React from "react";
import "./assets/styles/reset.css";
import "./assets/styles/global.css";
import { Provider as ReduxProvider } from "react-redux";

import Routes from "./routes";
import store from "./store";

function App() {
  return (
    <ReduxProvider store={store}>
      <Routes />
    </ReduxProvider>
  );
}

export default App;
