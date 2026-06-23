export class ClientFetchError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "ClientFetchError";
  }
}

export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new ClientFetchError(
      body?.error ?? `Request failed with status ${response.status}`,
      response.status
    );
  }

  return response.json() as Promise<T>;
}
