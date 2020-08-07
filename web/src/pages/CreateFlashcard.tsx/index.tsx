import React, { useState, ChangeEvent, FormEvent } from "react"

import api from "../../api"
import Header from "../../components/Header"

import "./styles.css"

const emptyFlashcard = {
  question: "",
  answer: ""
}

const user_id = 1

export default function CreateFlashcard() {
  const [flashcard, setFlashcard] = useState(emptyFlashcard)
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    console.log(event.target)
    setFlashcard({
      ...flashcard,
      [name]: value
    })
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const payload = {
      user_id,
      ...flashcard
    }

    const response = await api.post("/flashcard", payload)
  }

  return (
    <>
      <Header />
      <form onSubmit={handleFormSubmit}>
        <div className="input-block">
          <label htmlFor="question">Question:</label>
          <input type="text" id="question" name="question" onChange={handleInputChange} />
        </div>
        <div className="input-block">
          <label htmlFor="answer">Answer:</label>
          <input type="text" id="answer" name="answer" onChange={handleInputChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  )
}
