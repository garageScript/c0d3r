import { ZodShape } from "./ZodShape";
import { MessageEmbedOptions, Constants } from "discord.js";
import { z } from "zod";

export const MessageEmbedOptionsShape: ZodShape<MessageEmbedOptions> = {
  title: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
  timestamp: z.union([z.date(), z.number()]).optional(),
  color: z
    .union([
      z.nativeEnum(Object(Object.keys(Constants.Colors))),
      z.literal("RANDOM"),
      z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
      z.number().nonnegative().max(0xffffff),
      z.number().nonnegative().max(255).array().length(3),
    ])
    .optional(),
  fields: z.any().optional(),
  files: z.any().optional(),
  author: z.any().optional(),
  thumbnail: z.any().optional(),
  image: z.any().optional(),
  video: z.any().optional(),
  footer: z.any().optional(),
};
