import express from "express";
import { api } from "./src/api";
import { errorHandler } from "./src/api/middlewares/errorHandler";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send('<a href="https://c0d3.com">Become a software engineer!</a>');
});

app.use("/api", api);

app.use(errorHandler);
