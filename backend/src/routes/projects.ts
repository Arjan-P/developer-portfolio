import express from "express";
import type { Request, Response } from "express";
import {projectService} from "../utils/db.js"

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await projectService.getProjects();
    return res.status(200).json(posts);
  } catch(err) {
    console.error(err);
    return res.status(500).json({"error": "could not get projects"});
  }
});

export default router;
