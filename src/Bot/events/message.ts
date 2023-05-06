import { MessageEvent } from "./index";
import { config } from "../../../config";
import { MessageType } from "discord.js";

export const message: MessageEvent = {
  name: "message",
  execute: (message) => {
    if (
      message.channel.id === config.channels.welcome &&
      message.type === MessageType.UserJoin
    ) {
      message.react("👋");
    }
  },
};
