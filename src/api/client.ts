import axios from "axios";
import storage from "../utils/storage";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

client.interceptors.request.use((config) => {
  const auth = storage.getAuth();

  if (auth) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${auth}`;
  } else {
    delete config.headers?.["Authorization"];
  }
  return config;
});

export const setAuthorizationHeader = (accessToken: string) => {
  client.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
};

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers["Authorization"];
};
