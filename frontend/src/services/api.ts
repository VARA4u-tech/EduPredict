// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`,
      );
    }

    return response.json();
  } catch (error) {
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
