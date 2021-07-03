import { config } from "../../../config";
import { RequestHandler } from "express";

export const authorized: RequestHandler = (req, res, next) => {
  if (req.headers.authorization !== `Bearer ${config.botAccessToken}`) {
    throw { name: "AuthError", message: "Access token missing or invalid" };
  }
  next();
};
