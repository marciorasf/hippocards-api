import React from "react"
import { BrowserRouter, Route } from 'react-router-dom'
import Landing from "./pages/Landing"
import CreateFlashcard from "./pages/CreateFlashcard.tsx"
import ListFlashcards from "./pages/ListFlashcards.tsx"

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/create-flashcard" exact component={CreateFlashcard} />
      <Route path="/list-flashcards" exact component={ListFlashcards} />
    </BrowserRouter>
  )
}

export default Routes
