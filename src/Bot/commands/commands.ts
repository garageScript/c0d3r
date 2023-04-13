import { SlashCommandBuilder } from "@discordjs/builders";

const userSlashCommand =
    new SlashCommandBuilder()
        .setName("lookup")
        .setDescription('Get the user Discord username by their C0D3 username')
        .addStringOption(option =>
            option.setName('username')
                .setDescription("The user's username on C0D3")
                .setRequired(true))

       

export const commands = [userSlashCommand].map((command) => command.toJSON());