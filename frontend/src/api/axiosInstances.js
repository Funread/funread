import { store } from "../redux/store"
import axios from "axios";
import { BASE_URL, LOGIN_PATH } from "../settings";
import { deleteUser } from "../redux/userSlice";

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

// Single-shot session expired handling to avoid multiple redirects
let _isHandlingSessionExpired = false;
axiosAuthInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error && error.response && error.response.status === 401) {
            try {
                if (!_isHandlingSessionExpired) {
                    _isHandlingSessionExpired = true;
                    // clear auth state
                    store.dispatch(deleteUser());
                    // build return url and avoid loops when already on the login path
                    const currentPath = window.location.pathname + window.location.search;
                    const loginPath = LOGIN_PATH || '/';
                    // if login path is root, just redirect to root without returnUrl
                    if (loginPath === '/') {
                        window.location.replace('/');
                    } else {
                        if (!currentPath.startsWith(loginPath)) {
                            const redirect = `${loginPath}?returnUrl=${encodeURIComponent(currentPath)}`;
                            // use replace to avoid creating history entries
                            window.location.replace(redirect);
                        } else {
                            _isHandlingSessionExpired = false;
                        }
                    }
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error('Error handling session expired', e);
            }
        }
        return Promise.reject(error);
    }
);

export const axiosAuth = () => axiosAuthInstance;

export const axiosWithoutAuth = () => {
  return axios.create({
      baseURL: BASE_URL
  });
}