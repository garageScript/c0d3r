import { config } from "../../config";
import {
  Client,
  Message,
  MessageEmbed,
  MessageEmbedOptions,
  TextChannel,
} from "discord.js";

export enum IdType {
  DISCORD = "DISCORD",
  C0D3 = "C0D3",
}

export interface SubmissionMessage {
  idType: IdType;
  id: string;
  lessonId: string;
  challengeTitle: string;
}

class Bot {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  login = async (token: string) => this.client.login(token);

  sendSubmissionNotification = ({
    idType,
    id,
    lessonId,
    challengeTitle,
  }: SubmissionMessage): Promise<Message> => {
    const userString = idType === IdType.C0D3 ? `**${id}**` : `<@${id}>`;

    const embed = new MessageEmbed()
      .setColor("#5440d8")
      .setTitle("New Submission")
      .setURL(`https://www.c0d3.com/review/${lessonId}`)
      .setDescription(
        `${userString} has submitted a solution to **_${challengeTitle}_**.
    Click [here](https://www.c0d3.com/review/${lessonId}) to review code`
      )
      .setTimestamp();

    return this.sendChannelMessage("", config.lessonChannels[lessonId], embed);
  };

  sendChannelMessage = async (
    message: string,
    channelId: string,
    embed?: MessageEmbed | MessageEmbedOptions
  ): Promise<Message> =>
    (this.client.channels.cache.get(channelId) as TextChannel).send(message, {
      embed,
    });

  sendDirectMessage = async (
    message: string,
    userId: string,
    embed?: MessageEmbed | MessageEmbedOptions
  ): Promise<Message> => {
    let user =
      this.client.users.cache.get(userId) ??
      (await this.client.users.fetch(userId));
    return user.send(message, { embed });
  };
}

export default Bot;
