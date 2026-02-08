import { post } from "./api";

export interface User {
  _id: string;
  name: string;
  email?: string;
  rollNumber?: string;
  gender?: string;
  role?: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email?: string;
  rollNumber?: string;
  gender?: string;
  token: string;
  role?: string;
}

export interface LoginPayload {
  email?: string;
  rollNumber?: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const AuthService = {
  // Register a new user
  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const response = await post<AuthResponse>("/auth/register", data);
    if (response.token) {
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("token", response.token);
    }
    return response;
  },

  // Login existing user (supports email or roll number)
  login: async (data: LoginPayload): Promise<AuthResponse> => {
    const response = await post<AuthResponse>("/auth/login", data);
    if (response.token) {
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("token", response.token);
    }
    return response;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login"; // Force redirect
  },

  // Get current user from storage
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  // Check if authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },
};
