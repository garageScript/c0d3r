if (!process.env.DISCORD_TOKEN)
  throw new Error("Discord token is required, please add it in .env");

if (!process.env.BOT_TOKEN)
  throw new Error("Bot token is required, please add it in .env");

interface Config {
  prefix: string;
  discordToken: string;
  botAccessToken: string;
  lessonChannels: { [key: string]: string };
  port: number;
}

export const config: Config = {
  prefix: "!",
  discordToken: process.env.DISCORD_TOKEN,
  // Access token required in requests to the bot server
  botAccessToken: process.env.BOT_TOKEN,
  // Discord channels for the respective lessons
  lessonChannels: {
    // JS0
    5: "830050296817778728",
    // JS1
    2: "830050369472036865",
    // JS2
    1: "830050402904703017",
    // JS3
    4: "830050424928206909",
    // JS4
    24: "830050482680365097",
    // JS5
    3: "830050515664371742",
    // JS6
    29: "830050553463177258",
    // JS7
    28: "830050587860271185",
    // JS8
    25: "830050619230257235",
    // JS9
    27: "830050679162011680",
  },
  port: parseInt(process.env.PORT ?? "") || 5623,
};
