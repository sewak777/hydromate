import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  // Debug logging in development
  if (import.meta.env.DEV) {
    console.log('🔍 useAuth Debug:', {
      user: user ? 'exists' : 'missing',
      isLoading,
      error: error ? 'exists' : 'none',
      isAuthenticated: !!user
    });
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
