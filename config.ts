if (!process.env.DISCORD_TOKEN)
  throw new Error("Discord token is required, please add it in .env");

if (!process.env.BOT_TOKEN)
  throw new Error("Bot token is required, please add it in .env");

interface ConfigInterface {
  prefix: string;
  discordToken: string;
  botAccessToken: string;
  lessonChannels: { [key: string]: string };
  port: number;
}

export const config: ConfigInterface = {
  prefix: "!",
  discordToken: process.env.DISCORD_TOKEN,
  // Access token required in requests to the bot server
  botAccessToken: process.env.BOT_TOKEN,
  // Discord channels for the respective lessons
  lessonChannels: {
    0: "835149065838657597",
    1: "835149084201058354",
  },
  port: parseInt(process.env.PORT ?? "") || 5623,
};
