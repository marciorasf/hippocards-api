import React from "react";
import { BrowserRouter } from "react-router-dom";

import NotLoggedRoutes from "./notLogged";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";

function Routes() {
  return (
    <BrowserRouter>
      <PublicRoutes />
      <NotLoggedRoutes />
      <PrivateRoutes />
    </BrowserRouter>
  );
}

export default Routes;
