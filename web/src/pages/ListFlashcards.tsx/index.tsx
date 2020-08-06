import React, { useEffect, useState } from "react"
import api from "../../api"

interface Flashcard {
  id: number,
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
      <h1>Should list flashcard</h1>
      {
        flashcards.map(card => {
          return (
            <h1>
              {card.question}
            </h1>
          )
        })
      }
    </>
  )
}
