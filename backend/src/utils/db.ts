import type { Post, Projects } from "@prisma/client";
import prisma from "../prisma.js";

interface PostService {
  getPost: typeof getPost;
  getPosts: typeof getPosts;
  postPost: typeof postPost;
  deletePost: typeof deletePost;
}

interface ProjectsService {
  getProjects: typeof getProjects;
}

async function getProjects(): Promise<Projects[]> {
  const projects = await prisma.projects.findMany();
  return projects
}

async function postPost(post: {title: string; content: string}): Promise<void> {
  console.log(post.content);
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

export const projectService: ProjectsService = {
  getProjects
}

export const postService: PostService = {
  getPost,
  getPosts,
  postPost,
  deletePost
};
