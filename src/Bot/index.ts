import { config } from "../../config";
import {
  Client,
  Intents,
  Message,
  MessageEmbed,
  MessageEmbedOptions,
  TextChannel,
} from "discord.js";
import { BotEvent } from "./events";

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
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
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

    const embed = new MessageEmbed()
      .setColor("#5440d8")
      .setTitle("New Submission")
      .setURL(`https://www.c0d3.com/review/${lessonSlug}`)
      .setDescription(
        `${userString} has submitted a solution to **_${challengeTitle}_**.
    Click [here](https://www.c0d3.com/review/${lessonSlug}) to review code`
      )
      .setTimestamp();

    return this.sendChannelMessage("", config.lessonChannels[notificationLessonId], embed);
  };

  sendChannelMessage = async (
    message: string,
    channelId: string,
    embed?: MessageEmbed | MessageEmbedOptions
  ): Promise<Message> =>
    (this.client.channels.cache.get(channelId) as TextChannel).send(message ? message : { embeds: [embed!] });

  sendDirectMessage = async (
    message: string,
    userId: string,
    embed?: MessageEmbed | MessageEmbedOptions
  ): Promise<Message> => {
    const user =
      this.client.users.cache.get(userId) ??
      (await this.client.users.fetch(userId));
    return user.send(message ? message : { embeds: [embed!] });
  };

  registerEvent = (event: BotEvent) => {
    if (event.once) {
      this.client.once(event.name, (...args) => event.execute(...args));
    } else {
      this.client.on(event.name, (...args) => event.execute(...args));
    }
  };
}

export default Bot;
