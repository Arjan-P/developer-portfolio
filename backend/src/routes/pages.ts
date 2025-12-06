import express from "express";
import { prisma } from "../config/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await prisma.pages.findMany();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    const post = await prisma.pages.findUnique({
      where: {
        id: postId,
      },
    });
    res.send(`<h1>${post?.title}</h1><p>${post?.content}</p>`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.post("/", async (req, res) => {
  try {
    await prisma.pages.create({
      data: req.body,
    });
    res.sendStatus(201).json({ message: "post added" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete("/:id", async (req, res) => {
  const pageId = parseInt(req.params.id);
  try {
    await prisma.pages.delete({
      where: {
        id: pageId,
      },
    });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default router;
