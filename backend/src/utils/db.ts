import type { Post } from "@prisma/client";
import prisma from "../prisma.js";

interface PostService {
  getPost: typeof getPost;
  getPosts: typeof getPosts;
}

async function getPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany();
  return posts;
}

async function getPost(id: Post["id"]): Promise<Post | null> {
  const post = await prisma.post.findUnique({
    where: {
      id
    }
  });
  return post;
}

export default {
  getPost,
  getPosts,
} as PostService;
