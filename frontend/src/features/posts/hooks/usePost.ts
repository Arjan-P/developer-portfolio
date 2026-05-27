import { useQuery } from "@tanstack/react-query";

import { getPost } from "@/api/posts.api";

export function usePost(id: string) {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
    enabled: !!id,
  });
}
