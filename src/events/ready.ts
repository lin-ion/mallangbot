import { Events } from 'discord.js';
import fs from 'fs';
import { buildDiscordEvent } from '../types/discord.js';

export default buildDiscordEvent({
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Client ${client.user.tag} is ready!`);

        // Testing for file ownership
        const Filedir = 'data';
        const filePath = `${Filedir}/test.txt`;
        const testData = 'mallangbot';
        fs.mkdirSync(Filedir, { recursive: true });
        fs.writeFile(filePath, testData, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('File written successfully');
            }
        });
    },
});
