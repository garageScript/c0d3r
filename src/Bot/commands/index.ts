import {
  Awaitable,
  ChatInputCommandInteraction,
  Interaction,
} from "discord.js";
import { assistantAskReply, lookupReply } from "./commandsReplies";

const runIfChatInputCommand = (
  interaction: Interaction,
  callback: (interaction: ChatInputCommandInteraction) => Promise<void>
) => {
  if (interaction.isChatInputCommand()) {
    callback(interaction);
  }
};

export const onInteractionCreate = (
  interaction: Interaction
): Awaitable<void> => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  switch (commandName) {
    case "lookup":
      runIfChatInputCommand(interaction, lookupReply);
      break;
    case "ask":
      runIfChatInputCommand(interaction, assistantAskReply);
      break;
    default:
      break;
  }
};
