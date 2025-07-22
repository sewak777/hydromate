import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    refetchOnWindowFocus: false, // Disable refetch on focus to reduce flickering
    refetchInterval: false, // Disable automatic refetch
    staleTime: 30000, // Keep data fresh for 30 seconds
  });

  // Debug logging removed to prevent UI flickering

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
