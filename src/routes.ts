import AuthRoutes from "@routes/auth";
import CategoryRoutes from "@routes/category";
import FlashcardRoutes from "@routes/flashcard";
import UserRoutes from "@routes/user";

const routes = [...AuthRoutes, ...CategoryRoutes, ...FlashcardRoutes, ...UserRoutes];

export default routes;
