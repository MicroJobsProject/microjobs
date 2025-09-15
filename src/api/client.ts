import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

client.interceptors.request.use((config) => {
  let auth = localStorage.getItem("auth");

  if (!auth) {
    auth = sessionStorage.getItem("auth");
  }

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
