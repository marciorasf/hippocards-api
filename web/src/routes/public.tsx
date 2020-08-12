import React from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "../pages/Landing";

function PublicRoutes() {
  return (
    <Switch>
      <Route path="/landing" exact component={Landing} />
    </Switch>
  );
}

export default PublicRoutes;
