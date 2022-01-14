import axios from "axios";

const todoAPI = axios.create({
  baseURL: "https://api-rt-todo.herokuapp.com/app",
});

export default todoAPI;
