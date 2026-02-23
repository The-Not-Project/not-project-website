type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  status: number;
};

type FetchOptions = Omit<RequestInit, "body"> & {
  params?: Record<string, string | number | string[] | undefined>;
  body?: any;
};

export async function internalApiFetch<T>(
  endpoint: string,
  { params, body, ...options }: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const baseUrl = process.env.INTERNAL_API_URL;
  const apiKey = process.env.INTERNAL_API_KEY;

  if (!apiKey) {
    return { data: null, error: "Internal Configuration Error: Missing API Key", status: 500 };
  }

  const url = new URL(
    `${baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`,
  );

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const headers = new Headers(options.headers);

  headers.set("x-api-key", apiKey);


  if (body && !(body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(url.toString(), {
      ...options,
      headers,
      body: !body ? undefined : (body instanceof FormData ? body : JSON.stringify(body)),
    });

    const status = response.status;

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        data: null,
        error: errorData.error || `API Error: ${status}`,
        status,
      };
    }

    const data = await response.json();
    return { data, error: null, status };
  } catch (err) {
    return { data: null, error: "Connection failed", status: 500 };
  }
}
