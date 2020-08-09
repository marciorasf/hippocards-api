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

interface Flashcard {
  id: string,
  question: string,
  answer: string
}

export default function Study() {

  const [flashcard, setFlashcard] = useState<Flashcard>()

  async function getRandomFlashcard() {
    const user_id = 1
    const response = (await api.get(`/flashcard/random?user_id=${user_id}`))

    return response.data.flashcard
  }

  async function updateFlashcard() {
    const randomFlashcard = await getRandomFlashcard()
    console.log(randomFlashcard)
    setFlashcard(randomFlashcard)
  }

  useEffect(() => {
    updateFlashcard()
  }, [])

  return (
    <Container>
      <Content>
        <Card>
          <CardTitle>
            Card: 111
          </CardTitle>
          <CardContent>
            <CardQuestion>
              What is the question ?
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
        <NextButton color="secondary">
          Next
        </NextButton>
      </Content>
    </Container>
  )
}
