const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

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
  const { skipJson, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers,
    ...rest,
  });

  if (skipJson) {
    return response;
  }

  return parseResponse(response);
}

export { API_BASE_URL };
