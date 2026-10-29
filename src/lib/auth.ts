import { apiRequest } from '@/lib/api';

/** Same contracts as `vamo-prototype-v2/lib/auth.ts`. */
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: 'client';
};

export type AuthBootstrap = {
  csrf: string;
  nonce: string;
  googleClientId: string | null;
};

export function authRequest<T>(path: string, options: RequestInit = {}) {
  return apiRequest<T>(`auth/${path}`, options);
}
