import express from "express";

import { getProjectsHandler } from "./projects.controller.js";

const router = express.Router();

router.get("/", getProjectsHandler);

export default router;
