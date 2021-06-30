import express from "express";

export const api = express.Router();
import { config } from "../../config";
import { messages } from "./messages";
import {submissions} from "./submissions";

api.use((req, res, next) => {
  if (req.headers.authorization !== `Bearer ${config.botAccessToken}`) {
    return res.status(403).json({ error: "Access token missing or invalid" });
  }
  next();
});

api.use("/messages", messages);
api.use("/submissions", submissions);
