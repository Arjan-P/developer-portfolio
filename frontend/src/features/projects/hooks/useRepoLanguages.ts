import { useQuery } from "@tanstack/react-query";

import { getRepoLanguages } from "@/api/github.api";

export function useRepoLanguages(owner?: string, repo?: string) {
  return useQuery({
    queryKey: ["github-languages", owner, repo],

    queryFn: async () => {
      if (!owner || !repo) {
        throw new Error("Missing repository info");
      }

      return getRepoLanguages(owner, repo);
    },

    enabled: !!owner && !!repo,

    staleTime: Infinity,
  });
}
