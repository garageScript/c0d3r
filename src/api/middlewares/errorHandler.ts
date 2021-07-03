import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Incorrect Auth Token
  if (err.name === "AuthError") {
    return res.status(403).json({ error: err.message });
  }

  // Validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: err.issues.map(({ path, message }) => ({
        path: path.join("."),
        message,
      })),
    });
  }

  // Unknown Error
  return res.status(500).json({ error: err.message });
};
