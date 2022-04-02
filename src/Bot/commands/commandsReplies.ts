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
export const lookupReply = async (interaction: CommandInteraction) => {
  const usernameArg = interaction.options.getString('username')

  graphQLClient.request(USER_INFO, {
    username: usernameArg
  })
    .then(async (data: UserInfoQuery) => {
      const userInfo = data?.userInfo
      const user = userInfo?.user
      const discordUserId = user?.discordUserId

      if (discordUserId) {
        // <@${discordUserId}> is used to create a link for the user profile
        await interaction.reply({ content: `${usernameArg} on Discord is <@${discordUserId}>`, ephemeral: true })
      } else {
        await interaction.reply({ content: `${usernameArg} is not connected to Discord.`, ephemeral: true })
      }
    }).catch(async () => {
      await interaction.reply({ content: 'We could not find the user.', ephemeral: true })
    })
}
