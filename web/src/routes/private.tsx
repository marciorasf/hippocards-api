import React from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import AuthService from "../services/AuthService"

import AddCard from "../pages/AddCard"
import Study from "../pages/Study"

// TODO add correct type
function PrivateRoute({ component: Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={props =>
        AuthService.isAuthenticated()
          ? <Component {...props} />
          : <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: props.location }
            }}
          />
      }
    />
  )
}

function PrivateRoutes() {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Study} />
      <PrivateRoute path="/study" exact component={Study} />
      <PrivateRoute path="/add-card" exact component={AddCard} />
    </Switch>
  )
}

export default PrivateRoutes
