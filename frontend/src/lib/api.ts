const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const TOKEN_KEY = "admin_token";

type RequestOptions = RequestInit & {
  skipJson?: boolean;
};

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "string"
        ? payload
        : payload?.message || "Request failed";
    throw new Error(message);
  }

  return payload;
}

export async function apiRequest(path: string, options: RequestOptions = {}) {
  const { skipJson, headers = {}, ...rest } = options;

  // Add Authorization header if token exists
  const token = getToken();
  const requestHeaders: Record<string, string> = {
    ...headers,
  };
  
  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: requestHeaders,
    ...rest,
  });

  if (skipJson) {
    return response;
  }

  return parseResponse(response);
}

// Token Management Functions
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export { API_BASE_URL };
