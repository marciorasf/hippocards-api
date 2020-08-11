import React, { useState, ChangeEvent, FormEvent } from "react"
import { useHistory } from "react-router-dom"

import api from "../../services/api"

import { Container, Content, QuestionTextarea, AnswerTextarea, ButtonsContainer, CancelButton, AddCardButton } from "./styles"
import Divider from "../../components/Divider"
import AuthService from "../../services/AuthService"

const emptyFlashcard = {
  question: "",
  answer: ""
}

export default function CreateFlashcard() {

  const history = useHistory()

  const [flashcard, setFlashcard] = useState(emptyFlashcard)

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFlashcard({
      ...flashcard,
      [name]: value
    })
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const response = await api.post("/flashcard", flashcard, {
        headers: AuthService.getAuthHeader()
      });
      alert(`Card ${response?.data?.flashcard_id} created`)
      handleNavigateToStudy();
    } catch (error) {
      console.log({ error })
    }
  }

  function handleNavigateToStudy() {
    history.push("/study");
  }

  return (
    <Container>
      <Content>
        <form onSubmit={handleFormSubmit}>
          <QuestionTextarea label="Question" name="question" onChange={handleInputChange} />
          <Divider height="4rem" />
          <AnswerTextarea label="Answer" name="answer" onChange={handleInputChange} />
          <ButtonsContainer>
            <CancelButton type="button" onClick={handleNavigateToStudy}>
              Cancel
            </CancelButton>

            <AddCardButton type="submit">
              Add card
            </AddCardButton>
          </ButtonsContainer>
        </form>
      </Content>
    </Container>
  )
}
