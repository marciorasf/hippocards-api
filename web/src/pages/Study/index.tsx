import React, { useEffect, useState } from "react"
import api from "../../api"
import PageHeader from "../../components/Header"
import { Button } from "./styles"

interface Flashcard {
  id: string,
  question: string,
  answer: string
}

export default function Study() {

  const [flashcard, setFlashcard] = useState<Flashcard>()

  async function getRandomFlashcard() {
    const user_id = 1
    const response = (await api.get(`/flashcard/random?user_id=${user_id}`))

    return response.data.flashcard
  }

  async function updateFlashcard() {
    const randomFlashcard = await getRandomFlashcard()
    console.log(randomFlashcard)
    setFlashcard(randomFlashcard)
  }


  useEffect(() => {
    updateFlashcard()
  }, [])

  return (
    <>
      <PageHeader />
      <h1>Should list flashcard</h1>
      <h2>
        {flashcard?.id}
      </h2>
      <h2>
        {flashcard?.question}
      </h2>
      <h2>
        {flashcard?.answer}
      </h2>
      <Button>Ola</Button>
    </>
  )
}
