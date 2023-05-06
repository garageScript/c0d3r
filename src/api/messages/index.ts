import express from "express";
import { bot } from "../../../index";
import {
  ChannelMessageValidator,
  DirectMessageValidator,
} from "../middlewares/validators";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import { ChannelMessage } from "../zodSchemas/ChannelMessage";
import { DirectMessage } from "../zodSchemas/DirectMessage";
import { config } from "../../../config";
import { sendMessageDetailsIfIncluded } from "../utils/sendMessageDetailsIfIncluded";
import { EmbedBuilder } from "discord.js";

export const messages = express.Router();

messages.post(
  "/channel/:id",
  ChannelMessageValidator,
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { message, embed, includeDetails }: ChannelMessage = req.body;
    const botPromise = bot.sendChannelMessage(
      message,
      id,
      new EmbedBuilder(embed)
    );
    await sendMessageDetailsIfIncluded(includeDetails, botPromise, res);
  })
);

messages.post(
  "/lessonChannel/:lessonId",
  ChannelMessageValidator,
  asyncErrorHandler(async (req, res) => {
    const { lessonId } = req.params;
    const { message, embed, includeDetails }: ChannelMessage = req.body;
    const botPromise = bot.sendChannelMessage(
      message,
      config.lessonChannels[lessonId],
      new EmbedBuilder(embed)
    );
    await sendMessageDetailsIfIncluded(includeDetails, botPromise, res);
  })
);

messages.post(
  "/direct/:userId",
  DirectMessageValidator,
  asyncErrorHandler(async (req, res) => {
    const { userId } = req.params;
    const { message, embed, includeDetails }: DirectMessage = req.body;
    const botPromise = bot.sendDirectMessage(
      message,
      userId,
      new EmbedBuilder(embed)
    );
    await sendMessageDetailsIfIncluded(includeDetails, botPromise, res);
  })
);
