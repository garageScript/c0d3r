import { Awaitable, Interaction } from "discord.js";
import { assistantAskReply, lookupReply } from "./commandsReplies";

export const onInteractionCreate = (interaction: Interaction): Awaitable<void> => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  switch (commandName) {
    case "lookup":
      lookupReply(interaction);
      break;
    case "ask":
      assistantAskReply(interaction);
      break;
    default:
      break;
  }
}
