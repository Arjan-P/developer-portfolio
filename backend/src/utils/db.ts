import type { Post } from "@prisma/client";
import prisma from "../prisma.js";

interface PostService {
  postPost: typeof postPost;
  getPost: typeof getPost;
  getPosts: typeof getPosts;
  deletePost: typeof deletePost;
}

async function postPost(post: {title: string; content: string}): Promise<void> {
  await prisma.post.create({
    data: post
  })
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

async function deletePost(id: Post["id"]): Promise<void> {
  await prisma.post.delete({
    where: {
      id
    }
  });
}

export default {
  postPost,
  getPost,
  getPosts,
  deletePost
} as PostService;
