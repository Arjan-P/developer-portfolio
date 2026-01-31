import express from "express";
import type { Request, Response } from "express";
import {
  deletePost,
  getAllPosts,
  getPost,
  postPost,
  updatePost,
} from "../services/service.js";
import { authMiddleware } from "../middleware/auth.js";
import { uploadPostAssets } from "../middleware/upload.js";
import { uploadImageToS3 } from "../utils/s3client.js";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const postId = Number(req.params.id);
  try {
    const post = await getPost(postId);
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    await postPost(req.body);
    res.status(201).json({ message: "post added" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post("/upload", authMiddleware, uploadPostAssets, async (req: Request, res: Response) => {
  if (!req.files) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  const { title } = req.body;
  const files = req.files as { markdown?: Express.Multer.File[]; images?: Express.Multer.File[]; }
  const fileMd = files.markdown?.[0];
  const images = files.images ?? [];

  if (!fileMd) {
    return res.status(400).json({ error: "Markdown file missing" });
  }

  let contentMd = fileMd.buffer.toString('utf-8');

  const imgUrlMap = new Map<string, string>();
  if (images) {
    for (const img of images) {
      let url = await uploadImageToS3(img);
      imgUrlMap.set(img.originalname, url);
    }

    // replace absoulte paths with url to image in s3 bucket
    console.log(imgUrlMap);
    const IMAGE_REGEX = /!\[([^\]]*)\]\(([^)]+)\)/g;
    contentMd = contentMd.replace(
      IMAGE_REGEX,
      (match, alt, path) => {
        // Skip absolute URLs
        if (path.startsWith('http')) return match;

        const filename = path.split('/').pop();
        if (!filename) return match;

        const url = imgUrlMap.get(filename);
        if (!url) return match;

        return `![${alt}](${url})`;
      }
    );
  }

  try {
    await postPost({ title, contentMd });
    res.status(201).json({ message: "post added" });
  } catch (err) {
    res.status(500).json({ err });
  }
})

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  const postId = Number(req.params.id);
  const { title, content } = req.body;
  try {
    const update = await updatePost(postId, { title, content });
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  const postId = parseInt(<string>req.params.id);
  try {
    await deletePost(postId);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default router;
