import React, { useEffect, useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { Tooltip, Button } from "@material-ui/core";
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  FilterList as FilterIcon,
  School as SchoolIcon,
  SchoolOutlined as SchoolOutlinedIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
} from "@material-ui/icons";

import { PageContent, MainContainer } from "../../assets/styles/global";
import CustomSingleSelect from "../../components/CustomSingleSelect";
import Divider from "../../components/Divider";
import Modal from "../../components/Modal";
import PageHeader from "../../components/PageHeader";
import { Notify } from "../../hooks/Notify";
import { Category } from "../../interfaces/Category";
import { Flashcard } from "../../interfaces/Flashcard";
import api from "../../services/api";
import AuthService from "../../services/AuthService";
import handleError from "../../services/ErrorHandler";
import {
  Card,
  CardTitle,
  CardContent,
  CardText,
  CardFooter,
  LeftIconButtons,
  ButtonsContainer,
  IconButton,
  FilterButton,
  ModalContent,
  ModalTitle,
} from "./styles";

const blankCard: Flashcard = {
  id: null,
  question: "",
  answer: "",
  isBookmarked: false,
  isKnown: false,
  views: null,
};

const initialFilters = {
  isBookmarked: null,
  isKnown: false,
  categoryId: null,
};

export default function Study() {
  const history = useHistory();

  const [card, setCard] = useState<Flashcard>(blankCard);
  const [isShowingQuestion, setIsShowingQuestion] = useState(true);
  const [filters, setFilters] = useState(initialFilters);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  async function getRandomCard() {
    const response = await api.get("/flashcard/random", {
      headers: AuthService.getAuthHeader(),
      params: {
        currentFlashcardId: card.id,
        ...filters,
      },
    });

    return response?.data?.flashcard;
  }

  async function changeCard() {
    try {
      const randomFlashcard = await getRandomCard();

      setIsShowingQuestion(true);
      setCard(randomFlashcard);
    } catch (error) {
      if (error.response.status === 404) {
        if (card?.id) {
          Notify.info("There is no more flashcards using these filters!");
        } else {
          setCard(blankCard);
          Notify.info("There is no flashcards using these filters!");
        }
      } else {
        handleError(error, "Could not get another flashcard.");
      }
    }
  }

  function handleOpenFilters() {
    setIsFiltersOpen(true);
  }

  function handleCloseFilters() {
    setIsFiltersOpen(false);
  }

  function handleChangeFilterInput(key: string, value: string) {
    setFilters({
      ...filters,
      [key]: value,
    });
  }

  function getFilterLabel(value: string | boolean | null) {
    switch (value) {
      case true:
        return "Yes";

      case false:
        return "No";

      default:
        return "All";
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

  function getCategoryName(categoryId: number | null) {
    if (!categories || !categoryId) {
      return "All";
    }

    const category = categories.find((value) => value.id === categoryId);

    return category?.name || "All";
  }

  function handleSubmitFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleCloseFilters();
  }

  function handleToggleQuestion() {
    setIsShowingQuestion(!isShowingQuestion);
  }

  function handleNavigateToAddCardPage() {
    history.push("/add-card");
  }

  async function handleToggleKnown() {
    const newValue = !card?.isKnown;

    setCard({
      ...card,
      isKnown: newValue,
    });

    try {
      api.put(
        "/flashcard",
        {
          isKnown: newValue,
        },
        {
          headers: AuthService.getAuthHeader(),
          params: {
            flashcardId: card?.id,
          },
        }
      );
    } catch (error) {
      handleError(error, "");
    }
  }

  async function handleToggleBookmark() {
    const newValue = !card?.isBookmarked;

    setCard({
      ...card,
      isBookmarked: newValue,
    });

    try {
      api.put(
        "/flashcard",
        {
          isBookmarked: newValue,
        },
        {
          params: {
            headers: AuthService.getAuthHeader(),
            flashcardId: card?.id,
          },
        }
      );
    } catch (error) {
      handleError(error, "");
    }
  }

  async function handleEditCard() {
    history.push(`/edit-card/${card.id}`);
  }

  async function handleDeleteCard() {
    try {
      await api.delete("/flashcard", {
        headers: AuthService.getAuthHeader(),
        params: {
          flashcardId: card.id,
        },
      });

      Notify.success("Flashcard deleted!");

      changeCard();
    } catch (error) {
      handleError(error, "Could not delete this card.");
    }
  }

  useEffect(() => {
    changeCard();
    getAndUpdateCategories();
  }, []);

  return (
    <>
      <PageHeader />

      <PageContent>
        <MainContainer>
          <FilterButton onClick={handleOpenFilters}>
            <FilterIcon />
            Filters
          </FilterButton>

          <Divider height="1.25rem" />

          <Card>
            <CardTitle>
              <p>Card ID: {card?.id}</p>
              <p>Views: {card?.views}</p>
            </CardTitle>

            <CardContent
              className={!isShowingQuestion ? "is-answer" : undefined}
            >
              <CardText>
                {isShowingQuestion ? card?.question : card?.answer}
              </CardText>
            </CardContent>

            <CardFooter>
              <LeftIconButtons>
                <Tooltip title={card?.isBookmarked ? "Unbookmark" : "Bookmark"}>
                  <IconButton onClick={handleToggleBookmark}>
                    {card?.isBookmarked ? (
                      <BookmarkIcon />
                    ) : (
                      <BookmarkBorderIcon />
                    )}
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={card?.isKnown ? "Set as unknown" : "Set as known"}
                >
                  <IconButton onClick={handleToggleKnown}>
                    {card?.isKnown ? <SchoolIcon /> : <SchoolOutlinedIcon />}
                  </IconButton>
                </Tooltip>

                <Tooltip title="Edit card">
                  <IconButton onClick={handleEditCard}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete card">
                  <IconButton onClick={handleDeleteCard}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </LeftIconButtons>
              <Button onClick={handleToggleQuestion}>
                {isShowingQuestion ? "Show answer" : "Show question"}
              </Button>
            </CardFooter>
          </Card>

          <Divider height="1.5rem" />

          <ButtonsContainer>
            <Button
              fullWidth
              color="secondary"
              onClick={handleNavigateToAddCardPage}
            >
              Add card
            </Button>
            <Button
              fullWidth
              color="secondary"
              onClick={changeCard}
              variant="contained"
            >
              Next
            </Button>
          </ButtonsContainer>
        </MainContainer>
      </PageContent>

      <Modal open={isFiltersOpen} onClose={handleCloseFilters}>
        <ModalContent>
          <ModalTitle>Filters</ModalTitle>

          <Divider height="2rem" />

          <form onSubmit={handleSubmitFilters}>
            <CustomSingleSelect
              label="Known"
              name="isKnown"
              onChange={handleChangeFilterInput}
              options={[
                { value: null, label: "All" },
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
              value={{
                value: filters.isKnown,
                label: getFilterLabel(filters.isKnown),
              }}
            />

            <Divider height="1.75em" />

            <CustomSingleSelect
              label="Bookmarked"
              name="isBookmarked"
              onChange={handleChangeFilterInput}
              options={[
                { value: null, label: "All" },
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
              value={{
                value: filters.isBookmarked,
                label: getFilterLabel(filters.isBookmarked),
              }}
            />

            <Divider height="1.75em" />

            <CustomSingleSelect
              label="Category"
              name="categoryId"
              onChange={handleChangeFilterInput}
              options={[
                {
                  value: null,
                  label: "All",
                },
                ...categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                })),
              ]}
              value={{
                value: filters.categoryId,
                label: getCategoryName(filters.categoryId),
              }}
            />

            <Divider height="2.5rem" />

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              type="submit"
            >
              Ok
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
