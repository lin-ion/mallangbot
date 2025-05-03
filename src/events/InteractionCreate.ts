import { Events } from 'discord.js';
import { buildDiscordEvent, CustomClient } from '../types/discord.js';

export default buildDiscordEvent({
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const client = interaction.client as CustomClient;
            const command = client.commands.get(interaction.commandName);

            try {
                if (!command) {
                    console.log(`No command matching ${interaction.commandName} was found.`);
                    return;
                }
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There was an error while executing this command!',
                    });
                } else {
                    await interaction.reply({
                        content: 'There was an error while executing this command!',
                    });
                }
            }
        }
    },
});
