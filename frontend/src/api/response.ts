export type ErrorCode =
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "INTERNAL_SERVER_ERROR";

export interface ErrorResponse {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
    details?: unknown;
  };
}

export type SuccessResponse<T> = {
  success: true;
  data: T;
  meta?: {
    message?: string;
  };
};
