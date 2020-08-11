import { PrismaClient, UserCreateInput, FlashcardCreateInput } from "@prisma/client";

import UserService from "../services/UserService";

const prisma = new PrismaClient();

function getTemplateUser(): UserCreateInput {
  return {
    email: "marciorasf@gmail.com",
    password: "1234",
  };
}

function getTemplateFlashcards(nCards: number): FlashcardCreateInput[] {
  function generateTemplateFlashcard(id: number) {
    return {
      question: `This is a template question ${id}`,
      answer: `This is a template answer ${id}`,
      isBookmarked: id % 5 === 0,
      isKnown: id % 5 === 1,
      views: 0,
    };
  }

  const flashcardArray = [];
  for (let index = 0; index < nCards; index += 1) {
    flashcardArray.push(generateTemplateFlashcard(index));
  }

  return flashcardArray;
}

async function populate(nFlashcards: number) {
  const user = getTemplateUser();

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

  const flashcards = getTemplateFlashcards(nFlashcards);

  for (const flashcard of flashcards) {
    await prisma.flashcard.create({
      data: {
        ...flashcard,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  console.log("End populating flashcards");
}

populate(5).then(() => process.exit());
