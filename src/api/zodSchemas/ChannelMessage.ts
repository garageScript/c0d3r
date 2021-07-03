import { z } from "zod";
import {MessageEmbedOptionsShape} from "../utils/MessageEmbedOptionsShape";

export const ChannelMessageSchema = z
  .object({
    message: z.string(),
    embed: z.object(MessageEmbedOptionsShape).strict().optional(),
  })
  .strict();

export type ChannelMessage = z.infer<typeof ChannelMessageSchema>;
