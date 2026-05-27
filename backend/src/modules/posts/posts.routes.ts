import express from "express";

import {
  createPostHandler,
  deletePostHandler,
  getPostHandler,
  getPostsHandler,
} from "./posts.controller.js";

const router = express.Router();

router.get("/", getPostsHandler);

router.get("/:id", getPostHandler);

router.post("/", createPostHandler);

router.delete("/:id", deletePostHandler);

export default router;
