import { Message } from "discord.js";
import { bot } from "../../../index";
import { message } from "./message";

export interface BotEvent {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => void;
}

export interface MessageEvent extends BotEvent {
  name: "message";
  execute: (message: Message) => void;
}

export const registerEvents = () => {
  bot.registerEvent(message);
};
