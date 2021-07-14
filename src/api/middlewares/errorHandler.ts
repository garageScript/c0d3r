import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

enum ErrorType {
  auth_error = "auth_error",
  validation_error = "validation_error",
  api_error = "api_error",
}

interface BotErrorBase {
  type: ErrorType;
  message: string;
}

export interface BotAuthError extends BotErrorBase {
  type: ErrorType.auth_error;
}

export interface BotValidationError extends BotErrorBase {
  type: ErrorType.validation_error;
  issues: { [key: string]: string }[];
}

export interface BotApiError extends BotErrorBase {
  type: ErrorType.api_error;
}

export type BotError = BotAuthError | BotValidationError | BotApiError;

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Unknown Error
  let status = 500;
  let error: BotError = { type: ErrorType.api_error, message: err.message };

  // Incorrect Auth Token
  if (err.name === "AuthError") {
    status = 401;
    error = { type: ErrorType.auth_error, message: err.message };
  }

  // Validation error
  if (err instanceof ZodError) {
    status = 400;
    error = {
      type: ErrorType.validation_error,
      message: "One or more fields were missing or invalid.",
      issues: err.issues.map(({ path, message }) => ({
        path: path.join("."),
        message,
      })),
    };
  }

  console.error(error);
  if (!res.headersSent) res.status(status).json(error);
};
