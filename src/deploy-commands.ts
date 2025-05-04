import { REST, Routes } from 'discord.js';
import dotenvFlow from 'dotenv-flow';
import fs from 'fs';
import path from 'path';
import { DiscordCommand } from './types/discord.js';
dotenvFlow.config();

const commands = [];
const commandsPath = path.join(import.meta.dirname, 'commands/slash');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = ((await import(filePath)) as { default: DiscordCommand }).default;
    commands.push(command.data.toJSON());
}

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
if (!token || !clientId) {
    throw new Error('Missing TOKEN or CLIENT_ID in .env file');
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        await rest.put(Routes.applicationCommands(clientId), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
