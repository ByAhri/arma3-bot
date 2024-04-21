const { Client, SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require("discord.js");
const { GameDig } = require("gamedig");
const { getArmaServer, armaServerEmbed } = require("../../../functions/util/arma");
require("colors");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("arma")
        .setDMPermission(true)
        .setDescription("arma server info"),
    category: "game",
    /**
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(client, interaction, color) {

        const { user, member } = interaction;

        let info = await getArmaServer().catch(e => { });

        const embed = armaServerEmbed(info || null);

        return interaction.reply({ embeds: [embed] });
    },
};