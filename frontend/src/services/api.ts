import { toast } from "sonner";

// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// Generic fetch wrapper with error handling
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // Automatically attach Authorization token if it exists
  const token = localStorage.getItem("token");
  if (token) {
    if (config.headers instanceof Headers) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error || `HTTP error! status: ${response.status}`;

      toast.error("Request Failed", {
        description: errorMessage,
      });

      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error: unknown) {
    // Catch network errors (like server down) that throw TypeError: Failed to fetch
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      toast.error("Network Error", {
        description: "Could not connect to the server. Please check your internet connection.",
      });
    }

    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}

// GET request
export function get<T>(endpoint: string): Promise<T> {
  return fetchAPI<T>(endpoint, { method: "GET" });
}

// POST request
export function post<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchAPI<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// PUT request
export function put<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchAPI<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE request
export function del<T>(endpoint: string): Promise<T> {
  return fetchAPI<T>(endpoint, { method: "DELETE" });
}

// Health check
export function checkHealth() {
  return get<{ status: string; message: string; timestamp: string }>("/health");
}

export { API_BASE_URL };
