import express from "express";
import {
  deletePost,
  getAllPosts,
  getPost,
  postPost,
  updatePost,
} from "../services/service.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    const post = await getPost(postId);
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    await postPost(req.body);
    res.status(201).json({ message: "post added" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const postId = parseInt(<string>req.params.id);
  const { title, content } = req.body;
  try {
    const update = await updatePost(postId, { title, content });
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const postId = parseInt(<string>req.params.id);
  try {
    await deletePost(postId);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default router;
