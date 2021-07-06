import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

enum ErrorType {
  auth_error = "auth_error",
  validation_error = "validation_error",
  api_error = "api_error",
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Incorrect Auth Token
  if (err.name === "AuthError") {
    return res
      .status(401)
      .json({ error: { type: ErrorType.auth_error, message: err.message } });
  }

  // Validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        type: ErrorType.validation_error,
        message: "One or more fields were missing or invalid.",
        issues: err.issues.map(({ path, message }) => ({
          path: path.join("."),
          message,
        })),
      },
    });
  }

  // Unknown Error
  return res
    .status(500)
    .json({ error: { type: ErrorType.api_error, message: err.message } });
};
