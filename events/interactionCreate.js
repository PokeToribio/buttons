module.exports = {
    run(client, interaction) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                command.execute(interaction);
            } catch (error) {
                console.error(error);
                interaction.reply({ content: 'Hubo un error al ejecutar este comando.', ephemeral: true });
            }
        } else if (interaction.isButton()) {
            const execute = client.executes.get(interaction.customId);

            if (!execute) return;

            try {
                execute.run(interaction);
            } catch (error) {
                console.error(error);
                interaction.reply({ content: 'Hubo un error al manejar esta interacción.', ephemeral: true });
            }
        }
    }
};
