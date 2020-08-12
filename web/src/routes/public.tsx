import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

function PublicRoutes() {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </Switch>
  );
}

export default PublicRoutes;
