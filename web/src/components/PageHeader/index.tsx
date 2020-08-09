import React, { FunctionComponent } from "react"
import { Link } from "react-router-dom"
import CustomIconButton from "../CustomIconButton"

import { Menu as MenuIcon } from "@material-ui/icons"

import { Header } from "./styles"

interface PageHeaderProps {

}

const PageHeader: FunctionComponent<PageHeaderProps> = ({ children }) => {
  return (
    <Header>
      <nav>
        <h1 className="brand">
          <Link className="nav-item" to="/">Flashcards</Link>
        </h1>
        <ul>
          <li>
            <Link className="nav-item" to="/study">Study</Link>
          </li>
          <li>
            <CustomIconButton>
              <MenuIcon />
            </CustomIconButton>
          </li>
        </ul>
      </nav>
      {children}
    </Header>
  )
}

export default PageHeader
