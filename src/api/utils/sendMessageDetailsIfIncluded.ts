import { Message } from "discord.js";
import { Response } from "express";

export const sendMessageDetailsIfIncluded = async (
  includeDetails: boolean,
  botPromise: Promise<Message>,
  res: Response
) => {
  if (!includeDetails) {
    res.status(202).json({ status: "sending" });
  }
  const { id } = await botPromise;
  if (!res.headersSent) res.status(201).json({ id });
};
