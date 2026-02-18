import express from "express";
import type { Request, Response } from "express";
import service from "../utils/db.js"

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = service.getPosts();
    return res.status(200).json(posts);
  } catch(err) {
    return res.status(500).json({"error": "could not get posts"});
    console.error(err);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  if(typeof id !== "number") {
    return res.status(404).json({"error": "invalid post id"});
  }
  try {
    const post = service.getPost(id);
    return res.status(200).json(post);
  } catch(err) {
    return res.status(500).json({"error": "could not get post"});
    console.error(err);
  }
});

export default router;
