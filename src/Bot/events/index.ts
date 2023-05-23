import { Events, Message } from "discord.js";
import { bot } from "../../../index";
import { message } from "./message";

export interface BotEvent {
  name: string;
  once?: boolean;
  // Discord.js provides ...any[] as arguments to the execute callback
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any[]) => void;
}

export interface MessageEvent extends BotEvent {
  name: Events;
  execute: (message: Message) => void;
}

export const registerEvents = () => bot.registerEvent(message);
export const registerCommands = () => bot.registerCommands();
export const registerCommandsReplies = () => bot.registerCommandsReplies();
