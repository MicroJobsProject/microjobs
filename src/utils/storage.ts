/* type StorageKey = "auth";
type StorageType = "local" | "session";

export default {
  get(key: StorageKey, storageType: StorageType = "local") {
    const storage = storageType === "local" ? localStorage : sessionStorage;
    const value = storage.getItem(key);
    return value ?? null;
  },

  set(key: StorageKey, value: string, storageType: StorageType = "local") {
    const storage = storageType === "local" ? localStorage : sessionStorage;
    storage.setItem(key, value);
  },

  remove(key: StorageKey) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
    sessionStorage.clear();
  },
};
 */

import Cookies from "js-cookie";

type StorageKey = "auth" | "refreshToken" | "rememberMe";

export default {
  setAuth(token: string, rememberMe: boolean = false) {
    if (rememberMe) {
      const days = parseInt(
        import.meta.env.VITE_REMEMBER_ME_DURATION_DAYS || "30",
      );

      Cookies.set("auth", token, {
        expires: days,
        secure: import.meta.env.PROD,
        sameSite: "Lax",
      });

      Cookies.set("rememberMe", "true", {
        expires: days,
        secure: import.meta.env.PROD,
        sameSite: "Lax",
      });
    } else {
      sessionStorage.setItem("auth", token);
      this.removeCookieAuth();
    }
  },

  getAuth(): string | null {
    const sessionToken = sessionStorage.getItem("auth");
    if (sessionToken) return sessionToken;

    const cookieToken = Cookies.get("auth");
    return cookieToken || null;
  },

  isRememberMeActive(): boolean {
    return Cookies.get("rememberMe") === "true";
  },

  setRefreshToken(token: string, rememberMe: boolean = false) {
    if (rememberMe) {
      const days = parseInt(
        import.meta.env.VITE_REFRESH_TOKEN_DURATION_DAYS || "7",
      );
      Cookies.set("refreshToken", token, {
        expires: days,
        secure: import.meta.env.PROD,
        sameSite: "Lax",
      });
    } else {
      sessionStorage.setItem("refreshToken", token);
    }
  },

  getRefreshToken(): string | null {
    const sessionToken = sessionStorage.getItem("refreshToken");
    if (sessionToken) return sessionToken;

    const cookieToken = Cookies.get("refreshToken");
    return cookieToken || null;
  },

  removeCookieAuth() {
    Cookies.remove("auth");
    Cookies.remove("rememberMe");
    Cookies.remove("refreshToken");
  },

  clearAuth() {
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("refreshToken");

    this.removeCookieAuth();
  },

  hasAuth(): boolean {
    return this.getAuth() !== null;
  },

  getSessionInfo() {
    return {
      hasAuth: this.hasAuth(),
      isRemembered: this.isRememberMeActive(),
      authToken: this.getAuth(),
      refreshToken: this.getRefreshToken(),
      storageType: this.isRememberMeActive() ? "cookie" : "session",
    };
  },

  get(key: StorageKey, storageType?: "local" | "session"): string | null {
    if (key === "auth") return this.getAuth();
    if (key === "refreshToken") return this.getRefreshToken();
    if (key === "rememberMe") return this.isRememberMeActive() ? "true" : null;

    if (storageType === "session") {
      return sessionStorage.getItem(key);
    }
    return Cookies.get(key) || null;
  },

  set(
    key: StorageKey,
    value: string,
    storageType: "local" | "session" = "local",
  ) {
    if (storageType === "session") {
      sessionStorage.setItem(key, value);
    } else {
      const days = parseInt(
        import.meta.env.VITE_DEFAULT_COOKIE_DURATION_DAYS || "30",
      );
      Cookies.set(key, value, {
        expires: days,
        secure: import.meta.env.PROD,
        sameSite: "Lax",
      });
    }
  },

  remove(key: StorageKey) {
    sessionStorage.removeItem(key);
    Cookies.remove(key);
  },

  clear() {
    sessionStorage.clear();
    this.removeCookieAuth();
  },
};
