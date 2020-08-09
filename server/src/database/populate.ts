import { Flashcard } from "../interfaces/FlashcardInterface";
import { User } from "../interfaces/UserInterface";
import db from "./connection";

function getTemplateUser(): User {
  return {
    email: "marciorasf@gmail.com",
    password: "1234",
  };
}

function getTemplateFlashcards(nCards: number): Flashcard[] {
  function generateTemplateFlashcard(id: number) {
    return {
      question: `This is a template question ${id}`,
      answer: `This is a template answer ${id}`,
      is_bookmarked: id % 5 === 0,
      is_known: id % 5 === 1,
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

  console.log("Start populating users");

  const [user_id] = await db("users").insert(user);

  console.log("End populating users");

  console.log("Start populating flashcards");

  const flashcards = getTemplateFlashcards(nFlashcards);
  await Promise.all(
    flashcards.map(async (flashcard) => {
      return db("flashcards").insert({
        user_id,
        ...flashcard,
      });
    })
  );

  console.log("End populating flashcards");
}

populate(10).then(() => process.exit());
