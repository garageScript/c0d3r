import { MessageEvent } from "./index";
import { config } from "../../../config";
import { Events, MessageType } from "discord.js";

export const message: MessageEvent = {
  name: Events.MessageCreate,
  execute: (message) => {
    if (
      message.channel.id === config.channels.welcome &&
      message.type === MessageType.UserJoin
    ) {
      message.react("👋");
    }
  },
};
