import { ChatInputCommandInteraction } from "discord.js";
import { GraphQLClient } from "graphql-request";
import { config } from "../../../config";
import { USER_INFO } from "../../graphql";
import { sendPrompt } from "./externals/gpt";

type UserInfoQuery = {
  userInfo: {
    user: {
      discordUserId: string;
    };
  };
};

const graphQLClient = new GraphQLClient(config.graphqlAPI);

export const lookupReply = async (interaction: ChatInputCommandInteraction) => {
  try {
    await interaction.deferReply({ ephemeral: true });

    const username = interaction.options.getString("username") ?? "Unknown";

    const data = (await graphQLClient.request(USER_INFO, {
      username,
    })) as UserInfoQuery;

    const userInfo = data?.userInfo;
    const user = userInfo?.user;
    const discordUserId = user?.discordUserId;

    if (discordUserId) {
      // <@${discordUserId}> is used to create a link for the user profile
      await interaction.editReply({
        content: `${username} on Discord is <@${discordUserId}>`,
      });
    } else {
      await interaction.editReply({
        content: `${username} is not connected to Discord.`,
      });
    }
  } catch (err) {
    await interaction.editReply({ content: "We could not find the user." });
  }
};

export const assistantAskReply = async (
  interaction: ChatInputCommandInteraction
) => {
  const { channelId } = interaction;

  // only allow this command in the #ask-c0d3 channel
  if (channelId !== config.channels.askC0d3) {
    await interaction.reply({
      content: "You can only use this command in the #ask-c0d3 channel",
      ephemeral: true,
    });
    return;
  }

  const questionArg = interaction.options.getString("question");
  if (!questionArg) {
    await interaction.reply({
      content: "You need to provide a question.",
      ephemeral: true,
    });
    return;
  }

  try {
    const promptPromise = sendPrompt(questionArg);

    // Sometimes, the model takes more than 3 seconds to respond, so we need to defer the reply
    // to let the user know that the bot is processing the request and it won't be rejected
    // https://discordjs.guide/slash-commands/response-methods.html#deferred-responses
    await interaction.deferReply();

    const { completion } = await promptPromise;

    if (!completion) {
      await interaction.editReply({
        content: "Sorry, I had an issue while responding. Please try again!",
      });
      return;
    }

    // split the response into paragraphs
    const paragraphs = completion.split("\n");

    let message = "";
    for (const paragraph of paragraphs) {
      // add paragraphs to the message until it reaches the 2000 character limit
      if ((message + paragraph).length <= 1900) {
        message += `${paragraph}\n`;
      } else {
        // send a follow up if the message is > 2000 characters
        await interaction.followUp({ content: message });
        message = `${paragraph}\n`;
      }
    }

    // send the rest of the message if it's not empty
    if (message.trim() !== "") {
      await interaction.followUp({ content: message });
    }
  } catch (e) {
    console.error(e);

    await interaction.editReply({
      content: "We could not reach the assistant.",
    });
  }
};
