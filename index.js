require('dotenv').config();
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Leer el token y el cliente ID desde el archivo .env
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID; // Añade tu CLIENT_ID aquí
const guildId = process.env.GUILD_ID;   // Añade tu GUILD_ID aquí

// Crear el cliente con los intents necesarios
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});

// Cargar comandos
client.commands = new Collection();
const loadCommands = () => {
    const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));

    commandFolders.forEach(folder => {
        const commandFiles = fs.readdirSync(path.join(__dirname, 'commands', folder))
            .filter(file => file.endsWith('.js'));

        commandFiles.forEach(file => {
            const command = require(path.join(__dirname, 'commands', folder, file));
            const commandName = file.split('.')[0];
            client.commands.set(commandName, command);
        });
    });
};
loadCommands();

// Cargar ejecutables
client.executes = new Collection();
const loadExecutes = () => {
    const executeFiles = fs.readdirSync(path.join(__dirname, 'executes'));

    executeFiles.forEach(file => {
        if (file.endsWith('.js')) {
            const execute = require(path.join(__dirname, 'executes', file));
            client.executes.set(execute.data.name, execute);
        }
    });
};
loadExecutes();

// Cargar eventos
const loadEvents = () => {
    const eventFiles = fs.readdirSync(path.join(__dirname, 'events'));

    eventFiles.forEach(file => {
        if (file.endsWith('.js')) {
            const eventFunction = require(path.join(__dirname, 'events', file));
            const eventName = file.split('.')[0];
            client.on(eventName, (...args) => eventFunction.run(client, ...args));
        }
    });
};
loadEvents();

// Registrar comandos
const registerCommands = async () => {
    const commands = [];
    const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));

    commandFolders.forEach(folder => {
        const commandFiles = fs.readdirSync(path.join(__dirname, 'commands', folder))
            .filter(file => file.endsWith('.js'));

        commandFiles.forEach(file => {
            const command = require(path.join(__dirname, 'commands', folder, file));
            commands.push(command.data.toJSON());
        });
    });

    const rest = new REST({ version: '10' }).setToken(token);

    try {
        console.log('Iniciando la actualización de comandos...');

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });

        console.log('Comandos registrados correctamente.');
    } catch (error) {
        console.error(error);
    }
};

// Iniciar sesión y registrar comandos
client.once('ready', async () => {
    await registerCommands();
    console.log(`¡${client.user.tag} está listo!`);
});

client.login(token);
