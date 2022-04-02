import { CommandInteraction } from "discord.js"
import { GraphQLClient } from "graphql-request"
import { USER_INFO } from "../../graphql"
import { config } from "../../../config"

type UserInfoQuery = {
  userInfo: {
    user: {
      discordUserId: string
    }
  }
}

const graphQLClient = new GraphQLClient(config.graphqlAPI)

/*
Reply functions format: <command><subCommand>Reply

Examples:
  With subCommand: infoSubmissionsReply
  Without subCommand: infoReply
*/
export const userFindReply = async (interaction: CommandInteraction) => {
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
      await interaction.editReply({ content: `${usernameArg} is not connected to Discord.`})
    }
  } catch (error) {
    await interaction.editReply({ content: 'We could not find the user.' })
  }
}
