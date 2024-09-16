// Asegúrate de crear un archivo similar para 'button2' si estás manejando múltiples botones
module.exports = {
    data: {
        name: 'button2', // Cambia 'button2' por tu ID de interacción personalizado si es necesario
    },

    async run(interaction) {
        if (interaction.isButton()) {
            // Aquí puedes manejar las interacciones de botones
            await interaction.reply('¡Botón 2 presionado!');
        }
    }
};
