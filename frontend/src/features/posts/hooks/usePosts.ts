import { useQuery } from "@tanstack/react-query";

import { getPosts } from "@/api/posts.api";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
}
