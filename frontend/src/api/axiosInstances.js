import { store } from "../redux/store"
import axios from "axios";
import { BASE_URL } from "../settings";

const axiosAuthInstance = axios.create({
    baseURL: BASE_URL,
});

axiosAuthInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const user = state.user;
        if (user.jwt) {
            config.headers.Authorization = user.jwt;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const axiosAuth = () => axiosAuthInstance;

export const axiosWithoutAuth = () => {
  return axios.create({
      baseURL: BASE_URL
  });
}