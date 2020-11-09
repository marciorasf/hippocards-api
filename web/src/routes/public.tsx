import React from "react";
import { Route, Switch } from "react-router-dom";

import ChangePassword from "../pages/ChangePassword";
import Landing from "../pages/Landing";

function PublicRoutes() {
  return (
    <Switch>
      <Route path="/landing" exact component={Landing} />
      <Route path="/change-password/:token" exact component={ChangePassword} />
    </Switch>
  );
}

export default PublicRoutes;
