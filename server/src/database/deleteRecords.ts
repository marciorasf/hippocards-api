import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteRecords() {
  await prisma.flashcard.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("End deleting");
}

deleteRecords().then(() => process.exit());
