export const ERROR_CODES = [
  // Generic
  "NOT_FOUND",
  "VALIDATION_ERROR",
  "INTERNAL_SERVER_ERROR",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

export interface ErrorResponse {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
    details?: unknown;
  };
}
