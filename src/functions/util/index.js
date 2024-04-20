const { Client, Message, ChannelType, EmbedBuilder, REST, Routes } = require("discord.js");
const fs = require("node:fs");
const { GameDig } = require("gamedig");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
    /**
     * deploy slash commands
     * @param {Client} client the discord.js client instance 
     */
    async deployCommands(client) {
        const commands = [];
        
        fs.readdirSync(`./commands/slash`).forEach(dir => {
            const commandFiles = fs.readdirSync(`./commands/slash/${dir}/`).filter(file => file.endsWith(".js"));
            for (const file of commandFiles) {
                const command = require(`../../commands/slash/${dir}/${file}`);
                commands.push(command.data.toJSON());
            }
        });
        const rest = new REST({ version: "10" }).setToken(client.token);
        
        try {
            await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
            console.log(`slash commands registered successfully for everyone !!`);
        } catch (error) {
            console.log(`failed to register slash commands.`, " error: ".yellow, error);
        };
        return { commands: commands, client: client }
    },
    /**
     * get arma server info
     * @returns 
     */
    async getArmaServer() {
        const info = await GameDig.query({
            type: "arma3",
            host: process.env.ARMA_IP,
            port: process.env.ARMA_PORT
        });
        return info;
    }
}