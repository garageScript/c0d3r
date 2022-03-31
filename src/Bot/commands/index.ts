import { Awaitable, Interaction } from "discord.js";
import { userFindReply } from "./commandsReplies";

export const onInteractionCreate = (interaction: Interaction): Awaitable<void> => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === "user") {
      const subCommandName = interaction.options.getSubcommand()

      if (subCommandName === 'find') userFindReply(interaction)
    }
}
