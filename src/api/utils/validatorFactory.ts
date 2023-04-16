import { ZodSchema } from "zod";
import { RequestHandler } from "express";

export const validatorFactory =
  (schema: ZodSchema): RequestHandler =>
  (req, _res, next) => {
    req.body = schema.parse(req.body);
    next();
  };
