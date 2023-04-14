import { CommandInteraction } from "discord.js"
import { GraphQLClient } from "graphql-request"
import { USER_INFO } from "../../graphql"
import { config } from "../../../config"
import { sendPrompt } from "./externals/gpt"

type UserInfoQuery = {
  userInfo: {
    user: {
      discordUserId: string
    }
  }
}

const graphQLClient = new GraphQLClient(config.graphqlAPI)

export const lookupReply = async (interaction: CommandInteraction) => {
  try {
    const usernameArg = interaction.options.getString('username')
    await interaction.deferReply({ ephemeral: true });

    const data = await graphQLClient.request(USER_INFO, {
      username: usernameArg
    }) as UserInfoQuery

    const userInfo = data?.userInfo
    const user = userInfo?.user
    const discordUserId = user?.discordUserId

    if (discordUserId) {
      // <@${discordUserId}> is used to create a link for the user profile
      await interaction.editReply({ content: `${usernameArg} on Discord is <@${discordUserId}>` })
    } else {
      await interaction.editReply({ content: `${usernameArg} is not connected to Discord.` })
    }
  }
  catch (err) {
    await interaction.editReply({ content: 'We could not find the user.' })
  }
}

export const assistantAskReply = async (interaction: CommandInteraction) => {
  const { channelId } = interaction

  // only allow this command in the #ask-c0d3 channel
  if (channelId !== config.channels.askC0d3) {
    await interaction.reply({
      content: "You can only use this command in the #ask-c0d3 channel",
      ephemeral: true,
    });
    return
  }

  const questionArg = interaction.options.getString('question')
  if (!questionArg) {
    await interaction.reply({ content: 'You need to provide a question.', ephemeral: true })
    return
  }

  try {
    const promptPromise = sendPrompt(questionArg)

    // Sometimes, the model takes more than 3 seconds to respond, so we need to defer the reply
    // to let the user know that the bot is processing the request and it won't be rejected
    // https://discordjs.guide/slash-commands/response-methods.html#deferred-responses
    await interaction.deferReply()

    const { completion } = await promptPromise

    await interaction.editReply({ content: completion || 'Sorry, I had an issue while responding. Please try again!' })
    return
  } catch (e) {
    await interaction.editReply({ content: 'We could not reach the assistant.' })
  }
}