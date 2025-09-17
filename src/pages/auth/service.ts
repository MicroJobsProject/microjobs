import {
  client,
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";
import type { Login, Credentials } from "./types";

export async function register(credentials: {
  username: string;
  email: string;
  password: string;
}) {
  const { data } = await client.post("/api/auth/register", credentials);
  const { accessToken } = data;
  storage.set("auth", accessToken);
  setAuthorizationHeader(accessToken);
  return data;
}

export const login = async (credentials: Credentials) => {
  const response = await client.post<Login>("/api/auth/login", credentials);
  const { accessToken } = response.data;
  storage.set("auth", accessToken);
  setAuthorizationHeader(accessToken);
};

export const logout = async () => {
  storage.remove("auth");
  removeAuthorizationHeader();
};
