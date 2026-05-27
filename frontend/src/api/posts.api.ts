import { api } from "./client";

import type { SuccessResponse } from "./response";

import type { Post } from "@/features/posts/types";

export async function getPosts() {
  const res = await api.get<SuccessResponse<Post[]>>(
    "/posts",
  );

  return res.data.data;
}

export async function getPost(id: string) {
  const res = await api.get<SuccessResponse<Post>>(
    `/posts/${id}`,
  );

  return res.data.data;
}
