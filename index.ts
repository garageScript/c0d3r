import dotenv from "dotenv";

dotenv.config();

import { config } from "./config";

import Bot from "./src/Bot";
import { app } from "./app";
import { registerCommands, registerCommandsReplies, registerEvents } from "./src/Bot/events";
export const bot = new Bot();

bot.login(config.discordToken).then(() => console.info("🤖 Bot is logged in"));

registerCommands();
registerCommandsReplies();
registerEvents();

app.listen(config.port, () => {
  console.info(`🤖 Bot is listening at :${config.port}`);
});
