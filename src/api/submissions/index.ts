import express from "express";
import { bot } from "../../../index";
import { config } from "../../../config";
import { IdType } from "../../Bot";

export const submissions = express.Router();

submissions.post("/notifications", async (req, res) => {
  const {
    idType,
    id,
    lessonId,
    challengeTitle,
  }: {
    idType: IdType;
    id: string;
    lessonId: string;
    challengeTitle: string;
  } = req.body;

  if (!idType || !id) {
    return res
      .status(400)
      .json({ error: "A user id type and id are required" });
  }

  if (!lessonId || !challengeTitle) {
    return res
      .status(400)
      .json({ error: "lessonId, and challengeTitle are required" });
  }

  try {
    const { id: messageId } = await bot.sendSubmissionNotification({
      idType,
      id,
      lessonId,
      challengeTitle,
      lessonChannelId: config.lessonChannels[lessonId],
    });
    return res.status(200).json({ id: messageId });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});
