import { store } from "../redux/store"
import axios from "axios";
import { BASE_URL } from "../settings";

export const axiosAuth = () => {
  const state = store.getState()
  const user = state.user; 
  if (user.jwt) {
      return axios.create({
          baseURL: BASE_URL,
          headers: { Authorization: user.jwt },
      });
  }
  console.error("axiosAuth is null: check if you are login");
  return null;
}

export const axiosWithoutAuth = () => {
  return axios.create({
      baseURL: BASE_URL
  });
}
