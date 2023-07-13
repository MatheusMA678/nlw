import axios from "axios";

export const api = axios.create({
  baseURL: "https://spacetime-api.vercel.app/",
});
