module.exports = {
    data: {
        name: 'button1', // Cambia 'button1' por tu ID de interacción personalizado si es necesario
    },

    async run(interaction) {
        if (interaction.isButton()) {
            // Aquí puedes manejar las interacciones de botones
            await interaction.reply('¡Botón 1 presionado!');
        }
    }
};