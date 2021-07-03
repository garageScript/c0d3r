import { z } from "zod";
import { MessageEmbedOptionsShape } from "../utils/MessageEmbedOptionsShape";

export const DirectMessageSchema = z
  .object({
    message: z.string(),
    embed: z.object(MessageEmbedOptionsShape).strict().optional(),
  })
  .strict();

export type DirectMessage = z.infer<typeof DirectMessageSchema>;
