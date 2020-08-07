import React, { useEffect, useState } from "react"
import api from "../../api"
import PageHeader from "../../components/Header"

import "./styles.css"


interface Flashcard {
  id: string,
  question: string,
  answer: string
}

export default function ListFlashcards() {

  const [flashcards, setFlashcards] = useState<Flashcard[]>([])

  async function getFlashcards() {
    const user_id = 1
    const response = (await api.get(`/flashcards?user_id=${user_id}`))

    const dbFlashcards = response.data.flashcards

    setFlashcards(dbFlashcards)
    return dbFlashcards
  }

  useEffect(() => {
    getFlashcards()
  }, [])

  return (
    <>
      <PageHeader />
      <h1>Should list flashcard</h1>
      {
        flashcards.map(card => {
          return (
            <h1 id={card.id}>
              {card.question}
            </h1>
          )
        })
      }
    </>
  )
}
