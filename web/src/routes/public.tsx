import React from "react"
import { Route, Switch } from "react-router-dom"

import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"


function PublicRoutes() {
  return (
    <Switch>
      <Route path="/sign-in" exact component={SignIn} />
      <Route path="/sign-up" exact component={SignUp} />
    </Switch>
  )
}

export default PublicRoutes
