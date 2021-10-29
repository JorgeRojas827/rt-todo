import axios from "axios";

const todoAPI = axios.create({
  baseURL: "http://localhost:4000/app",
});

export default todoAPI;
