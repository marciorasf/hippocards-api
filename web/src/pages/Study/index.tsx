import React, { useEffect, useState } from "react"
import api from "../../services/api"
import {
  Container,
  Content,
  Card,
  CardTitle,
  CardContent,
  CardQuestion,
  CardFooter,
  LeftIconButtons,
  RightButton,
  NextButton,
  IconButton,
} from "./styles"

import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Flip as FlipIcon
} from "@material-ui/icons"

import PageHeader from "../../components/PageHeader"
import AddCardFab from "../../components/AddCardFab"
import { useHistory } from "react-router-dom"
import AuthService from "../../services/AuthService"

interface Flashcard {
  id: number,
  question: string,
  answer: string,
  isBookmarked: boolean,
  isKnown: boolean,
  views: number
}

const blankCard: Flashcard = {
  id: 0,
  question: "",
  answer: "",
  isBookmarked: false,
  isKnown: false,
  views: 0
}

export default function Study() {
  const history = useHistory();

  const [card, setCard] = useState<Flashcard>(blankCard)
  const [isShowingQuestion, setIsShowingQuestion] = useState(true)

  async function getRandomCard() {
    const userId = 13

    try {
      const response = await api.get("/flashcard/random", {
        headers: AuthService.getAuthHeader(),
        params: {
          userId,
          isBookmarked: false,
          isKnown: false
        }
      })

      return response.data.flashcard
    } catch (error) {
      console.log({ error })
    }

  }

  async function handleSetKnownTrue() {
    try {

      api.put("/flashcard", {
        isKnown: true,
      }, {
        headers: AuthService.getAuthHeader(),
        params: {
          flashcardId: card?.id,
        }
      });

      changeCard();
    } catch (error) {
      console.log({ error })
    }

  }

  async function handleToggleBookmark() {
    const newValue = !card?.isBookmarked

    setCard({
      ...card,
      isBookmarked: newValue
    })

    try {
      api.put("/flashcard", {
        isBookmarked: newValue,
      }, {
        params: {
          headers: AuthService.getAuthHeader(),
          flashcardId: card?.id,
        }
      });
    } catch (error) {
      console.log({ error })
    }
  }

  async function changeCard() {
    try {
      const randomFlashcard = await getRandomCard()
      setIsShowingQuestion(true)
      setCard(randomFlashcard)
    } catch (error) {
      alert("Could not get another card")
    }
  }

  function handleNavigateToAddCardPage() {
    history.push("/add-card")
  }

  function handleToggleQuestion() {
    setIsShowingQuestion(!isShowingQuestion);
  }

  useEffect(() => {
    changeCard()
  }, [])

  return (
    <Container>
      <PageHeader >
        <AddCardFab onClick={handleNavigateToAddCardPage}>
          Add card
        </AddCardFab>
      </PageHeader>
      <Content>
        <Card>
          <CardTitle>
            <p>
              Card: {card?.id}
            </p>
            <p>
              Views: {card?.views}
            </p>
          </CardTitle>
          <CardContent>
            <CardQuestion>
              {
                isShowingQuestion
                  ? card?.question
                  : card?.answer
              }
            </CardQuestion>
          </CardContent>

          <CardFooter>
            <LeftIconButtons>
              <IconButton onClick={handleToggleBookmark}>
                {card?.isBookmarked
                  ? <BookmarkIcon />
                  : <BookmarkBorderIcon />
                }
              </IconButton>

              <IconButton onClick={handleToggleQuestion}>
                <FlipIcon />
              </IconButton>
            </LeftIconButtons>
            <RightButton onClick={handleSetKnownTrue}>
              I know it
            </RightButton>
          </CardFooter>
        </Card>
        <NextButton color="secondary" onClick={changeCard}>
          Next
        </NextButton>
      </Content>
    </Container>
  )
}
