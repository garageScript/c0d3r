import express from "express";
import { bot } from "../../../index";
import {
  ChannelMessageValidator,
  DirectMessageValidator,
} from "../middlewares/validators";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import { ChannelMessage } from "../zodSchemas/ChannelMessage";
import { DirectMessage } from "../zodSchemas/DirectMessage";

export const messages = express.Router();

messages.post(
  "/channel/:id",
  ChannelMessageValidator,
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { message, embed }: ChannelMessage = req.body;

    const { id: messageId } = await bot.sendChannelMessage(message, id, embed);
    return res.status(201).json({ id: messageId });
  })
);

messages.post(
  "/direct/:userId",
  DirectMessageValidator,
  asyncErrorHandler(async (req, res) => {
    const { userId } = req.params;
    const { message, embed }: DirectMessage = req.body;

    const { id } = await bot.sendDirectMessage(message, userId, embed);
    return res.status(201).json({ id });
  })
);
