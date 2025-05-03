import {
    Awaitable,
    ChatInputCommandInteraction,
    Client,
    ClientEvents,
    SlashCommandOptionsOnlyBuilder,
} from 'discord.js';

export interface DiscordCommand {
    data: SlashCommandOptionsOnlyBuilder; // most abstract type for slash commands
    execute: (interaction: ChatInputCommandInteraction) => Awaitable<void>;
}

export interface DiscordEvent<K extends keyof ClientEvents = keyof ClientEvents> {
    name: K;
    once?: boolean;
    execute: (...args: ClientEvents[K]) => Awaitable<void>;
}

export interface CustomClient extends Client {
    commands: Map<string, DiscordCommand>;
}

export const buildDiscordEvent = <K extends keyof ClientEvents>(args: {
    name: K;
    once: boolean;
    execute: (...args: ClientEvents[K]) => Awaitable<void>;
}): DiscordEvent<K> => args;
