import axios from "axios";

const API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:3000/api";

export interface UserRegisterData {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export interface ApiError {
  response?: {
    data: {
      error?: string;
      errors?: {
        username?: string;
        email?: string;
        password?: string;
      };
    };
    status: number;
  };
  message: string;
}

/**
 * CONFIG. AXIOS
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (
  userData: UserRegisterData,
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(
      "/auth/register",
      userData,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Unknown error when registering user");
  }
};

export default api;
