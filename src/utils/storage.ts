type StorageKey = "auth";
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
