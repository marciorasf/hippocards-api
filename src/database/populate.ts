import { PrismaClient, UserCreateInput, FlashcardCreateWithoutUserInput } from "@prisma/client";

import UserService from "../services/UserService";

const prisma = new PrismaClient();

function retrieveTemplateUser(): UserCreateInput {
  return {
    email: "marciorasf@gmail.com",
    password: "1234",
  };
}

function retrieveTemplateFlashcards(nCards: number): FlashcardCreateWithoutUserInput[] {
  function generateTemplateFlashcard(id: number) {
    const templateFlashcard: FlashcardCreateWithoutUserInput = {
      question: `This is a template question ${id}`,
      answer: `This is a template answer ${id}`,
      isBookmarked: id % 5 === 0,
      isKnown: id % 5 === 1,
      views: 0,
    };

    return templateFlashcard;
  }

  const flashcardArray = [];
  for (let index = 0; index < nCards; index += 1) {
    flashcardArray.push(generateTemplateFlashcard(index));
  }

  return flashcardArray;
}

async function populate(nFlashcards: number) {
  const user = retrieveTemplateUser();

  let userId: number;
  try {
    console.log("Start populating users");
    const createdUser = await UserService.create(user);

    userId = createdUser.id;

    console.log("End populating users");
  } catch (error) {
    console.log(error);
  }

  console.log("Start populating flashcards");

  const flashcards = retrieveTemplateFlashcards(nFlashcards);

  await Promise.all(
    flashcards.map((flashcard) =>
      prisma.flashcard.create({
        data: {
          ...flashcard,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      })
    )
  );

  console.log("End populating flashcards");
}

populate(5).then(() => process.exit());
