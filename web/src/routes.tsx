import React from "react"
import { BrowserRouter, Route } from 'react-router-dom'
import AddCard from "./pages/AddCard"
import Study from "./pages/Study"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Study} />
      <Route path="/study" exact component={Study} />
      <Route path="/sign-in" exact component={SignIn} />
      <Route path="/sign-up" exact component={SignUp} />
      <Route path="/add-card" exact component={AddCard} />
    </BrowserRouter>
  )
}

export default Routes
