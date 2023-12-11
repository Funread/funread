import { store } from "../redux/store"
import axios from "axios";

export const axiosAuth = () => {
  const state = store.getState()
  const user = state.user; 
  if (user.jwt) {
      return axios.create({
          baseURL: "http://localhost:8000/",
          headers: { Authorization: user.jwt },
      });
  }
  console.error("axiosAuth is null: check if you are login");
  return null;
}

export const axiosWithoutAuth = () => {
  return axios.create({
      baseURL: "http://localhost:8000/"
  });
}
