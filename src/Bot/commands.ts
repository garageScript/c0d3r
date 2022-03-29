import { SlashCommandBuilder } from "@discordjs/builders";

const getUserDiscordUsername =
    new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with the user's username on Discord!")
    .addStringOption(option => option.setName('username').setDescription("The user's username on C0D3"))

export const commands = [getUserDiscordUsername].map((command) => command.toJSON());