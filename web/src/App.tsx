import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { Container } from "./assets/styles/global";
import "./assets/styles/reset.css";
import "./assets/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/toast.css";

import Routes from "./routes";
import store from "./store";

function App() {
  return (
    <ReduxProvider store={store}>
      <Container>
        <ToastContainer
          limit={1}
          position="bottom-center"
          autoClose={false}
          closeButton={false}
          hideProgressBar={true}
          pauseOnHover={false}
          pauseOnFocusLoss={true}
          closeOnClick={true}
          draggable={true}
          draggablePercent={70}
          newestOnTop={true}
        />
        <Routes />
      </Container>
    </ReduxProvider>
  );
}

export default App;
