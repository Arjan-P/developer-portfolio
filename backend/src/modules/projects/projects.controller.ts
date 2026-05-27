import type { Request, Response } from "express";

import { projectsService } from "./projects.service.js";

import { asyncHandler } from "../../middleware/async-handler.js";

import { ok } from "../../utils/response.js";

export const getProjectsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const projects = await projectsService.getProjects();

    return res.status(200).json(ok(projects));
  },
);
