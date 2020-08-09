import React, { useState, ChangeEvent, FormEvent } from "react"

import api from "../../api"
import Header from "../../components/Header"


import { Container, Content, QuestionTextarea, AnswerTextarea, ButtonsContainer, CancelButton, AddCardButton } from "./styles"

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
    <Container>
      <Content>
        <QuestionTextarea label="Question" name="question" />
        <AnswerTextarea label="Answer" name="answer" />
        <ButtonsContainer>
          <CancelButton>
            Cancel
        </CancelButton>

          <AddCardButton>
            Add card
        </AddCardButton>
        </ButtonsContainer>
      </Content>
    </Container>
  )
}
