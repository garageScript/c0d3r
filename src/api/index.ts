import express from "express";

export const apiRouter = express.Router();
import Bot from "../Bot";
import { config } from "../../config";

const bot = new Bot();
bot.login(config.discordToken).then(() => console.info("🤖 Bot is logged in"));

apiRouter.use((req, res, next) => {
  if (req.headers.authorization !== `Bearer ${config.botAccessToken}`) {
    return res.status(403).json({ error: "Access token missing or invalid" });
  }
  next();
});

apiRouter.post("/newsubmission", async (req, res) => {
  const {
    username,
    lessonId,
    challengeTitle,
  }: { username: string; lessonId: string; challengeTitle: string } = req.body;

  if (!username || !lessonId || !challengeTitle) {
    return res
      .status(400)
      .json({ error: "username, lessonId, and challengeTitle are required" });
  }

  try {
    await bot.sendSubmissionMessage({
      username,
      lessonId,
      challengeTitle,
      lessonChannelId: config.lessonChannels[lessonId],
    });
    return res.sendStatus(200);
  } catch (e) {
    return res.status(500).json(e);
  }
});

apiRouter.post("/sendchannelmessage", async (req, res) => {
  const {
    channelId,
    message,
  }: { channelId: string; message: string } = req.body;

  if (!channelId || !message) {
    return res
      .status(400)
      .json({ error: "channelId, and message are required" });
  }

  try {
    await bot.sendChannelMessage(message, channelId);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(500).json(e);
  }
});

apiRouter.post("/senddirectmessage", async (req, res) => {
  const { userId, message }: { userId: string; message: string } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: "userId, and message are required" });
  }

  try {
    await bot.sendDirectMessage(message, userId);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(500).json(e);
  }
});
