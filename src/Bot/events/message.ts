import { MessageEvent } from "./index";
import { config } from "../../../config";

export const message: MessageEvent = {
  name: "message",
  execute: (message) => {
    if (
      message.channel.id === config.channels.welcome &&
      message.type === "GUILD_MEMBER_JOIN"
    ) {
      message.react("👋");
    }
  },
};
