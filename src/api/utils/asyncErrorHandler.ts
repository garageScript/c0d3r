import { RequestHandler } from "express";
import {
  NextFunction,
  ParamsDictionary,
  Query,
  Request,
  Response,
} from "express-serve-static-core";

export const asyncErrorHandler = (fn: RequestHandler) => (
  req: Request<ParamsDictionary, any, any, Query>,
  res: Response,
  next: NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next);
