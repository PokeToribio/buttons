require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Leer el token desde el archivo .env
const token = process.env.TOKEN;

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

// Iniciar sesión
client.login(token);
