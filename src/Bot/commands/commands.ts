import { SlashCommandBuilder } from '@discordjs/builders'

const userSlashCommand =
  new SlashCommandBuilder()
    .setName("lookup")
    .setDescription('Get the user Discord username by their C0D3 username')
    .addStringOption(option =>
      option.setName('username')
        .setDescription("The user's username on C0D3")
        .setRequired(true))



const gptSlashCommand = new SlashCommandBuilder()
  .setName('ask')
  .setDescription('C0D3 assistant — Disclaimer: May occasionally generate incorrect information')
  .addStringOption((option) =>
    option
      .setName('question')
      .setDescription('The question you want to ask the assistant')
      .setRequired(true)
  )


export const commands = [userSlashCommand, gptSlashCommand].map((command) => command.toJSON())
