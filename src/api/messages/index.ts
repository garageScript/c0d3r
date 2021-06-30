import express from "express";
import { bot } from "../../../index";
import { MessageEmbed } from "discord.js";

export const messages = express.Router();

messages.post("/channel/:id", async (req, res) => {
  const { id } = req.params;
  const { message, embed }: { message: string; embed?: MessageEmbed } = req.body;

  if (!message && !embed) {
    return res
      .status(400)
      .json({ error: "At least one of message or embed is required" });
  }

  try {
    const { id: messageId } = await bot.sendChannelMessage(message, id, embed);
    return res.status(200).json({ id: messageId });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

messages.post("/direct/:userId", async (req, res) => {
  const { userId } = req.params;
  const { message, embed }: { message: string; embed?: MessageEmbed } = req.body;

  if (!message && !embed) {
    return res
        .status(400)
        .json({ error: "At least one of message or embed is required" });
  }

  try {
    const { id } = await bot.sendDirectMessage(message, userId, embed);
    return res.status(200).json({ id });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});
