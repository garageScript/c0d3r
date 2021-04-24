import { Client, Message, MessageEmbed, TextChannel } from "discord.js";

export interface SubmissionMessage {
  username: string;
  lessonId: string;
  challengeTitle: string;
  lessonChannelId: string;
}

export interface ChannelMessage {
  channelId: string;
  message: string;
}

class Bot {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  login = async (token: string) => this.client.login(token);

  sendSubmissionMessage = ({
    username,
    lessonId,
    challengeTitle,
    lessonChannelId,
  }: SubmissionMessage): Promise<Message> => {
    const embed = new MessageEmbed()
      .setColor("#5440d8")
      .setTitle("New Submission")
      .setURL(`https://www.c0d3.com/review/${lessonId}`)
      .setDescription(
        `**@${username}** has submitted a solution **_${challengeTitle}_**.
    Click [here](https://www.c0d3.com/review/${lessonId}) to review code`
      )
      .setTimestamp();

    return (this.client.channels.cache.get(
      lessonChannelId
    ) as TextChannel)?.send(
      `@${username} has submitted a solution **_${challengeTitle}_**.`,
      embed
    );
  };

  sendChannelMessage = async (
    message: string,
    channelId: string
  ): Promise<Message> =>
    (this.client.channels.cache.get(channelId) as TextChannel)?.send(message);

  sendDirectMessage = async (
    message: string,
    userId: string
  ): Promise<Message | undefined> => {
    let user =
      this.client.users.cache.get(userId) ??
      (await this.client.users.fetch(userId));
    return user?.send(message);
  };
}

export default Bot;
