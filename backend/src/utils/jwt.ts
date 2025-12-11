import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const SECRET = ENV.JWT_SECRET;

export function signToken() {
  return jwt.sign({ data: ENV.HASHED_PASSWORD }, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
