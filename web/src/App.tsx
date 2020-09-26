import React from "react";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "@material-ui/styles";

import { Container } from "./assets/styles/global";
import theme from "./assets/styles/theme";
import "./assets/styles/reset.css";
import "./assets/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/toast.css";
import Routes from "./routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
