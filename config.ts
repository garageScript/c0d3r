const errMessage = (s: string) => `${s}, please add it in .env`;

if (!process.env.DISCORD_TOKEN)
  throw new Error(errMessage("Discord token is required"));

if (!process.env.BOT_TOKEN)
  throw new Error(errMessage("Bot token is required"));

if (!process.env.CLIENT_ID)
  throw new Error(errMessage("Client ID is required"));

if (!process.env.GRAPHQL_API)
  throw new Error(errMessage("GraphQL API URL is required"));

if (!process.env.GUILD_ID) throw new Error(errMessage("GUILD_ID is required"));

if (!process.env.OPENAI_API_KEY)
  throw new Error(errMessage("OPENAI_API_KEY is required"));

interface Config {
  prefix: string;
  discordToken: string;
  botToken: string;
  clientId: string;
  graphqlAPI: string;
  guildId: string;
  lessonChannels: { [key: string]: string };
  channels: { [key: string]: string };
  port: number;
  openaiApiKey: string;
}

export const config: Config = {
  prefix: "!",
  // Token to use the Discord API
  discordToken: process.env.DISCORD_TOKEN,
  // Access token required in requests to the bot server
  botToken: process.env.BOT_TOKEN,
  // Discord bot Client ID
  clientId: process.env.CLIENT_ID,
  // URL for the c0d3 GraphQL API
  graphqlAPI: process.env.GRAPHQL_API,
  // Discord guild (server) ID for the bot
  guildId: process.env.GUILD_ID,
  // OpenAI API key
  openaiApiKey: process.env.OPENAI_API_KEY,
  // Discord channels for the respective lessons
  lessonChannels: {
    // JS0
    "5": "830050296817778728",
    // JS1
    "2": "830050369472036865",
    // JS2
    "1": "830050402904703017",
    // JS3
    "4": "830050424928206909",
    // JS4
    "24": "830050482680365097",
    // JS5
    "3": "830050515664371742",
    // JS6
    "29": "830050553463177258",
    // JS7
    "28": "830050587860271185",
    // JS8
    "25": "830050619230257235",
    // JS9
    "27": "830050679162011680",
  },
  // Channels
  channels: {
    welcome: "831750041445203979",
    askC0d3: "1096494272880066590",
  },
  port: parseInt(process.env.PORT ?? "") || 5623,
} as const;
