import React, { useState, FormEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {} from "react-select";
import CreatableSelect from "react-select/creatable";

import { PageContent, MainContainer } from "../../assets/styles/global";
import Divider from "../../components/Divider";
import { Notify } from "../../hooks/Notify";
import { Category } from "../../interfaces/Category";
import { FlashcardCreateInput } from "../../interfaces/Flashcard";
import api from "../../services/api";
import AuthService from "../../services/AuthService";
import {
  QuestionTextarea,
  AnswerTextarea,
  ButtonsContainer,
  CancelButton,
  AddCardButton,
} from "./styles";

const emptyFlashcard = {
  question: "",
  answer: "",
  category: {},
};

export default function CreateFlashcard() {
  const history = useHistory();

  const [flashcard, setFlashcard] = useState<FlashcardCreateInput>(
    emptyFlashcard
  );

  const [categories, setCategories] = useState<Category[]>([]);

  function resetFlashcard() {
    setFlashcard(emptyFlashcard);
  }

  function handleNavigateToStudy() {
    history.push("/study");
  }

  function handleInputChange(key: string, value: any) {
    setFlashcard({
      ...flashcard,
      [key]: value,
    });
  }

  function processCategoryData(category: any) {
    return {
      isNew: category.__isNew__,
      id: category?.value,
      name: category.label,
    };
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await api.post(
        "/flashcard",
        {
          ...flashcard,
          category: processCategoryData(flashcard.category),
        },
        {
          headers: AuthService.getAuthHeader(),
        }
      );
      Notify.success("Flashcard added!");
      resetFlashcard();
    } catch (error) {
      console.log({ error });
      Notify.error("Sorry! Could add your flashcard.");
    }
  }

  async function getAndUpdateCategories() {
    try {
      const response = await api.get("/categories", {
        headers: AuthService.getAuthHeader(),
      });
      setCategories(response.data.categories);
    } catch (error) {
      Notify.error("Sorry! Could not get categories.");
    }
  }

  useEffect(() => {
    getAndUpdateCategories();
  }, []);

  return (
    <PageContent>
      <MainContainer>
        <form onSubmit={handleFormSubmit}>
          <QuestionTextarea
            label="Question"
            name="question"
            onChange={({ target }) =>
              handleInputChange(target.name, target.value)
            }
            required
          />

          <Divider height="3.2rem" />

          <AnswerTextarea
            label="Answer"
            name="answer"
            onChange={({ target }) =>
              handleInputChange(target.name, target.value)
            }
            required
          />

          <Divider height="3.2rem" />

          <CreatableSelect
            isClearable={true}
            onChange={(value) => handleInputChange("category", value)}
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
              isFixed: false,
            }))}
          ></CreatableSelect>

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
