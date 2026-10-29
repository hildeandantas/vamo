import { createContext, use, type ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { ApiError } from '@/lib/api';
import { authRequest, type AuthBootstrap, type AuthUser } from '@/lib/auth';

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const meKey = ['auth', 'me'] as const;

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: meKey,
    queryFn: async ({ signal }) => {
      try {
        const { user } = await authRequest<{ user: AuthUser }>('me', { signal });
        return user;
      } catch (error) {
        // 401 simply means "signed out"; any other error should surface.
        if (error instanceof ApiError && error.status === 401) return null;
        throw error;
      }
    },
    retry: false,
  });

  function setUser(user: AuthUser | null) {
    queryClient.setQueryData(meKey, user);
  }

  async function logout() {
    const { csrf } = await authRequest<AuthBootstrap>('bootstrap');
    await authRequest('logout', {
      method: 'POST',
      headers: { 'x-vamo-csrf': csrf },
      body: '{}',
    });
    setUser(null);
  }

  return (
    <AuthContext value={{ user: data ?? null, loading: isPending, setUser, logout }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const context = use(AuthContext);
  if (!context) throw new Error('useAuth requires AuthProvider');
  return context;
}
