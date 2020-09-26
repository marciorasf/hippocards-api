import React, { useEffect, useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  FilterList as FilterIcon,
  School as SchoolIcon,
  SchoolOutlined as SchoolOutlinedIcon,
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
import {
  Card,
  CardTitle,
  CardContent,
  CardText,
  CardFooter,
  LeftIconButtons,
  RightButton,
  ButtonsContainer,
  AddButton,
  NextButton,
  IconButton,
  FilterButton,
  ModalContent,
  ModalTitle,
  OkButton,
} from "./styles";

const blankCard: Flashcard = {
  id: 0,
  question: "",
  answer: "",
  isBookmarked: false,
  isKnown: false,
  views: 0,
};

const initialFilters = {
  isBookmarked: false,
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
        ...filters,
      },
    });

    return response.data.flashcard;
  }

  async function changeCard() {
    try {
      const randomFlashcard = await getRandomCard();
      setIsShowingQuestion(true);
      setCard(randomFlashcard);
    } catch (error) {
      console.log({ error });
      Notify.error("Sorry! Could not get another flashcard.");
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

  function getFilterLabel(value: string | boolean) {
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
      Notify.error("Sorry! Could not get categories.");
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

  async function handleSetKnownTrue() {
    try {
      api.put(
        "/flashcard",
        {
          isKnown: true,
        },
        {
          headers: AuthService.getAuthHeader(),
          params: {
            flashcardId: card?.id,
          },
        }
      );
      changeCard();
    } catch (error) {
      console.log({ error });
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
      console.log({ error });
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

          <Divider height="2rem" />

          <Card>
            <CardTitle>
              <p>Card ID: {card?.id}</p>
              <p>Views: {card?.views}</p>
            </CardTitle>

            <CardContent>
              <CardText>
                {isShowingQuestion ? card?.question : card?.answer}
              </CardText>
            </CardContent>

            <CardFooter>
              <LeftIconButtons>
                <IconButton onClick={handleToggleBookmark}>
                  {card?.isBookmarked ? (
                    <BookmarkIcon />
                  ) : (
                    <BookmarkBorderIcon />
                  )}
                </IconButton>

                <IconButton onClick={handleSetKnownTrue}>
                  {card?.isKnown ? <SchoolIcon /> : <SchoolOutlinedIcon />}
                </IconButton>
              </LeftIconButtons>
              <RightButton onClick={handleToggleQuestion}>
                {isShowingQuestion ? "Show answer" : "Show question"}
              </RightButton>
            </CardFooter>
          </Card>

          <Divider height="2.4rem" />

          <ButtonsContainer>
            <AddButton color="secondary" onClick={handleNavigateToAddCardPage}>
              Add card
            </AddButton>
            <NextButton color="secondary" onClick={changeCard}>
              Next
            </NextButton>
          </ButtonsContainer>
        </MainContainer>
      </PageContent>

      <Modal open={isFiltersOpen} onClose={handleCloseFilters}>
        <ModalContent>
          <ModalTitle>Filters</ModalTitle>

          <Divider height="4.4rem" />

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

            <Divider height="2.8rem" />

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

            <Divider height="2.8rem" />

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

            <Divider height="4rem" />

            <OkButton type="submit">Ok</OkButton>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
