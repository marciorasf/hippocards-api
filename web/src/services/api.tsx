import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3333/api"
    : "https://marciorasf-flashcards.herokuapp.com/api";

const api = axios.create({
  baseURL,
});

export default api;
