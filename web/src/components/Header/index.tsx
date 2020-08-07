import React, { FunctionComponent } from "react"
import { Link } from "react-router-dom"

import "./styles.css"

interface PageHeaderProps {

}

const PageHeader: FunctionComponent<PageHeaderProps> = ({ children }) => {
  return (
    <header>
      <Link to="/list-flashcards">Flashcards</Link>
      <Link to="/create-flashcard">Add</Link>
    </header>
  )
}

export default PageHeader
