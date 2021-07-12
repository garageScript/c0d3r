import express from "express";
import { bot } from "../../../index";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import { SubmissionNotificationValidator } from "../middlewares/validators";
import { sendMessageDetailsIfIncluded } from "../utils/sendMessageDetailsIfIncluded";
import { SubmissionNotification } from "../zodSchemas/SubmissionNotification";

export const submissions = express.Router();

submissions.post(
  "/notifications",
  SubmissionNotificationValidator,
  asyncErrorHandler(async (req, res) => {
    const { includeDetails }: SubmissionNotification = req.body;
    const botPromise = bot.sendSubmissionNotification(req.body);
    await sendMessageDetailsIfIncluded(includeDetails, botPromise, res);
  })
);
