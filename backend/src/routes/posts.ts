import express from "express";
import type { Request, Response } from "express";
import {postService} from "../utils/db.js"

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json(posts);
  } catch(err) {
    console.error(err);
    return res.status(500).json({"error": "could not get posts"});
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id =Number(req.params.id);
  try {
    const post = await postService.getPost(id);
    return res.status(200).json(post);
  } catch(err) {
    console.error(err);
    return res.status(500).json({"error": "could not get post"});
  }
});

export default router;
