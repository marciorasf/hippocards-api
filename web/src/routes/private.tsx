import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import CardForm from "../pages/CardForm";
import Study from "../pages/Study";
import AuthService from "../services/AuthService";

function PrivateRoute({ component: Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthService.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

function PrivateRoutes() {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Study} />
      <PrivateRoute path="/study" exact component={Study} />
      <PrivateRoute path="/add-card" exact component={CardForm} />
      <PrivateRoute path="/edit-card/:flashcardId" component={CardForm} />
    </Switch>
  );
}

export default PrivateRoutes;
