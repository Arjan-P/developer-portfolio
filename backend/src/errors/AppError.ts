import type { ErrorCode } from "../modules/common/response.schema.js";

export class AppError extends Error {
  public statusCode: number;
  public code: ErrorCode;

  constructor(
    message: string,
    statusCode = 500,
    code: ErrorCode = "INTERNAL_SERVER_ERROR",
  ) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}
