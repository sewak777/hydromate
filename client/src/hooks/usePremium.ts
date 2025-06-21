import { useQuery } from "@tanstack/react-query";

export function usePremium() {
  const query = useQuery({
    queryKey: ["/api/subscription"],
    retry: false,
  });

  return {
    isPremium: query.data?.isPremium || false,
    subscription: query.data?.subscription,
    isLoading: query.isLoading,
  };
}