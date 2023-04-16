import { ZodSchema } from "zod";
import { RequestHandler } from "express";

export const validatorFactory =
  (schema: ZodSchema<any>): RequestHandler =>
  (req, res, next) => {
    req.body = schema.parse(req.body);
    next();
  };
