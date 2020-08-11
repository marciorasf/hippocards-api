import api from "./api"

async function login(data: { email: string, password: string }) {
  const response = await api.post("/authenticate", data)

  const { user, token } = response?.data
  if (user && token) {
    sessionStorage.setItem("@flashcards/user", JSON.stringify(user));
    sessionStorage.setItem("@flashcards/token", JSON.stringify(token));
  }

  return user;
};

function logout() {
  sessionStorage.removeItem("@flashcards/user");
}

function getUser() {
  const user = sessionStorage.getItem('@flashcards/user')
  if (user) {
    return JSON.parse(user);
  }
}

function getToken() {
  const token = sessionStorage.getItem('@flashcards/token')
  if (token) {
    return JSON.parse(token);
  }
}

function isAuthenticated() {
  return Boolean(getToken() && getUser())
}

function getAuthHeader() {
  const token = getToken()

  if (token) {
    return { 'x-access-token': token };
  } else {
    return {};
  }
}


export default { login, logout, getCurrentUser: getUser, getAuthHeader, isAuthenticated };
