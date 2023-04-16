import { RequestHandler } from "express";
import { NextFunction, Request, Response } from "express-serve-static-core";

export const asyncErrorHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
