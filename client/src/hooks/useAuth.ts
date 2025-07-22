import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    refetchOnWindowFocus: true,
    refetchInterval: 2000, // Check every 2 seconds for auth changes
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
