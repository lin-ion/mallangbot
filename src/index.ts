import { Client, GatewayIntentBits } from 'discord.js';
import dotenvFlow from 'dotenv-flow';
import fs from 'fs';
import path from 'path';
import { CustomClient, DiscordCommand, DiscordEvent } from './types/discord.js';
dotenvFlow.config();

const client = new Client({
    intents: [GatewayIntentBits.GuildMessages],
}) as CustomClient;

client.commands = new Map();

const commandsPath = path.join(import.meta.dirname, 'commands/slash');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = ((await import(filePath)) as { default: DiscordCommand }).default;
    client.commands.set(command.data.name, command);
}

const eventsPath = path.join(import.meta.dirname, 'events');
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = ((await import(filePath)) as { default: DiscordEvent }).default;
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.TOKEN);
