import React from "react"
import { Link } from "react-router-dom"

import "./styles.css"

function Landing() {
  return (
    <>
      <h1>
        Landing Page
    </h1>
      <Link to="/create-flashcard">Create flashcard</Link>
      <Link to="/list-flashcards">List flashcards</Link>
    </>
  )
}

export default Landing
