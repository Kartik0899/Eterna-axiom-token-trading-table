import { useQuery } from "@tanstack/react-query";
import { Token, TokenCategory } from "@/lib/types";
import { generateDummyTokens } from "@/lib/constants";


// Uses React Query for caching and state management
export function useTokenData(category: TokenCategory, count?: number) {
  return useQuery<Token[]>({
    queryKey: ["tokens", category, count],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 5));
      return generateDummyTokens(category, count);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

