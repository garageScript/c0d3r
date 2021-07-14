import { z } from "zod";
import { MessageEmbedOptionsShape } from "../utils/MessageEmbedOptionsShape";

export const DirectMessageSchema = z
  .object({
    message: z.string(),
    embed: z.object(MessageEmbedOptionsShape).strict().optional(),
    includeDetails: z.boolean().optional().default(false),
  })
  .strict();

export type DirectMessage = z.infer<typeof DirectMessageSchema>;
