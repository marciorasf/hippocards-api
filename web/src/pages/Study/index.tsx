import React, { useEffect, useState } from "react"
import api from "../../api"
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

interface Flashcard {
  id: number,
  question: string,
  answer: string,
  is_bookmarked: boolean,
  is_known: boolean,
  views: number
}

const blankCard: Flashcard = {
  id: 0,
  question: "",
  answer: "",
  is_bookmarked: false,
  is_known: false,
  views: 0
}

export default function Study() {
  const history = useHistory();

  const [card, setCard] = useState<Flashcard>(blankCard)
  const [isShowingQuestion, setIsShowingQuestion] = useState(true)

  async function getRandomCard() {
    const user_id = 1
    const response = await api.get("/flashcard/random", {
      params: {
        user_id: user_id,
        is_bookmarked: false,
        is_known: false
      }
    })

    return response.data.flashcard
  }

  async function handleSetKnownTrue() {
    api.put("/flashcard", {
      is_known: true,
    }, {
      params: {
        flashcard_id: card?.id,
      }
    });

    changeCard();
  }

  async function handleToggleBookmark() {
    const newValue = !card?.is_bookmarked

    setCard({
      ...card,
      is_bookmarked: newValue
    })
    console.log(card.is_bookmarked)

    api.put("/flashcard", {
      is_bookmarked: newValue,
    }, {
      params: {
        flashcard_id: card?.id,
      }
    });
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
                {card.is_bookmarked
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
