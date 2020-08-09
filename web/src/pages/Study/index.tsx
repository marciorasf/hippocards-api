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
  id: string,
  question: string,
  answer: string
}

export default function Study() {
  const history = useHistory();

  const [card, setCard] = useState<Flashcard>()

  async function getRandomCard() {
    const user_id = 1
    const response = (await api.get(`/flashcard/random?user_id=${user_id}`))

    return response.data.flashcard
  }

  async function changeCard() {
    const randomFlashcard = await getRandomCard()
    console.log(randomFlashcard)
    setCard(randomFlashcard)
  }

  function handleNavigateAddCardPage(){
    history.push("/add-card")
  }

  useEffect(() => {
    changeCard()
  }, [])

  return (
    <Container>
      <PageHeader >
        <AddCardFab onClick={handleNavigateAddCardPage}>
          Add card
        </AddCardFab>
      </PageHeader>
      <Content>
        <Card>
          <CardTitle>
            Card: {card?.id}
          </CardTitle>
          <CardContent>
            <CardQuestion>
              {card?.question}
            </CardQuestion>
          </CardContent>

          <CardFooter>
            <LeftIconButtons>
              <IconButton>
                <BookmarkBorderIcon />
              </IconButton>

              <IconButton>
                <FlipIcon />
              </IconButton>
            </LeftIconButtons>
            <RightButton>
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
