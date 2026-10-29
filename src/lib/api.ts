/**
 * HTTP client for the Vamo backend (Nest, `vamo-backend-prototype-v2`).
 * On the web the Next app proxies `/api/*`; on mobile we call the backend directly.
 * Native fetch keeps the session cookies set by the backend (credentials: 'include').
 */

const baseUrl = (process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3001').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/${path.replace(/^\//, '')}`, {
      ...options,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
  } catch {
    throw new ApiError('Não conseguimos conectar. Confira sua conexão e tente novamente.', 0);
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      typeof data?.message === 'string'
        ? data.message
        : 'O serviço está indisponível por enquanto. Tente novamente em instantes.';
    throw new ApiError(message, response.status);
  }
  return data as T;
}
