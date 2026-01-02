import express from "express";
import type {Request, Response} from "express";
import bcrypt from "bcrypt";
import { ENV } from "../config/env.js";
import { signToken } from "../utils/jwt.js";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { password } = req.body;
  const match = await bcrypt.compare(password, ENV.HASHED_PASSWORD);
  if (!match) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = signToken();
  res.json({ token });
});

export default router;
