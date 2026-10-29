type ApiPayload<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

export function requestApi(url: string, init?: RequestInit): Promise<void>;
export function requestApi<T>(url: string, init?: RequestInit): Promise<T>;
export async function requestApi<T>(
  url: string,
  init?: RequestInit,
): Promise<T | void> {
  const response = await fetch(url, {
    ...init,
    credentials: "same-origin",
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiPayload<T>
    | null;
  if (!response.ok || !payload?.success) {
    throw new ApiError(
      payload?.message || "Something went wrong. Please try again.",
      response.status,
    );
  }
  return payload.data;
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export function displayDate(value?: string) {
  if (!value) return "Not saved yet";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Recently updated"
    : `Updated ${date.toLocaleDateString()}`;
}
