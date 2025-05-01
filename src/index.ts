import { Client, GatewayIntentBits } from 'discord.js';
import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

const client = new Client({
    intents: [GatewayIntentBits.GuildMessages],
});

client.on('ready', (client) => {
    const name = process.env.CLIENT_NAME;
    if (name) {
        client.user?.setUsername(name);
    }
    console.log(`Logged in as ${client.user?.tag}`);
});

const token = process.env.TOKEN;
if (token) {
    client.login(token);
}

process.on('SIGTERM', () => {
    process.exit(0);
});
