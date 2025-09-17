//NATIVE
import storage from "../../utils/storage";
import {
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from "../../api/client";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  expiresIn?: number;
}

export async function login(
  credentials: LoginCredentials,
  rememberMe: boolean = false,
): Promise<LoginResponse> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data: LoginResponse = await response.json();
    const { accessToken, refreshToken } = data;

    storage.setAuth(accessToken, rememberMe);

    if (refreshToken) {
      storage.setRefreshToken(refreshToken, rememberMe);
    }

    setAuthorizationHeader(accessToken);

    if (import.meta.env.DEV) {
      console.log("Session saved:", storage.getSessionInfo());
    }

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Login failed");
  }
}

export async function logout(): Promise<void> {
  try {
    const token = storage.getAuth();

    if (token) {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    storage.clearAuth();
    removeAuthorizationHeader();

    if (import.meta.env.DEV) {
      console.log("Session cleared");
    }
  }
}

export async function initializeAuth(): Promise<boolean> {
  const token = storage.getAuth();

  if (!token) return false;

  try {
    const response = await fetch("/api/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setAuthorizationHeader(token);
      return true;
    } else {
      storage.clearAuth();
      return false;
    }
  } catch (error) {
    console.error("Auth initialization error:", error);
    setAuthorizationHeader(token);
    return true;
  }
}

export async function refreshToken(): Promise<string | null> {
  const refreshToken = storage.getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    const data = await response.json();
    const { accessToken } = data;

    const rememberMe = storage.isRememberMeActive();
    storage.setAuth(accessToken, rememberMe);
    setAuthorizationHeader(accessToken);

    return accessToken;
  } catch (error) {
    await logout();
    throw error;
  }
}
