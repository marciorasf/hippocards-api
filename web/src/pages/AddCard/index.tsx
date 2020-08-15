import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { Close as CloseIcon } from "@material-ui/icons";

import { PageContent, MainContainer } from "../../assets/styles/global";
import Divider from "../../components/Divider";
import { Notify } from "../../hooks/Notify";
import api from "../../services/api";
import AuthService from "../../services/AuthService";
import {
  QuestionTextarea,
  AnswerTextarea,
  ButtonsContainer,
  CancelButton,
  AddCardButton,
  CloseButton,
} from "./styles";

const emptyFlashcard = {
  question: "",
  answer: "",
};

export default function CreateFlashcard() {
  const history = useHistory();

  const [flashcard, setFlashcard] = useState(emptyFlashcard);

  function resetFlashcard() {
    setFlashcard(emptyFlashcard);
  }

  function handleNavigateToStudy() {
    history.push("/study");
  }

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFlashcard({
      ...flashcard,
      [name]: value,
    });
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await api.post("/flashcard", flashcard, {
        headers: AuthService.getAuthHeader(),
      });
      Notify.success("Flashcard added!");
      resetFlashcard();
    } catch (error) {
      console.log({ error });
      Notify.error("Sorry! Could add your flashcard.");
    }
  }

  return (
    <PageContent>
      <MainContainer>
        <form onSubmit={handleFormSubmit}>
          <QuestionTextarea
            label="Question"
            name="question"
            onChange={handleInputChange}
            required
          />
          <Divider height="4rem" />
          <AnswerTextarea
            label="Answer"
            name="answer"
            onChange={handleInputChange}
            required
          />
          <ButtonsContainer>
            <CancelButton type="button" onClick={handleNavigateToStudy}>
              go back
            </CancelButton>

            <AddCardButton type="submit">Add card</AddCardButton>
          </ButtonsContainer>
        </form>
      </MainContainer>
    </PageContent>
  );
}
