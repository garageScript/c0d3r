import express from "express";
import { bot } from "../../../index";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import { SubmissionNotificationValidator } from "../middlewares/validators";

export const submissions = express.Router();

submissions.post(
  "/notifications",
  SubmissionNotificationValidator,
  asyncErrorHandler(async (req, res) => {
    const { id: messageId } = await bot.sendSubmissionNotification(req.body);
    return res.status(200).json({ id: messageId });
  })
);
