import type { Post } from "@prisma/client";
import prisma from "../../prisma.js";
import type { CreatePostInput } from "./posts.schema.js";

async function getPosts(): Promise<Post[]> {
  return prisma.post.findMany();
}

async function getPost(id: Post["id"]): Promise<Post | null> {
  return prisma.post.findUnique({
    where: {
      id,
    },
  });
}

async function createPost(data: CreatePostInput): Promise<Post> {
  return prisma.post.create({
    data,
  });
}

async function deletePost(id: Post["id"]): Promise<void> {
  await prisma.post.delete({
    where: {
      id,
    },
  });
}

export const postsService = {
  getPosts,
  getPost,
  createPost,
  deletePost,
};
