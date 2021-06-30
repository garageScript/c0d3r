import dotenv from "dotenv";

dotenv.config();

import express from "express";
import { api } from "./src/api";
import { config } from "./config";

import Bot from "./src/Bot";
export const bot = new Bot();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<a href="https://c0d3.com">Become a software engineer!</a>');
});

app.use("/api", api);

bot.login(config.discordToken).then(() => console.info("🤖 Bot is logged in"));
app.listen(config.port, () => {
  console.info(`🤖 Bot is listening at :${config.port}`);
});
