import { prisma } from "../config/prisma.js";

export function getAllPosts() {
  return prisma.pages.findMany();
}

export function getPost(postId: number) {
  return prisma.pages.findUnique({
    where: {
      id: postId,
    },
  });
}

export function postPost(data: { title: string; content: string }) {
  return prisma.pages.create({ data });
}

export function updatePost(
  id: number,
  data: { title: string; content: string },
) {
  return prisma.pages.update({
    where: { id },
    data,
  });
}

export function deletePost(postId: number) {
  return prisma.pages.delete({ where: { id: postId } });
}
