import { Events } from 'discord.js';
import { buildDiscordEvent } from '../types/discord.js';

export default buildDiscordEvent({
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Client ${client.user.tag} is ready!`);
    },
});
