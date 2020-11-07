import React, { useState, FormEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";

import { PageContent, MainContainer } from "../../assets/styles/global";
import CustomCreatableSelect from "../../components/CustomCreatableSelect";
import Divider from "../../components/Divider";
import { Notify } from "../../hooks/Notify";
import { Category } from "../../interfaces/Category";
import { FlashcardCreateInput } from "../../interfaces/Flashcard";
import api from "../../services/api";
import AuthService from "../../services/AuthService";
import handleError from "../../services/ErrorHandler";
import { QuestionTextarea, AnswerTextarea, ButtonsContainer } from "./styles";

const emptyFlashcard = {
  question: "",
  answer: "",
  category: {},
};

export default function CreateFlashcard(props: any) {
  const type = props?.location?.pathname === "/add-card" ? "add" : "edit";
  const flashcardId = props?.match?.params?.flashcardId;

  const history = useHistory();

  const [flashcard, setFlashcard] = useState<FlashcardCreateInput>(
    emptyFlashcard
  );

  const [categories, setCategories] = useState<Category[]>([]);

  function resetFlashcard() {
    setFlashcard({
      ...flashcard,
      ...emptyFlashcard,
    });
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

  async function getFlashcardData() {
    try {
      const response = await api.get("/flashcard", {
        headers: AuthService.getAuthHeader(),
        params: {
          flashcardId,
        },
      });
      setFlashcard({
        ...flashcard,
        ...response?.data?.flashcard,
      });
    } catch (error) {
      handleError(error, "Could not get your flashcard.");
    }
  }

  async function addCard() {
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
      handleError(error, "Could not add your flashcard");
    }
  }

  async function updateCard() {
    try {
      await api.put("/flashcard", flashcard, {
        headers: AuthService.getAuthHeader(),
        params: {
          flashcardId,
        },
      });

      Notify.success("Flashcard updated!");
    } catch (error) {
      handleError(error, "Could not update your flashcard.");
    }
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (type === "add") {
      addCard();
    } else {
      updateCard();
    }
  }

  async function getAndUpdateCategories() {
    try {
      const response = await api.get("/categories", {
        headers: AuthService.getAuthHeader(),
      });
      setCategories(response.data.categories);
    } catch (error) {
      handleError(error, "Could not get categories.");
    }
  }

  useEffect(() => {
    getAndUpdateCategories();
    if (type === "edit") {
      getFlashcardData();
    }
  }, [type]);

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
            value={flashcard.question}
            required
          />

          <Divider height="1.5em" />

          <AnswerTextarea
            label="Answer"
            name="answer"
            onChange={({ target }) =>
              handleInputChange(target.name, target.value)
            }
            value={flashcard.answer}
            required
          />

          <Divider height="1.5em" />

          <CustomCreatableSelect
            label="Category"
            name="category"
            onChange={handleInputChange}
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />

          <Divider height="2rem" />

          <ButtonsContainer>
            <Button
              color="secondary"
              type="button"
              fullWidth
              onClick={handleNavigateToStudy}
            >
              go back
            </Button>

            <Button
              fullWidth
              color="secondary"
              variant="contained"
              type="submit"
            >
              {type === "add" ? "Add card" : "Update card"}
            </Button>
          </ButtonsContainer>
        </form>
      </MainContainer>
    </PageContent>
  );
}
