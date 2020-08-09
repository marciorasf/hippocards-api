import React from "react"
import { BrowserRouter, Route } from 'react-router-dom'
import CreateFlashcard from "./pages/CreateFlashcard.tsx"
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
      <Route path="/create-flashcard" exact component={CreateFlashcard} />
    </BrowserRouter>
  )
}

export default Routes
