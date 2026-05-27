import type { Request, Response } from "express";

import { postsService } from "./posts.service.js";

import { asyncHandler } from "../../middleware/async-handler.js";

import { AppError } from "../../errors/index.js";

import { ok } from "../../utils/response.js";

export const getPostsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const posts = await postsService.getPosts();

    return res.status(200).json(ok(posts));
  },
);

export const getPostHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const post = await postsService.getPost(id);

    if (!post) {
      throw new AppError("post not found", 404, "NOT_FOUND");
    }

    return res.status(200).json(ok(post));
  },
);

export const createPostHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, content } = req.body;

    const post = await postsService.createPost({
      title,
      content,
    });

    return res.status(201).json(ok(post, "post created"));
  },
);

export const deletePostHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    await postsService.deletePost(id);

    return res.status(200).json(ok(null, "post deleted"));
  },
);
