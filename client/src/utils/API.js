import axios from "axios";
import { storageKey } from "../hooks/useAuth";

const customAxios = axios.create();

const requestHandler = request => {
  const token = localStorage.getItem(storageKey);
  if (token) {
    request.headers.token = token;
  }

  return request;
};

const responseHandler = response => {
  if (response.status === 401) {
    window.location = '/login';
  }

  return response;
};

const errorHandler = error => {
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default {
  register: (data) => customAxios.post("/auth/register", data),
  login: (data) => customAxios.post("/auth/login", data),
  loadUser: () => customAxios.get("/auth/user"),
  getRecipes: () => customAxios.get('/recipe'),
  saveRecipe: (data) => customAxios.post('/recipe', data),
  removeRecipe: (id) => customAxios.delete(`/recipe/${id}`),
  addMessage: (id, data) => customAxios.post(`/recipe/${id}/message`, data),
  getMessages: (id) => customAxios.get(`/recipe/${id}/message`),
};