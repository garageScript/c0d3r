import dotenv from "dotenv";

dotenv.config();

import express from "express";
import { apiRouter } from "./src/api";
import { config } from "./config";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<a href="https://c0d3.com">Become a software engineer!</a>');
});

app.use("/api", apiRouter);

app.listen(config.port, () => {
  console.info(`🤖 Bot is listening at :${config.port}`);
});
