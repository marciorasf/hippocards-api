import api from "./api"

async function login(data: { email: string, password: string }) {
  const response = await api.post("/authenticate", data)

  const { user, token } = response?.data
  if (user && token) {
    localStorage.setItem("@flashcards/user", JSON.stringify(user));
    localStorage.setItem("@flashcards/token", JSON.stringify(token));
  }

  return user;
};

function logout() {
  localStorage.removeItem("@flashcards/user");
}

function getUser() {
  const user = localStorage.getItem('@flashcards/user')
  if (user) {
    return JSON.parse(user);
  }
}

function getToken() {
  const token = localStorage.getItem('@flashcards/token')
  if (token) {
    return JSON.parse(token);
  }
}

function isAuthenticated() {
  return Boolean(getToken())
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
