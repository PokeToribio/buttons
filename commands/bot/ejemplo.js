const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ejemplo') // Nombre del comando
        .setDescription("Explica cómo funcionan los botones en Discord y muestra ejemplos."), // Descripción del comando
    integration_types: [0, 1], // 0 gremios, 1 userinstall
    contexts: [0, 1, 2], // 0 solo gremios 1 solo MD bot 2 cualquier MD
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Cómo Funcionan los Botones en Discord')
            .setDescription('Los botones en Discord permiten interactuar con los mensajes de una manera más dinámica. A continuación, se explica cómo configurar y manejar botones en tu bot de Discord.')
            .addFields(
                { name: 'Configuración de Botones', value: 'Para crear botones, debes utilizar la clase `ActionRowBuilder` junto con `ButtonBuilder`.' },
                { name: 'Manejo de Interacciones', value: 'Cuando un usuario hace clic en un botón, se genera una interacción que puedes manejar con un archivo separado.' }
            )
            .setColor('#0099ff');

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('button1') // ID del botón
                    .setLabel('Botón 1') // Texto del botón
                    .setStyle(ButtonStyle.Primary), // Estilo del botón
                new ButtonBuilder()
                    .setCustomId('button2') // ID del botón
                    .setLabel('Botón 2') // Texto del botón
                    .setStyle(ButtonStyle.Secondary) // Estilo del botón
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    },
};
