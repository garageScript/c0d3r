import { Awaitable, Interaction } from "discord.js";
import { assistantAskReply, lookupReply } from "./commandsReplies";

export const onInteractionCreate = (interaction: Interaction): Awaitable<void> => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "lookup") lookupReply(interaction)
  if (commandName === 'ask') {
    assistantAskReply(interaction)
  }
}
