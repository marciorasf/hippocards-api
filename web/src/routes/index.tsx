import React from "react"
import { BrowserRouter } from 'react-router-dom'
import PrivateRoutes from "./private"
import PublicRoutes from "./public"


function Routes() {
  return (
    <BrowserRouter>
      <PrivateRoutes />
      <PublicRoutes />
    </BrowserRouter>
  )
}

export default Routes
