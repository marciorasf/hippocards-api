import AuthRoutes from "./routes/AuthRoutes";
import CategoryRoutes from "./routes/CategoryRoutes";
import FlashcardRoutes from "./routes/FlashcardRoutes";
import UserRoutes from "./routes/UserRoutes";

const routes = [...AuthRoutes, ...CategoryRoutes, ...FlashcardRoutes, ...UserRoutes];

export default routes;
