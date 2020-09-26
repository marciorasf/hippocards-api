import React from "react";
import { ToastContainer } from "react-toastify";

import "./assets/styles/reset.css";
import "./assets/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/toast.css";
import { Container } from "./assets/styles/global";
import Routes from "./routes";

function App() {
  return (
    <Container>
      <ToastContainer
        limit={1}
        position="bottom-center"
        autoClose={3000}
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
  );
}

export default App;
