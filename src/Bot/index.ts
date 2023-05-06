import { config } from "../../config";
import {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  Message,
  TextChannel,
} from "discord.js";
import { BotEvent } from "./events";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { commands } from "./commands/commands";
import { onInteractionCreate } from "./commands";

export enum IdType {
  DISCORD = "DISCORD",
  C0D3 = "C0D3",
}

export interface SubmissionMessage {
  idType: IdType;
  id: string;
  notificationLessonId: string;
  lessonSlug: string;
  challengeTitle: string;
}

class Bot {
  private client: Client;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
      ],
    });
  }

  login = async (token: string) => this.client.login(token);

  sendSubmissionNotification = ({
    idType,
    id,
    notificationLessonId,
    lessonSlug,
    challengeTitle,
  }: SubmissionMessage): Promise<Message> => {
    const userString = idType === IdType.C0D3 ? `**${id}**` : `<@${id}>`;

    const embed = new EmbedBuilder()
      .setColor("#5440d8")
      .setTitle("New Submission")
      .setURL(`https://www.c0d3.com/review/${lessonSlug}`)
      .setDescription(
        `${userString} has submitted a solution to **_${challengeTitle}_**.
    Click [here](https://www.c0d3.com/review/${lessonSlug}) to review code`
      )
      .setTimestamp();

    return this.sendChannelMessage(
      "",
      config.lessonChannels[notificationLessonId],
      embed
    );
  };

  sendChannelMessage = async (
    message: string,
    channelId: string,
    embed?: EmbedBuilder
  ): Promise<Message> => {
    const channel =
      this.client.channels.cache.get(channelId) ??
      (await this.client.channels.fetch(channelId));
    const embeds = embed ? [embed] : embed;
    return (channel as TextChannel).send(message ? message : { embeds });
  };

  sendDirectMessage = async (
    message: string,
    userId: string,
    embed?: EmbedBuilder
  ): Promise<Message> => {
    const user =
      this.client.users.cache.get(userId) ??
      (await this.client.users.fetch(userId));
    const embeds = embed ? [embed] : embed;
    return user.send(message ? message : { embeds });
  };

  registerCommands = async () => {
    const rest = new REST({ version: "9" }).setToken(config.discordToken);

    rest
      .put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
        body: commands,
      })
      .then(() =>
        console.log("🤖 Successfully registered application commands.")
      )
      .catch(console.error);
  };

  registerCommandsReplies = () =>
    this.client.on("interactionCreate", onInteractionCreate);

  registerEvent = (event: BotEvent) => {
    if (event.once) {
      this.client.once(event.name, (...args) => event.execute(...args));
    } else {
      this.client.on(event.name, (...args) => event.execute(...args));
    }
  };
}

export default Bot;
