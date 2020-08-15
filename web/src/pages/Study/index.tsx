import React, { useEffect, useState } from "react";
import { FiFilter as FilterIcon } from "react-icons/fi";
import {
  MdBookmark as BookmarkIcon,
  MdBookmarkBorder as BookmarkBorderIcon,
  MdFlip as FlipIcon,
} from "react-icons/md";
import { useHistory } from "react-router-dom";

import { PageContent, MainContainer } from "../../assets/styles/global";
import AddCardFab from "../../components/AddCardFab";
import PageHeader from "../../components/PageHeader";
import { Notify } from "../../hooks/Notify";
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
  NextButton,
  IconButton,
  FilterButton,
} from "./styles";

const blankCard: Flashcard = {
  id: 0,
  question: "",
  answer: "",
  isBookmarked: false,
  isKnown: false,
  views: 0,
};

export default function Study() {
  const history = useHistory();

  const [card, setCard] = useState<Flashcard>(blankCard);
  const [isShowingQuestion, setIsShowingQuestion] = useState(true);

  async function getRandomCard() {
    const response = await api.get("/flashcard/random", {
      headers: AuthService.getAuthHeader(),
      params: {
        isBookmarked: false,
        isKnown: false,
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
  }, []);

  return (
    <>
      <PageHeader>
        {/* <FilterButton>
          <FilterIcon />
        </FilterButton> */}
        <AddCardFab onClick={handleNavigateToAddCardPage}>Add card</AddCardFab>
      </PageHeader>
      <PageContent>
        <MainContainer>
          <Card>
            <CardTitle>
              <p>Card: {card?.id}</p>
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

                <IconButton onClick={handleToggleQuestion}>
                  <FlipIcon />
                </IconButton>
              </LeftIconButtons>
              <RightButton onClick={handleSetKnownTrue}>I know it</RightButton>
            </CardFooter>
          </Card>
          <NextButton color="secondary" onClick={changeCard}>
            Next
          </NextButton>
        </MainContainer>
      </PageContent>
    </>
  );
}
