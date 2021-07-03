import express from "express";

import { authorized } from "./middlewares/authorized";
import { messages } from "./messages";
import { submissions } from "./submissions";

export const api = express.Router();

api.use(authorized);

api.use("/messages", messages);
api.use("/submissions", submissions);
