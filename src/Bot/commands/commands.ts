import { SlashCommandBuilder } from "@discordjs/builders";

const userSlashCommand =
    new SlashCommandBuilder()
        .setName("user")
        .setDescription("A set of actions for the user")
        .addSubcommand(subcommand =>
            subcommand
                .setName('find')
                .setDescription('Get the user Discord username by their C0D3 username')
                .addStringOption(option =>
                    option.setName('username')
                        .setDescription("The user's username on C0D3")
                        .setRequired(true)))
       

export const commands = [userSlashCommand].map((command) => command.toJSON());