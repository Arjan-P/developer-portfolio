import type { NextFunction, Request, Response } from "express";

import { Prisma } from "@prisma/client";

import { AppError } from "../errors/index.js";

import { fail } from "../utils/response.js";

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  // AppError
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json(fail(err.code ?? "INTERNAL_SERVER_ERROR", err.message));
  }

  // Prisma known errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2025":
        return res.status(404).json(fail("NOT_FOUND", "resource not found"));

      case "P2002":
        return res
          .status(409)
          .json(fail("VALIDATION_ERROR", "duplicate field value", err.meta));
    }
  }

  // fallback
  return res
    .status(500)
    .json(fail("INTERNAL_SERVER_ERROR", "internal server error"));
}
