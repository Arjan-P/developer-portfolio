import express from "express";
import {
  deletePost,
  getAllPosts,
  getPost,
  postPost,
} from "../services/service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    const post = await getPost(postId);
    res.send(`<h1>${post?.title}</h1><p>${post?.content}</p>`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.post("/", async (req, res) => {
  try {
    await postPost(req.body);
    res.status(201).json({ message: "post added" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete("/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    await deletePost(postId);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default router;
